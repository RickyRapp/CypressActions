import _ from "lodash";
import { action, observable, computed } from "mobx";
import { MenuItem } from "core/models";

export default class MenuStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    rawMenu = null;
    @observable selectedRootMenuItemTitle = '';

    @computed get secondaryMenuVisible() {
        return (
            (this.selectedPath && this.selectedPath.length > 0)
        );
    }

    @computed get secondaryMenu() {
        const path =
            this.selectedPath.length === 0
                ? this.activePath
                : this.selectedPath;

        const parent = _.find(this.menu, (item) => item.isActiveByPath(path));
        return parent ? parent.subMenu : [];
    }

    @computed get terniaryMenu() {
        if (this.selectedPath.length !== 2) return [];

        const parent = _.find(this.secondaryMenu, (item) => item.isActiveByPath(this.selectedPath));
        return parent ? parent.subMenu : [];
    }

    @computed get tabMenu() {
        const parent = _.find(this.secondaryMenu, (item) => item.isActiveByPath(this.activePath));
        const activeSecondaryItems = parent ? parent.subMenu : [];

        const terniaryActive = _.find(activeSecondaryItems, (item) => item.isActiveByPath(this.activePath));
        return terniaryActive ? terniaryActive.subMenu : [];
    }

    @computed get activeMenuItem() {
        return _.last(this.activePath);
    }

    @action.bound setMenu(menu, toState) {
        this.rawMenu = menu;

        this.menu = [];

        const menuItems = [];
        _.each(menu, (value, idx) => { // eslint-disable-line
            const menuItem = new MenuItem({ title: value.title, subMenu: value.subMenu });
            if (value.icon) {
                menuItem.icon = value.icon;
            }

            menuItems.push({
                order: value ? value.order : undefined,
                menuItem: menuItem
            });
        });

        this.menu = _.map(
            _.orderBy(menuItems, item => item.order, "asc"),
            i => i.menuItem
        );
        this.syncMenuRoute(toState);
        
    }

    syncMenuRoute(toState){        
        if (!this.menu || this.menu.length === 0) return;

        const activeRoute = _.find(this.rootStore.routerStore.routes, {
            name: toState.routeName
        });
        const activeItem = findActiveMenuItem(this.menu, activeRoute.name);
        if (activeItem) {
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

    @action selectMenuItem = item => {
        const route = item.getRoute();
        
        // if middle menu item is set, route is null so just update path (which should reveal next level menu but not navigate), else navigate to route
        if (route !== null) {
            this.setSelectedPath([]);
            this.setActivePath(item.path);            
            this.rootStore.routerStore.goTo(route);
        } else {
            this.setSelectedPath(item.path);
        }
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
        item: null
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
                const difference = getDifference(menuRoute, route);
                if (difference >= 0 && difference <= bestMatch.difference) {
                    bestMatch.item = item;
                    bestMatch.difference = difference;
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

function getDifference(menuRoute, route) {
    let menuParts = _.split(menuRoute, '.');
    let routeParts = _.split(route, '.');

    const diff = routeParts.length - menuParts.length;
    if (diff < 0) return -1;

    return _.difference(menuParts.slice(0, -1), routeParts.slice(0, -(diff + 1))).length;
}
