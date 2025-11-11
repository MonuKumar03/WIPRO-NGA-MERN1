class Dispatcher {
  constructor() {
    this.callbacks = [];
    this.isDispatching = false;
    this.pendingPayload = null;
  }

  register(callback) {
    this.callbacks.push(callback);
    return this.callbacks.length - 1; // return index for unregister
  }

  dispatch(payload) {
    if (this.isDispatching) {
      throw new Error('Cannot dispatch in the middle of a dispatch');
    }

    this.isDispatching = true;
    this.pendingPayload = payload;

    try {
      this.callbacks.forEach(callback => {
        callback(this.pendingPayload);
      });
    } finally {
      this.isDispatching = false;
      this.pendingPayload = null;
    }
  }

  unregister(id) {
    if (this.isDispatching) {
      throw new Error('Cannot unregister in the middle of a dispatch');
    }
    this.callbacks.splice(id, 1);
  }

  waitFor(ids) {
    if (!this.isDispatching) {
      throw new Error('Must be invoked while dispatching');
    }

    ids.forEach(id => {
      if (id < this.callbacks.length) {
        this.callbacks[id](this.pendingPayload);
      }
    });
  }
}

export default new Dispatcher();