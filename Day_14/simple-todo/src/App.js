import React, { Component } from 'react';
import Dispatcher from './Dispatcher';
import './App.css';

// Simple Store (embedded in App.js for simplicity)
class TodoStore {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.listeners = [];
    
    // Register with dispatcher
    Dispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    switch (action.type) {
      case 'ADD_TODO':
        this.addTodo(action.payload);
        break;
      case 'TOGGLE_TODO':
        this.toggleTodo(action.payload);
        break;
      case 'DELETE_TODO':
        this.deleteTodo(action.payload);
        break;
      default:
        // Ignore unknown actions
    }
  }

  addTodo(text) {
    const todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    this.todos.push(todo);
    this.persist();
    this.emitChange();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.persist();
      this.emitChange();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.persist();
    this.emitChange();
  }

  getAll() {
    return this.todos;
  }

  persist() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addChangeListener(callback) {
    this.listeners.push(callback);
  }

  removeChangeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  emitChange() {
    this.listeners.forEach(listener => listener());
  }
}

// Actions
const Actions = {
  addTodo(text) {
    Dispatcher.dispatch({
      type: 'ADD_TODO',
      payload: text
    });
  },

  toggleTodo(id) {
    Dispatcher.dispatch({
      type: 'TOGGLE_TODO',
      payload: id
    });
  },

  deleteTodo(id) {
    Dispatcher.dispatch({
      type: 'DELETE_TODO',
      payload: id
    });
  }
};

// React Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: ''
    };
    
    this.todoStore = new TodoStore();
  }

  componentDidMount() {
    this.todoStore.addChangeListener(this.handleStoreChange.bind(this));
    this.handleStoreChange();
  }

  componentWillUnmount() {
    this.todoStore.removeChangeListener(this.handleStoreChange.bind(this));
  }

  handleStoreChange() {
    this.setState({
      todos: this.todoStore.getAll()
    });
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim()) {
      Actions.addTodo(this.state.inputText);
      this.setState({ inputText: '' });
    }
  };

  handleToggleTodo = (id) => {
    Actions.toggleTodo(id);
  };

  handleDeleteTodo = (id) => {
    Actions.deleteTodo(id);
  };

  render() {
    const { todos, inputText } = this.state;

    return (
      <div className="app">
        <div className="container">
          <h1 className="title">Flux Todo App</h1>
          <p className="subtitle">A simple todo app using React and Flux</p>
          
          {/* Add Todo Form */}
          <form onSubmit={this.handleAddTodo} className="form">
            <input
              type="text"
              value={inputText}
              onChange={this.handleInputChange}
              placeholder="What needs to be done?"
              className="input"
            />
            <button 
              type="submit" 
              className="add-button"
              disabled={!inputText.trim()}
            >
              Add Todo
            </button>
          </form>

          {/* Todo List */}
          <div className="todo-list">
            {todos.length === 0 ? (
              <p className="empty">No todos yet. Add one above!</p>
            ) : (
              todos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <span 
                    className="todo-text"
                    onClick={() => this.handleToggleTodo(todo.id)}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => this.handleDeleteTodo(todo.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Total: {todos.length} | 
               Completed: {todos.filter(t => t.completed).length} | 
               Active: {todos.filter(t => !t.completed).length}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;