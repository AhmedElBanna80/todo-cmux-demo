'use server';

import { revalidatePath } from 'next/cache';
import { addTodo, toggleTodo, deleteTodo } from '@/lib/db';
import { FormState } from '@/lib/types';

export async function createTodo(formData: FormData): Promise<FormState> {
  try {
    const title = formData.get('title') as string;

    if (!title || !title.trim()) {
      return { error: 'Title is required' };
    }

    const todo = addTodo(title);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create todo' };
  }
}

export async function toggleTodoAction(id: string): Promise<FormState> {
  try {
    const todo = toggleTodo(id);
    if (!todo) {
      return { error: 'Todo not found' };
    }
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to toggle todo' };
  }
}

export async function deleteTodoAction(id: string): Promise<FormState> {
  try {
    const success = deleteTodo(id);
    if (!success) {
      return { error: 'Todo not found' };
    }
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete todo' };
  }
}
