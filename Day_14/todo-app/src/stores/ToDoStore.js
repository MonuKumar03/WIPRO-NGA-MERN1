import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';
import { TodoActions } from '../actions/ToDoActions';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = JSON.parse(localStorage.getItem('flux-todos')) || [];
    this.nextId = this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    
    this.handleActions = this.handleActions.bind(this);
  }

  getAll() {
    return this.todos;
  }

  getActiveTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }

  addTodo(text) {
    const todo = {
      id: this.nextId++,
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(todo);
    this.persistData();
    this.emitChange();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.persistData();
      this.emitChange();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.persistData();
    this.emitChange();
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.persistData();
    this.emitChange();
  }

  persistData() {
    localStorage.setItem('flux-todos', JSON.stringify(this.todos));
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  handleActions(action) {
    switch (action.type) {
      case TodoActions.ADD_TODO:
        this.addTodo(action.text);
        break;
      
      case TodoActions.TOGGLE_TODO:
        this.toggleTodo(action.id);
        break;
      
      case TodoActions.DELETE_TODO:
        this.deleteTodo(action.id);
        break;
      
      case TodoActions.CLEAR_COMPLETED:
        this.clearCompleted();
        break;
      
      default:
        // do nothing
    }
  }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions);

export default todoStore;