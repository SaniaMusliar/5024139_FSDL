import React from "react";

function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
  return (
    <div className="todo">
      <span
        className={todo.completed ? "completed" : ""}
        onClick={() => toggleTodo(index)}
      >
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(index)}>❌</button>
    </div>
  );
}

export default TodoItem;