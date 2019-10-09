import _ from 'lodash';
import { observable, action, computed } from 'mobx';
import { BaseViewStore } from 'core/stores';

class NavigationOptions {
    @observable loading = false;
    @observable title = null;

    @action.bound
    setTitle(title) {
        this.title = title;
    }

    @action.bound
    suspend() {
        this.loading = true;
    }

    @action.bound
    resume() {
        this.loading = false;
    }
}

export default class MainViewStore extends BaseViewStore {
    @observable mainMenuVisibile = false;
    @observable profileMenuOpen = false;
    @observable notificationMenuOpen = false;
    @observable.ref quickLinks = [];

    @observable contentSidebarVisible = true;

    @observable navigationOptions = null;

    constructor(rootStore) {
        super(rootStore);
    }

    @computed get breadcrumbs() {
        const activeMenuItem = this.rootStore.menuStore.activeMenuItem;
        if (!activeMenuItem) return [];

        let menuBreadcrumbs = _.map(activeMenuItem.path, menuItem => ({
            title: menuItem.title,
            route: menuItem.route
        }));

        const { routes, routerState } = this.rootStore.routerStore;
        const activeRoute = _.find(routes, { name: routerState.routeName });

        let crumbs = [];
        // append only crumbs whose route isn't prefix of active menu item route
        const data = this.rootStore.routerStore.routeDataMap.get(activeRoute.name);
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

    @action.bound
    toggleContentSidebarVisibility() {
        this.contentSidebarVisible = !this.contentSidebarVisible;
    }

    @action.bound setNavigationOptions(navigationOptions) {
        const opts = _.isFunction(navigationOptions)
                ? navigationOptions(this.rootStore)
                : navigationOptions;

        let options = null;
        if (opts && opts.title) {
            options = new NavigationOptions();
            if (_.isFunction(opts.title)) {
                const result = opts.title(this.rootStore);
                if (result instanceof Promise) {
                    options.suspend();
                    result.then((res) => {
                        options.setTitle(res);
                        options.resume();
                    })
                } else {
                    options.setTitle(result);
                }
            } else {
                options.setTitle(opts.title);
            }
        }

        this.navigationOptions = options;
    }

    @action.bound setMainMenuVisibile(visible) {
        this.mainMenuVisibile = visible;
    }

    @action.bound toggleMainMenuVisibility() {
        this.mainMenuVisibile = !this.mainMenuVisibile;
    }

    @action.bound toggleProfileMenu() {
        this.profileMenuOpen = !this.profileMenuOpen;
    }

    @action.bound setProfileMenu(visible) {
        this.profileMenuOpen = visible;
    }

    @action.bound toggleNotificationMenu() {
        this.notificationMenuOpen = !this.notificationMenuOpen;
    }

    @action.bound setNotificationMenu(visible) {
        this.notificationMenuOpen = visible;
    }

    @action.bound async logout() {
        const baasicApp = this.rootStore.application.baasic;
        const {
            authStore
        } = this.rootStore;
        const token = baasicApp.getAccessToken();

        await baasicApp.membershipModule.login.logout(token.token, token.type);
        authStore.resetSignInRedirect();
        this.rootStore.navigateLogin();
    }
}
