import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import { ToastContainer } from 'react-toastify';

@inject(e => ({
  appStore: e.rootStore.appStore,
  authStore: e.rootStore.authStore,
  router: e.rootStore.routerStore,
  routerMaps: e.rootStore.routerMaps
}))
@observer
export default class App extends Component {
  render() {
    const { router, routerMaps } = this.props;
    return (
      <React.Fragment>
        <RouterView routerStore={router.routerStore} viewMap={routerMaps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </React.Fragment>
    );
  }
}
