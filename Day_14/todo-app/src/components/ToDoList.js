import React, { Component } from 'react';
import { TodoActions } from '../actions/ToDoActions';
import todoStore from '../stores/ToDoStore';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todoStore.getAll(),
      filter: 'all', // 'all', 'active', 'completed'
      stats: todoStore.getStats()
    };
    
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    todoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      todos: todoStore.getAll(),
      stats: todoStore.getStats()
    });
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  getFilteredTodos() {
    const { todos, filter } = this.state;
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  handleClearCompleted = () => {
    TodoActions.clearCompleted();
  };

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  render() {
    const { filter, stats } = this.state;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className="todo-list-container">
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => this.setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => this.setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => this.setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <h3>No tasks found</h3>
              <p>
                {filter === 'all' 
                  ? "Get started by adding a new task above!"
                  : `No ${filter} tasks`}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => TodoActions.toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span 
                    className="todo-text"
                    onClick={() => TodoActions.toggleTodo(todo.id)}
                  >
                    {todo.text}
                  </span>
                  <div className="todo-meta">
                    <span className="todo-date">
                      {this.formatDate(todo.createdAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => TodoActions.deleteTodo(todo.id)}
                  className="delete-button"
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed */}
        {stats.completed > 0 && (
          <div className="clear-section">
            <button
              onClick={this.handleClearCompleted}
              className="clear-completed-btn"
            >
              Clear Completed ({stats.completed})
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TodoList;