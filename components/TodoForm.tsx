'use client';

import { createTodo } from '@/app/actions';
import { useActionState } from 'react';

export function TodoForm() {
  const [state, formAction] = useActionState(createTodo, { success: false });

  return (
    <form action={formAction} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            name="title"
            placeholder="Add a new task..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          {state?.error && (
            <p className="mt-2 text-red-600 text-sm">{state.error}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
