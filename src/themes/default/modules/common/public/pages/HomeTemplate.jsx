import React from 'react';

function HomeTemplate(props) {
  let route = 'master.public.membership.login';
  
  if (props.rootStore.authStore.isAuthenticated) {
    if (props.rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read')) {
      route = 'master.app.administration.home.overview';
    }
    else {
      route = 'master.app.main.home.overview';
    }
  }



  return <span>
    <a className="btn btn--med btn--primary" onClick={() => props.rootStore.routerStore.navigate(route)}>App</a>
    test
  </span>;
}
export default HomeTemplate;
