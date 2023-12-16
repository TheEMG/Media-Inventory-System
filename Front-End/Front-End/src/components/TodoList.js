import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import './TodoList.css'

const TodoList = () => {

  // State to store the list of to-dos 
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the initial to-dos from the backend, upon component mount 
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8080/api/todos');
      const data = await response.json(); // Updating state with detched to-dos 
      setTodos(data);
    };

    fetchTodos();
  }, []);

  // Function to add a new-to-do
  const addTodo = async (newTodo) => {
    // Post the new to-do to the backend
    const response = await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      // Update the list of to-dos
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]); // Updates the to-dos list with the new to-do
    }
  };

  //Function to delete a to-do
  const deleteTodo = async (todoId) => {
    // Send a DELETE request to the backend to remove a to-do
    const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Filter out the deleted to-do from the list
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  };

  // Render the to-do list with add and delete functionalities
  return (
    <div className="todo-list-container">
      <h3>TO DO</h3>
      <AddTodo onAddTodo={addTodo} />
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;
