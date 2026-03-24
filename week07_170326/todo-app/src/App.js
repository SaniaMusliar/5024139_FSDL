import React, { useState } from "react"; // State

function App() { // Component

  const [todos, setTodos] = useState([]); // State
  const [input, setInput] = useState(""); // State

  const addTodo = () => { // Event
    if (!input) return;
    setTodos([...todos, { text: input, completed: false }]); // State update
    setInput("");
  };

  const toggleTodo = (index) => { // Event
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos); // State update
  };

  const deleteTodo = (index) => { // Event
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos); // State update
  };

  return (
    <div className="app-container">
      <div className="card">

        <h2>Todo App</h2>

        <div>
          <input
            placeholder="Add a task..."
            value={input} // State
            onChange={(e) => setInput(e.target.value)} // Event + Form
          />

          <button onClick={addTodo}>Add</button> {/* Event */}
        </div>

        {todos.map((todo, index) => (
          <div className="todo" key={index}>

            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => toggleTodo(index)} // Event
              style={{ cursor: "pointer" }}
            >
              {todo.text}
            </span>

            <div>
              <button
                className="done-btn"
                onClick={() => toggleTodo(index)} // Event
              >
                Done
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(index)} // Event
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default App;