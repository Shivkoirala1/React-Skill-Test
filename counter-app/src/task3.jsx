import { useState, useEffect } from "react";

export default function Task3() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage when app starts
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Save to localStorage every time todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ADD todo
  const addTodo = () => {
    if (title.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  // DELETE todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TOGGLE complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // START editing
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // SAVE edit
  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: editTitle, description: editDescription }
          : todo
      )
    );
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">Task 3 - Todo App</h1>

      {/* Add Todo Form */}
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:border-blue-400"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 font-bold"
        >
          + Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {todos.length === 0 && (
          <p className="text-center text-gray-400 italic">No todos yet. Add one above!</p>
        )}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`rounded-2xl shadow p-5 border-2 ${
              todo.isCompleted
                ? "bg-green-100 border-green-400"   // completed = green
                : "bg-white border-gray-200"          // incomplete = white
            }`}
          >
            {editId === todo.id ? (
              // EDIT MODE
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg px-3 py-1 w-full mb-2 focus:outline-none"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg px-3 py-1 w-full mb-3 focus:outline-none"
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 text-sm"
                >
                  Save
                </button>
              </div>
            ) : (
              // VIEW MODE
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h2 className={`text-lg font-bold ${todo.isCompleted ? "line-through text-gray-500" : ""}`}>
                    {todo.title}
                  </h2>
                  <span className="text-xs text-gray-400">#{todo.id}</span>
                </div>
                <p className={`text-sm text-gray-600 mb-4 ${todo.isCompleted ? "line-through" : ""}`}>
                  {todo.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`text-sm px-3 py-1 rounded-lg font-medium ${
                      todo.isCompleted
                        ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {todo.isCompleted ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-sm px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}