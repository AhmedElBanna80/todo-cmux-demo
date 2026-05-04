export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            My Tasks
          </h1>
          <p className="text-lg text-gray-600">
            A progressive enhancement todo app built with Next.js
          </p>
        </header>

        <form
          action="/api/tasks"
          method="POST"
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex gap-2">
            <input
              type="text"
              name="title"
              placeholder="Add a new task..."
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="space-y-2">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 text-green-600 rounded cursor-pointer"
            />
            <span className="text-gray-700 flex-1">
              Example: Build todo app with cmux-tab-agents
            </span>
            <button className="text-red-500 hover:text-red-700 font-semibold text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
