import React, { Component } from 'react';
import { TodoActions } from '../actions/ToDoActions';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = this.state.text.trim();
    if (text) {
      TodoActions.addTodo(text);
      this.setState({ text: '' });
    }
  }

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.handleSubmit} className="add-todo-form">
          <div className="input-container">
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="What needs to be done?"
              className="todo-input"
              maxLength={100}
            />
            <button 
              type="submit" 
              className="add-button"
              disabled={!this.state.text.trim()}
            >
              <span className="add-icon">+</span>
              Add Task
            </button>
          </div>
          {this.state.text.length > 80 && (
            <div className="character-count">
              {this.state.text.length}/100
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default AddTodo;