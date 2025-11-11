import React from 'react';
import AddTodo from './components/AddToDo';
import TodoList from './components/ToDoList';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="app-icon"></span>
            Flux Todo App
          </h1>
          <p className="app-subtitle">
            Built with Flux Architecture
          </p>
        </header>
        
        <main className="app-main">
          <div className="todo-card">
            <AddTodo />
            <TodoList />
          </div>
        </main>
        
        <footer className="app-footer">
          <p>My ToDo App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;