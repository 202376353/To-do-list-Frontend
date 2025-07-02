import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './Todo.css';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const API_URL = 'https://to-do-list-backend-07bf.onrender.com/api/todos';


  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const completeTodo = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchTodos(); // refresh to get updated data
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onComplete={completeTodo}
      />
    </div>
  );
};

export default App;
