import _ from 'lodash';
import { RouterState, HistoryAdapter } from 'mobx-state-router';
import { history } from 'common/utils';
import { AppStore } from 'common/stores';
import { EventHandler, cacheService } from 'core/services';
import { moduleBuilder } from 'core/providers';
import { getDefaultRouteDataMap } from 'core/utils';

import {
    AuthStore,
    ErrorStore,
    MainViewStore,
    MenuStore,
    NotificationStore,
    BaasicMessageStore,
    ModalStore,
    UserStore,
    PermissionStore,
    RouterStore,
    TimeZoneStore,
    LocalizationStore
} from 'core/stores';
import { baasicApp } from 'common/infrastructure';

export default class RootStore {
    eventHandler = new EventHandler();

    constructor(configuration) {
        this.configuration = configuration;
        this.application = { baasic: baasicApp };

        const moduleContext = { rootStore: this };
        const { routes, routerMaps } = moduleBuilder.buildRoutes(configuration.routes, moduleContext);
        const { application } = moduleBuilder.buildStores(configuration.stores, moduleContext);
        applyModules(this.application, application, ['baasic']);

        this.routerStore = new RouterStore(this, [...routes], new RouterState('master.not-found'));
        this.routerStore.routeDataMap = getDefaultRouteDataMap(routes);
        this.routerMaps = routerMaps;

        this.errorStore = new ErrorStore(this);
        this.appStore = new AppStore(this);
        this.userStore = new UserStore(this);
        this.authStore = new AuthStore(this);
        this.permissionStore = new PermissionStore(this);
        this.localizationStore = new LocalizationStore(this);
        this.menuStore = new MenuStore(this);
        this.notificationStore = new NotificationStore(this);
        this.viewStore = new MainViewStore(this);
        this.baasicMessageStore = new BaasicMessageStore(this);
        this.modalStore = new ModalStore(this);
        this.timeZoneStore = new TimeZoneStore(this);

        this.createApplicationService = this.createApplicationService.bind(this);
    }

    setupRouter() {
        var self = this;
        this.routerStore.setErrorHook(error => {
            self.errorStore.setError({
                title: error && error.message ? error.message : null,
                description: error && error.stack ? error.stack : null
            });
            return self.routerStore.goTo(new RouterState('master.app.error', { type: 'router' }));
        });

        this.historyAdapter = new HistoryAdapter(this.routerStore, history);
        this.historyAdapter.observeRouterStateChanges();
    }

    navigateLogin() {
        // clear storage here
        cacheService.clear();
        return this.routerStore.goTo(new RouterState('master.public.membership.login'));
    }

    getDashboard() {
        const user = this.userStore.applicationUser;

        if (user && user.roles) {
            if (user.roles.includes('Users')) {
                return new RouterState('master.app.main.donor.dashboard');
            }
            else if (user.roles.includes('Charities')) {
                return new RouterState('master.app.main.charity.dashboard');
            }
            else if (user.roles.some(c => ['Administrators', 'Employees'].includes(c))) {
                return new RouterState('master.app.main.administration.dashboard');
            }
            else if (user.roles.includes('Scanners')) {
                return new RouterState('master.app.session');
            }
        }
        else {
            return new RouterState('master.app.unauthorized');
        }
    }

    createApplicationService(Type) {
        return new Type(this.application.baasic.apiClient);
    }

    async routeChange({ toState, options }) {
        const { authStore, permissionStore } = this;

        if (options.isPublic === false) {  console.log(this.userStore.applicationUser);
            if (!authStore.isAuthenticated && toState.routeName !== 'master.public.membership.login') {
                authStore.setSignInRedirect(toState);
                return Promise.reject(new RouterState('master.public.membership.login'));
            }
            if (options.authorization && options.authorization.length > 0) {
                 if (!permissionStore.hasPermission(options.authorization)) {
                     return Promise.reject(new RouterState('master.app.unauthorized'));
                 }
            }
            if (options.role && options.role.length > 0) {
                let l = options.role.length;
                let i = 0;
                let tempAuth = false;
                while (!tempAuth && i < l) {
                    const role = options.role[i++];
                    tempAuth = permissionStore.hasRolePermission(role);
                }
                if (!tempAuth) {
                    return Promise.reject(new RouterState('master.app.unauthorized'));
                }
            }
        }
        return Promise.resolve();
    }
}

function applyModules(root, moduleRoot, restrictedKeys = []) {
    if (!root) return;
    if (!moduleRoot) return;

    const reservedKeys = _.isArray(restrictedKeys) ? restrictedKeys : [restrictedKeys];

    _.forOwn(moduleRoot, (value, key) => {
        if (!_.some(reservedKeys, k => k === key)) {
            root[key] = value;
        }
    });
}
