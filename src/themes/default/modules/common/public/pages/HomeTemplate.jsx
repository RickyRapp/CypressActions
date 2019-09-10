import React from 'react';

function HomeTemplate(props) {
  debugger;
  return (
    <div>
      {props.rootStore.authStore.isAuthenticated ?
        <span>
          <a className="btn btn--med btn--primary" onClick={() => props.rootStore.routerStore.navigate(props.rootStore.authStore.getRoleInitialRedirect())}>App</a>
        </span>
        :
        <span>
          <a className="btn btn--med btn--primary" onClick={() => props.rootStore.routerStore.navigate(props.rootStore.getLoginRoute())}>Login</a>
        </span>
      }
    </div>)
}
export default HomeTemplate;
