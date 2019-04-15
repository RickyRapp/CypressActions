import _ from 'lodash';
import { RouterState } from 'mobx-state-router';
import { action, observable, computed } from 'mobx';
import { AppStore, ApplicationStore } from 'common/stores';
import { Router } from 'core/stores';

import {
  AuthStore,
  ErrorStore,
  MainViewStore,
  LocalizationStore,
  MenuStore,
  NotificationStore,
  ModalStore
} from 'core/stores';

export default class RootStore {
  routerStore = null;
  routerMaps = null;

  initialState = new RouterState('master.public.home');
  initialAppState = new RouterState('master.app.home.entry');

  get app() {
    return this.applicationStore.app;
  }

  @computed get breadcrumbs() {
    const activeMenuItem = this.menuStore.activeMenuItem;
    if (!activeMenuItem) return [];

    let menuBreadcrumbs = _.map(activeMenuItem.path, menuItem => ({
      title: menuItem.title,
      route: menuItem.route
    }));

    const { routes, routerState } = this.routerStore;
    const activeRoute = _.find(routes, { name: routerState.routeName });

    let crumbs = [];
    // append only crumbs whose route isn't prefix of active menu item route
    const data = this.routerStore.routeDataMap.get(activeRoute.name);
    if (data.crumbs && data.crumbs.length > 0) {
      crumbs = _.filter(
        data.crumbs,
        c =>
          c.title &&
          c.title !== '' &&
          !_.startsWith(activeMenuItem.route, c.route)
      );
    }

    return [...menuBreadcrumbs, ...crumbs];
  }

  getBaasicApp() {
    return this.applicationStore.applicationExists
      ? this.applicationStore.app.baasic
      : null;
  }

  constructor() {
    this.errorStore = new ErrorStore(this);
    this.appStore = new AppStore(this);
    this.authStore = new AuthStore(this);
    this.localizationStore = new LocalizationStore(this);
    this.menuStore = new MenuStore(this);
    this.notificationStore = new NotificationStore(this);
    this.viewStore = new MainViewStore(this);
    this.applicationStore = new ApplicationStore(this);
    this.modalStore = new ModalStore(this);
  }

  @action initializeRoutes({ routes, routerMaps }) {
    this.routerMaps = routerMaps;
    const routeDataMap = createRouteDataMap(routes);
    this.routerStore = new Router(
      this,
      routes,
      new RouterState('master.not-found')
    );
    this.routerStore.routeDataMap = routeDataMap;

    var self = this;
    this.routerStore.setErrorHandler(error => {
      self.errorStore.setError({
        title: error && error.message ? error.message : null,
        description: error && error.stack ? error.stack : null
      });
      return self.routerStore.navigate('master.error');
    });

    const currentPath = this.routerStore.historyAdapter.history.location
      .pathname;
    if (currentPath === '' || currentPath === '/') {
      this.routerStore.navigate(this.initialState);
    }
  }

  initializeStores(store) {
    const { app, ...other } = store;

    if (app) {
      this.applicationStore.extend(app);
    }

    Object.assign(this, other);
  }

  initializeMenus(menus, toState) {
    this.menuStore.setMenu(menus, toState);
  }

  getLoginRoute() {
    return new RouterState('master.app.membership.login');
  }

  getAppRoute() {
    if (this.authStore.isAministratorRole || this.authStore.isEmployeeRole) {
      return new RouterState('master.app.administration.home');
    }
    else {
      return new RouterState('master.app.main.home');
    }
  }
}

function createRouteDataMap(routes) {
  const dataMap = observable.map();

  _.each(routes, route => {
    // set default back for common pages
    // create -> list
    // edit -> list
    // settings -> list
    // language -> list
    let goBack = route.data.back;
    if (!goBack) {
      const routeName = route.name;
      if (
        _.endsWith(routeName, '.create') ||
        _.endsWith(routeName, '.edit') ||
        _.endsWith(routeName, '.settings') ||
        _.endsWith(routeName, '.language')
      ) {
        const parts = _.split(routeName, '.');
        const listRoute =
          _.join(_.take(parts, parts.length - 1), '.') + '.list';
        if (_.some(routes, r => r.name === listRoute)) {
          goBack = listRoute;
        }
      }
    }

    const { data } = route;
    if (data && data.title && (!data.crumbs || data.crumbs.length === 0)) {
      // set page breadcrumb as page title if not breadcrumb defined
      data.crumbs = [{ title: data.title }];
    }

    const routeData = _.merge({}, route.data, {
      back: goBack,
      crumbs: data.crumbs
    });
    dataMap.set(route.name, routeData);
  });

  return dataMap;
}
