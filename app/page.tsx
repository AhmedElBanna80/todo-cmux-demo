import { getTodos } from '@/lib/db';
import { TodoForm } from '@/components/TodoForm';
import { TodoItem } from '@/components/TodoItem';

export default function Home() {
  const todos = getTodos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            My Tasks
          </h1>
          <p className="text-lg text-gray-600">
            A progressive enhancement todo app built with Next.js 16.2
          </p>
        </header>

        <TodoForm />

        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks yet. Add one to get started!
            </div>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>
      </div>
    </main>
  );
}
