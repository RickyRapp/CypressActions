import React from 'react';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { NavigationTemplate } from 'themes/components';

function Navigation(props) {
  return <NavigationTemplate {...props} />;
}

export default inject((i, props) => {
  const { rootStore } = i;
  const activeRoute = _.find(rootStore.routerStore.routes, {
    name: rootStore.routerStore.routerState.routeName
  });

  return {
    title: activeRoute.data ? activeRoute.data.title : props.title,
    breadcrumbs: rootStore.breadcrumbs,
    routerStore: rootStore.routerStore
  };
})(Navigation);
