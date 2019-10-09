import _ from 'lodash';

function buildMenu(menuItems, routes, permissionFunc) {
    var menuTree = [];
    _.each(menuItems, function (moduleItems) {
        _.each(moduleItems, (moduleItem) => {
            let root = _.find(menuTree, t => t.title === moduleItem.title);
            if (!root) {
                root = {
                    title: moduleItem.title,
                    subMenu: []
                };
                menuTree.push(root);         
            }

            if (!root.icon && moduleItem.icon) {
                root.icon = moduleItem.icon;
            }

            _.each(moduleItem.subMenu, function (menuItem, idx) { // eslint-disable-line
                var route = getRouteByMenu(menuItem, routes);
                if (hasPermission(route, permissionFunc)) {
                    if (menuItem.subMenu) {
                        evaluateSubMenuItems(menuItem, routes, permissionFunc);
                    }

                    root.subMenu = [...root.subMenu, menuItem];
                }
            });
        });
    });
    
    return menuTree;
}

function evaluateSubMenuItems(menuItem, routes, permissionFunc) {
    var keys = [];
    _.each(menuItem.subMenu, function (subMenuItem, key) {
        var childRoute = getRouteByMenu(subMenuItem, routes);
        if (!hasPermission(childRoute, permissionFunc)) {
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

function hasPermission(item, permissionFunc) {
    let authorized = true;
    if (item && item.authorization) {
        if (_.isString(item.authorization) || _.isArray(item.authorization)) {
            authorized = permissionFunc(item.authorization);
        } else {
            authorized = item.authorization();
        }
    } 
    return authorized;
}

export default buildMenu;