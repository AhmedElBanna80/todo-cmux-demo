'use client';

import { toggleTodoAction } from '@/app/actions';
import { Todo } from '@/lib/types';
import { TodoDeleteButton } from './TodoDeleteButton';

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
      <form action={() => toggleTodoAction(todo.id)} className="flex-0">
        <button
          type="submit"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              todo.completed
                ? 'bg-green-600 border-green-600'
                : 'border-gray-300 group-hover:border-green-600'
            }`}
          >
            {todo.completed && (
              <span className="text-white text-xs font-bold">✓</span>
            )}
          </div>
        </button>
      </form>
      <span
        className={`text-gray-700 flex-1 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.title}
      </span>
      <TodoDeleteButton todoId={todo.id} />
    </div>
  );
}
