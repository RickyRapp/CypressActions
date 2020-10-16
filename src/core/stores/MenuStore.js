import _ from 'lodash';
import { action, observable, computed } from 'mobx';
import { MenuItem } from 'core/models';

export default class MenuStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    rawMenu = null;
    @observable selectedRootMenuItemTitle = '';

    @computed get secondaryMenuVisible() {
        return this.selectedPath && this.selectedPath.length > 0;
    }
    @computed get secondaryMenu() {
        const path = this.selectedPath.length === 0 ? this.activePath : this.selectedPath;

        const parent = _.find(this.menu, item => item.isActiveByPath(path));
        return parent ? parent.subMenu : [];
    }
    @computed get terniaryMenuVisible() {
        return this.selectedPath && this.selectedPath.length > 1;
    }
    @computed get terniaryMenu() {
        const path = this.selectedPath.length === 1 ? this.activePath : this.selectedPath;

        const parent = _.find(this.secondaryMenu, item => item.isActiveByPath(path));
        return parent ? parent.subMenu : [];
    }

    @computed get tabMenu() {
        const parent = _.find(this.secondaryMenu, item => item.isActiveByPath(this.activePath));
        const activeSecondaryItems = parent ? parent.subMenu : [];
        const terniaryActive = _.find(activeSecondaryItems, item => item.isActiveByPath(this.activePath));
        return terniaryActive ? terniaryActive.subMenu : [];
    }

    @computed get activeMenuItem() {
        return _.last(this.activePath);
    }

    @action.bound setMenu(menu, toState) {
        this.rawMenu = menu;
        this.menu = [];
        const menuItems = [];
        // eslint-disable-next-line
        _.each(menu, (value, idx) => {
            const menuItem = new MenuItem({
                title: value.title,
                subMenu: value.subMenu,
                route: value.route ? value.route : undefined,
            });

            if (value.icon) {
                menuItem.icon = value.icon;
            }

            menuItems.push({
                order: value ? value.order : undefined,
                menuItem: menuItem,
            });
        });

        this.menu = _.map(_.orderBy(menuItems, item => item.order, 'asc'), i => i.menuItem);
        this.syncMenuRoute(toState);
    }

    syncMenuRoute(toState) {
        if (!this.menu || this.menu.length === 0) return;
        const activeRoute = _.find(this.rootStore.routerStore.routes, {
            name: toState.routeName,
        });
        const activeItem = findActiveMenuItem(this.menu, activeRoute.name);
        if (activeItem) {
            this.setSelectedPath([]);
            this.setActivePath(activeItem.path);
        } else {
            // default to organization active (only root menu), and nothing selected
            this.setActivePath(this.menu[0].path);
            this.setSelectedPath([]);
        }
    }

    @action.bound setActivePath(path) {
        this.activePath = path;
    }

    @action.bound setSelectedPath(path) {
        this.selectedPath = path;
    }

    @observable menu = null;
    @observable activePath = [];
    @observable selectedPath = [];
    @observable isCollapsed = true;
    @observable isOpen = false;

    //toggle collapse, closes menu on collapse
    @action.bound toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
            this.closeMenu();
        }
        this.isOpen = false;
    }

    //Expands menu when secondary menu opens
    @action.bound menuExpand() {
        if (this.isCollapsed && this.secondaryMenu.length > 0) {
            this.isCollapsed = false;
        }
    }

    //toggles menu open/close is-open, for mobile
    @action.bound toggleMenuOpen() {
        this.isOpen = !this.isOpen;
        this.isCollapsed = false;
    }

    @action selectMenuItem = (item, e) => {
        const route = item.getRoute();
        // if middle menu item is set, route is null so just update path (which should reveal next level menu but not navigate), else navigate to route
        if (route !== null) {
            //sets selected path to primary menu item
            this.setSelectedPath(item.path[0].path);
            this.setActivePath(item.path);
            this.rootStore.routerStore.goTo(route);
        } else {
            this.setSelectedPath(item.path);
        }
        this.menuExpand();
        e && e.preventDefault();
    };

    @action closeMenu = () => {
        this.setSelectedPath([]);
    };

    @action.bound onMenuPin() {
        this.menuPinned = !this.menuPinned;
    }
}

function findActiveMenuItem(menu, route) {
    let bestMatch = {
        difference: 0,
        item: { path: [] },
    };

    for (let i = 0; i < menu.length; i++) {
        const item = menu[i];
        if (item.route) {
            const menuRoute = typeof item.route === 'function' ? item.route() : item.route;
            if (menuRoute === route) {
                // return menu item that has exact route as specified route
                return item;
            } else {
                // find menu item that has 'closest' route match to specified route
                // e.g. master.platform.main.user.create doesn't have menu definition
                // so its closest match would be master.platform.main.user.list
                const match = isMatch(menuRoute, route);
                if (match) {
                    return item;
                }
            }
        }

        if (item.hasChildren) {
            const child = findActiveMenuItem(item.subMenu, route);
            if (child) {
                return child;
            }
        }
    }

    return bestMatch.item;
}

function isMatch(menuRoute, route) {
    let menuParts = _.split(menuRoute, '.');
    let routeParts = _.split(route, '.');

    let diff = routeParts.length - menuParts.length;
    if (diff < 0) {
        return false;
    }

    let valDiff = _.difference(menuParts, routeParts.slice(0, routeParts.length - diff));

    if (valDiff.length > 0 && menuParts.length > 4) {
        menuParts = menuParts.slice(0, 4);
        routeParts = routeParts.slice(0, 4);

        valDiff = _.difference(menuParts, routeParts);
    }

    return valDiff.length === 0 ? true : false;
}
