function getRouterState(rootStore, route, params) {
  return new RouterState(route, params);
}

export default getRouterState;
