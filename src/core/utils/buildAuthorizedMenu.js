import _ from 'lodash';

function buildMenu(menuItems, routes, permissionFuncs) {
    var menuTree = [];
    _.each(menuItems, function (moduleItems) {
        _.each(moduleItems, moduleItem => {
            if (hasPermission(moduleItem, permissionFuncs)) {
                let root = _.find(menuTree, t => t.title === moduleItem.title);
                if (!root) {
                    root = {
                        title: moduleItem.title,
                        subMenu: [],
                        order: moduleItem.order,
                    };
                    menuTree.push(root);
                }
                if (!root.icon && moduleItem.icon) {
                    root.icon = moduleItem.icon;
                }
                if (!root.route && moduleItem.route) {
                    root.route = moduleItem.route;
                }
                // eslint-disable-next-line
                _.each(moduleItem.subMenu, function (secondaryMenuItem, idx) {
                    var route = getRouteByMenu(secondaryMenuItem, routes);
                    if (hasPermission(route, permissionFuncs)) {
                        let subRoot = _.find(root.subMenu, t => t.title === secondaryMenuItem.title);
                        if (secondaryMenuItem.subMenu) {
                            evaluateSubMenuItems(secondaryMenuItem, routes, permissionFuncs);
                        }
                        if (!subRoot) {
                            root.subMenu = [...root.subMenu, secondaryMenuItem];
                        } else {
                            // eslint-disable-next-line
                            _.each(secondaryMenuItem.subMenu, function (terniaryMenuItem, idx) {
                                var route = getRouteByMenu(terniaryMenuItem, routes);
                                if (hasPermission(route, permissionFuncs)) {
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
function evaluateSubMenuItems(menuItem, routes, permissionFuncs) {
    var keys = [];
    _.each(menuItem.subMenu, function (subMenuItem, key) {
        var childRoute = getRouteByMenu(subMenuItem, routes);
        if (!hasPermission(childRoute, permissionFuncs)) {
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

    return _.find(routes, r => r.name === route);
}

function hasPermission(item, permissionFuncs) {
    let authorized = true;
    if (item) {
        if (item.authorization) {
            if (_.isString(item.authorization) || _.isArray(item.authorization)) {
                authorized = permissionFuncs.sectionAuthorization(item.authorization);
            }
            else {
                item.authorization()
            }
        }
        else if (item.role) {
            if (_.isString(item.role)) {
                authorized = permissionFuncs.roleAuthorization(item.role);
            }
            if (_.isArray(item.role)) {
                let l = item.role.length;
                let i = 0;
                let tempAuth = false;
                while (!tempAuth && i < l) {
                    const role = item.role[i++];
                    tempAuth = permissionFuncs.roleAuthorization(role);
                }
                authorized = tempAuth;
            }
        }
    }
    return authorized;
}

export default buildMenu;
