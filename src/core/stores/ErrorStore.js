import { observable, action, reaction } from 'mobx';

class ErrorStore {
  internalException = null;
  @observable errors = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.initialize();
  }

  @action setError = errors => {
    this.errors = errors;
  };

  initialize() {
    const self = this;

    window.addEventListener('unhandledrejection', event => {
      event.stopPropagation();
      event.preventDefault();

      const { reason } = event;

      if (typeof reason === 'object') {
        if (reason.request !== undefined && reason.statusCode !== undefined) {
          self.setError({
            ...getApiErrorReason(reason)
          });

          if (
            self.rootStore.routerStore.routerState.routerName !== 'master.error'
          ) {
            self.rootStore.routerStore.navigate('master.error');
          }
        }
      }

      return true;
    });

    window.addEventListener('error', event => {
      event.stopPropagation();
      event.preventDefault();
      self.setError({ title: 'Something went wrong. Please contact support.' });
      self.rootStore.routerStore.navigate('master.error');
    });
  }
}

function getApiErrorReason(error) {
  let type = 'Generic Error';
  switch (error.statusCode) {
    case 0:
      type = 'Endpoint not found';
      break;
    case 400:
      type = 'Bad Request';
      break;
    case 500:
      type = 'Server error';
      break;
  }

  if (process.env.NODE_ENV === 'development') {
    let description = {
      title: type,
      details: '',
      message: '',
      error: ''
    };

    if (error.data) {
      if (error.data.details) {
        description.details = error.data.details;
      }

      if (error.data.message) {
        description.message = error.data.message;
      }

      if (error.data.error) {
        description.error =
          typeof error.data.error === 'object'
            ? JSON.stringify(error.data.error)
            : error.data.error;
      }
    }

    return description;
  }

  return {
    title: type
  };
}

export default ErrorStore;
