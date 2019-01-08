import _ from "lodash";
import { action, observable, computed } from "mobx";
import { MenuItem } from "core/models";
import { BaasicDropdownStore } from "core/stores";

export default class MenuStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    rawMenu = null;
    @observable menuPinned = true;

    @computed get secondaryMenuVisible() {
        return (
            (this.selectedPath && this.selectedPath.length > 0) ||
            this.menuPinned
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
        _.each(menu, (value, idx) => {
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

    @action.bound setVersion(version) {
        this.version = version;
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
        const menuItem = item.hasChildren && item.depth === 3 ? item.subMenu[0] : item; // custom handling of tabs which start at depth 3
        const route = menuItem.getRoute();
        
        // if middle menu item is set, route is null so just update path (which should reveal next level menu but not navigate), else navigate to route
        if (route !== null) {
            this.setSelectedPath([]);
            this.setActivePath(menuItem.path);            
            this.rootStore.routerStore.navigate(route);
        } else {
            this.setSelectedPath(menuItem.path);
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

function getDifference(menuRoute, route, lastDifference = 0) {
    let menuParts = _.split(menuRoute, '.');
    let routeParts = _.split(route, '.');

    const diff = routeParts.length - menuParts.length;
    if (diff < 0) return -1;

    return _.difference(menuParts.slice(0, -1), routeParts.slice(0, -(diff + 1))).length;
}
