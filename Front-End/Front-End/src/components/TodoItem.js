// TodoItem component to display an individual todo item.
// Allows marking a todo as completed and deleting it.
// Props:
//  - todo: Object containing the details of the todo item.
//  - onDelete: Function to call when deleting the todo item
import React, { useState } from 'react';
import './TodoItem.css'; 

const TodoItem = ({ todo, onDelete }) => {

  // State to track wether the todo item is checked (completed)
  const [isChecked, setIsChecked] = useState(false);

  //Function to handle the deletion of the todo item 
  const handleDelete = () => {
    onDelete(todo.id); // Calling onDelete prop with todo's id 
  };

  // Function to toggle the checked state of the todo item 
  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  //Render the todo item with a checkbox and delete button
  return (
    <div className={`todo-item ${isChecked ? 'checked' : ''}`}>
      {/* Checkbox and todo title  */}
      <label className="todo-item-label">
        <input
          type="checkbox"
          className="todo-item-checkbox"
          checked={isChecked}
          onChange={toggleCheck}
        />
        <span className="todo-item-title">{todo.title}</span>
      </label>
      {/* Conditionally render the delete button if the item is checked  */}
      {isChecked && (
        <button className="todo-item-delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TodoItem;
