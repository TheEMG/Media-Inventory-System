// AddTodo component for adding new todo items.
// It provides a form for entering the title and description of a todo.
// Props:
//  - onAddTodo: Function to call when a new todo is added.
import React, { useState } from 'react';
import './AddTodo.css';

const AddTodo = ({ onAddTodo }) => {
  //State for stroing the title of the new book 
  const [title, setTitle] = useState('');

  //State for storing the description of the new todo
  const [description, setDescription] = useState('');

  //Handle the submission of the todo form
  const handleSubmit = (e) => {
    //Prevents the default form submit action 
    e.preventDefault();
    onAddTodo({
      title, //Uses the title from the state
      description //Uses the description from the state
    });
    //Reset the forms fields after submission
    setTitle('');
    setDescription('');
  };
  //Render the form for adding a new todo 
  return (
<form onSubmit={handleSubmit} className="add-todo-form">
  {/* Input field for the todo title */}
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)} //Updates the title state on change 
    placeholder="Title"
    required //Make the field required for form submission
    className="add-todo-title-input" // Class name for the title input
  />
   {/* Submit button for the form  */}
  <button type="submit" className="add-todo-submit-button">Add To-Do</button>
</form>
  );
};

export default AddTodo;
