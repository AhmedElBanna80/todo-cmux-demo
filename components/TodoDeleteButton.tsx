'use client';

import { deleteTodoAction } from '@/app/actions';
import { useActionState } from 'react';
import { useState } from 'react';

export function TodoDeleteButton({ todoId }: { todoId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction] = useActionState(() => deleteTodoAction(todoId), {
    success: false,
  });

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setShowConfirm(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
        <form action={formAction} onSubmit={() => setShowConfirm(false)}>
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 font-semibold text-sm"
          >
            Confirm
          </button>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-red-500 hover:text-red-700 font-semibold text-sm"
    >
      Delete
    </button>
  );
}
