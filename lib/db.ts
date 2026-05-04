import { Todo } from './types';

// In-memory store (will be cleared on server restart)
let todos: Todo[] = [
  {
    id: 'demo-1',
    title: 'Example: Build todo app with cmux-tab-agents',
    completed: false,
    createdAt: new Date(),
  },
];

export function getTodos(): Todo[] {
  return todos;
}

export function getTodoById(id: string): Todo | null {
  return todos.find((t) => t.id === id) || null;
}

export function addTodo(title: string): Todo {
  const todo: Todo = {
    id: `todo-${Date.now()}`,
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };
  todos.push(todo);
  return todo;
}

export function toggleTodo(id: string): Todo | null {
  const todo = getTodoById(id);
  if (!todo) return null;
  todo.completed = !todo.completed;
  return todo;
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
