import _ from 'lodash';

function buildMenu(menuItems, routes, rootStore) {
    var menuTree = [];
    _.each(menuItems, function (moduleItems) {
        _.each(moduleItems, (moduleItem) => {
            if (hasPermission(moduleItem, rootStore)) {

                let root = _.find(menuTree, t => t.title === moduleItem.title);
                if (!root) {
                    root = {
                        title: moduleItem.title,
                        subMenu: [],
                        order: moduleItem.order
                    };
                    menuTree.push(root);
                }
                if (!root.icon && moduleItem.icon) {
                    root.icon = moduleItem.icon;
                }
                if (!root.route && moduleItem.route) {
                    root.route = moduleItem.route;
                }
                _.each(moduleItem.subMenu, function (secondaryMenuItem, idx) { // eslint-disable-line
                    var route = getRouteByMenu(secondaryMenuItem, routes);
                    if (hasPermission(route, rootStore)) {
                        let subRoot = _.find(root.subMenu, t => t.title === secondaryMenuItem.title);
                        if (secondaryMenuItem.subMenu) {
                            evaluateSubMenuItems(secondaryMenuItem, routes, rootStore);
                        }
                        if (!subRoot) {
                            root.subMenu = [...root.subMenu, secondaryMenuItem];
                        }
                        else {
                            _.each(secondaryMenuItem.subMenu, function (terniaryMenuItem, idx) { // eslint-disable-line
                                var route = getRouteByMenu(terniaryMenuItem, routes);
                                if (hasPermission(route, rootStore)) {
                                    subRoot.subMenu = [...subRoot.subMenu, terniaryMenuItem];
                                }
                            });
                            subRoot.subMenu = _.orderBy(subRoot.subMenu, 'order', 'asc');
                        }
                    }
                });
                root.subMenu = _.orderBy(root.subMenu, 'order', 'asc');
            }
        });
    });

    return menuTree;
}
function evaluateSubMenuItems(menuItem, routes, rootStore) {
    var keys = [];
    _.each(menuItem.subMenu, function (subMenuItem, key) {
        var childRoute = getRouteByMenu(subMenuItem, routes);
        if (!hasPermission(childRoute, rootStore)) {
            keys.push(key);
        } else {
            if (subMenuItem.subMenu) {
                evaluateSubMenuItems(subMenuItem);
            }
        }
    });
    _.each(keys.reverse(), function (key) {
        if (_.isArray(menuItem.subMenu)) {
            menuItem.subMenu.splice(key, 1);
        } else {
            delete menuItem.subMenu[key];
        }
    });

    menuItem.subMenu = _.orderBy(menuItem.subMenu, 'order', 'asc');
}

function getRouteByMenu(menuItem, routes) {
    var route = '';
    if (menuItem.route === 'function') {
        const menuRoute = menuItem.route();
        if (menuRoute === null) return null;

        route = menuRoute.routeName;
    } else {
        route = menuItem.route;
    }

    return _.find(routes, (r) => r.name === route);
}

function hasPermission(item, rootStore) {
    let authorized = true;
    if (item && item.authorization) {
        if (_.isString(item.authorization)) {
            authorized = rootStore.permissionStore.hasPermission(item.authorization);
        } else if (_.isArray(item.authorization)) {
            if (_.isFunction(item.authorization[0])) {//due to flattenRoutes.js in StateRoute constructore where this.authorization is build
                authorized = item.authorization[0](item, rootStore);
            }
            else {
                authorized = rootStore.permissionStore.hasPermission(item.authorization);
            }
        }
        else {
            authorized = item.authorization(item, rootStore);
        }
    }
    return authorized;
}

export default buildMenu;