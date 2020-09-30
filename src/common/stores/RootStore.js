import { RouterState, HistoryAdapter } from 'mobx-state-router';
import { history } from 'common/utils';
import { ApplicationStore, AppStore } from 'common/stores';
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

export default class RootStore {
    eventHandler = new EventHandler();
    initialState = new RouterState('master.app.main.dashboard');

    get application() {
        return this.applicationStore.app;
    }

    constructor(configuration) {
        this.configuration = configuration;

        const moduleContext = { rootStore: this };
        const { routes, routerMaps } = moduleBuilder.buildRoutes(configuration.routes, moduleContext);
        moduleBuilder.buildStores(configuration.stores, moduleContext);

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
        this.applicationStore = new ApplicationStore(this);
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
            return self.routerStore.goTo(new RouterState('error', { type: 'router' }));
        });

        this.historyAdapter = new HistoryAdapter(this.routerStore, history);
        this.historyAdapter.observeRouterStateChanges();
    }

    navigateLogin() {
        // clear storage here
        cacheService.clear();
        return this.routerStore.goTo('master.public.membership.login');
    }

    createApplicationService(Type) {
        return new Type(this.application.baasic.apiClient);
    }

    async routeChange({ fromState, toState, options }) {
        const { authStore, permissionStore } = this;
        if (fromState && fromState.routeName === 'master.public.membership.login' && toState.routeName === 'error') {
            return Promise.reject(this.initialState);
        }

        if (options.isPublic === false) {
            if (!authStore.isAuthenticated && toState.routeName !== 'master.public.membership.login') {
                authStore.setSignInRedirect(toState);
                return Promise.reject(new RouterState('master.public.membership.login'));
            }
            if (options.authorization && options.authorization.length > 0) {
                if (!permissionStore.hasPermission(options.authorization)) {
                    return Promise.reject(new RouterState('unauthorized'));
                }
            }
            else if (options.role && options.role.length > 0) {
                if (!permissionStore.hasRolePermission(options.role)) {
                    return Promise.reject(new RouterState('unauthorized'));
                }
            }
        }
        return Promise.resolve();
    }
}