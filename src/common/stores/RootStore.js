import _ from 'lodash';
import { RouterState } from 'mobx-state-router';
import { action, observable, computed } from 'mobx';
import { AppStore, ApplicationStore, PlatformStore } from 'common/stores';
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
    isPlatformUrl = true;
    routerStore = null;
    routerMaps = null;

    initialState = this.isMultiTenancy 
        ? new RouterState('master.platform.main.user.list') : new RouterState('master.app.main.user.list');

    get app() { return this.applicationStore.app; }
    get platform() { return this.platformStore.platform; } 

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
            crumbs = _.filter(data.crumbs, 
                (c) => c.title && c.title !== '' && !_.startsWith(activeMenuItem.route, c.route)
            );
        }

        return [
            ...menuBreadcrumbs,
            ...crumbs
        ];
    }

    getBaasicApp(apiKey) {
        if (!this.isMultiTenancy) { 
            return this.applicationStore.applicationExists ? this.applicationStore.app.baasic : null
        };

        return apiKey ?
            this.applicationStore.apps.get(apiKey) : ((!this.isPlatformUrl && this.applicationStore.applicationExists) ? this.app.baasic : this.platform.baasic);
    }

    constructor(isMultiTenancy) {
        this.isMultiTenancy = isMultiTenancy;
        
        this.errorStore = new ErrorStore(this);
        this.appStore = new AppStore(this);
        this.authStore = new AuthStore(this);
        this.localizationStore = new LocalizationStore(this);
        this.menuStore = new MenuStore(this);
        this.notificationStore = new NotificationStore(this);
        this.viewStore = new MainViewStore(this);
        this.applicationStore = new ApplicationStore(this);
        this.platformStore = new PlatformStore(this);
        this.modalStore = new ModalStore(this);
    }

    @action initializeRoutes({ routes, routerMaps }) {
        this.routerMaps = routerMaps;   
        const routeDataMap = createRouteDataMap(routes);     
        this.routerStore = new Router(this, routes, new RouterState('master.not-found'));
        this.routerStore.routeDataMap = routeDataMap;

        var self = this;
        this.routerStore.setErrorHandler((error) => {
            self.errorStore.setError({
                title: error && error.message ? error.message : null,
                description: error && error.stack ? error.stack : null
            });
            return self.routerStore.navigate('master.error');
        });        

        const currentPath = this.routerStore.historyAdapter.history.location.pathname;
        if (currentPath === '' || currentPath === '/') {
            this.routerStore.navigate(this.initialState);
        }                     
    }

    initializeStores(store) {
        const { platform, app, ...other } = store;
        if (platform) {
            this.platformStore.extend(platform);
        }

        if (app) {
            this.applicationStore.extend(app);
        }

        Object.assign(this, other);
    }

    initializeMenus(menus, toState) {
        this.menuStore.setMenu(menus, toState);
    }

    getLoginRoute() {
        if (this.isMultiTenancy) {
            return new RouterState('master.platform.membership.login');
        } else {
            return new RouterState('master.app.membership.login');
        }  
    }
}

function createRouteDataMap(routes) {
    const dataMap = observable.map();

    _.each(routes, (route) => {
        // set default back for common pages
        // create -> list
        // edit -> list
        // settings -> list
        // language -> list
        let goBack = route.data.back;
        if (!goBack) {
            const routeName = route.name;
            if (_.endsWith(routeName, '.create')
                || _.endsWith(routeName, '.edit')
                || _.endsWith(routeName, '.settings')
                || _.endsWith(routeName, '.language')
            ) {
                const parts = _.split(routeName, '.');
                const listRoute = _.join(_.take(parts, parts.length - 1), '.') + '.list';
                if (_.some(routes, (r) => r.name === listRoute)) {
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