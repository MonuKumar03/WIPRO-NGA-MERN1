import dispatcher from '../dispatcher/Dispatcher';

export const TodoActions = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',

  addTodo(text) {
    if (!text.trim()) return;
    
    dispatcher.dispatch({
      type: this.ADD_TODO,
      text: text.trim(),
      timestamp: new Date().toISOString()
    });
  },

  toggleTodo(id) {
    dispatcher.dispatch({
      type: this.TOGGLE_TODO,
      id: id
    });
  },

  deleteTodo(id) {
    dispatcher.dispatch({
      type: this.DELETE_TODO,
      id: id
    });
  },

  clearCompleted() {
    dispatcher.dispatch({
      type: this.CLEAR_COMPLETED
    });
  }
};