import React from 'react';

function HomeTemplate(props) {
  return <span>
    <a className="btn btn--med btn--primary" onClick={() => props.rootStore.routerStore.goTo('master.app.main.home')}>App</a>
    test
  </span>;
}

export default HomeTemplate;
