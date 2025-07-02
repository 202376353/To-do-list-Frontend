import React from 'react';

const TodoItem = ({ todo, onDelete, onComplete }) => {
  return (
    <div
  className={`todo-item ${todo.completed ? 'completed' : ''}`}
>
  {todo.text}
  <div className="todo-actions">
    <button onClick={() => onComplete(todo._id)}>✔</button>
    <button onClick={() => onDelete(todo._id)}>🗑️</button>
  </div>
</div>

  );
};

export default TodoItem;
