import { flattenRoutes } from 'core/utils';

class RouteProvider {
    // Array of arrays
    routes = [];
    routing = null;

    //eslint-disable-next-line
    initialize(routes, ctx) { 
        this.routes = routes;
        routes.sort((a, b) => this.getRouteLevel(a) - this.getRouteLevel(b));
        const merged = this.mergeRoutes([], routes);

        return flattenRoutes(merged);
    }

    getRouteLevel(route) {
        return route.name.split('.').length;
    }

    mergeRoutes(root, routes, path = null) {
        if (routes && routes.length > 0) {
            routes.forEach(element => {
                this.mergeRoute(root, element, path);
            });
        }
        return root;
    }

    mergeRoute(root, route, path = null) {
        function getCurrentPath(path, parts) {
            if (!parts || parts.length <= 0) {
                return path;
            }

            if (path !== null && path !== undefined && path !== '') {
                const ln = path.split('.').length;
                if (parts.length <= ln) { throw new Error('Route path \'' + parts.join('.') + '\' is not named child of current path: \'' + path + '\'') }
                path += '.' + parts[ln];
            } else {
                path = parts[0];
            }
            return path;
        }     

        var parts = route.name.split('.');
        path = getCurrentPath(path, parts);

        var match = false;
        for (let i = 0; i < root.length; i++) {
            const element = root[i];
            if (element.name !== path) {
                continue;
            }        
            
            match = true;

            if (this.hasChildren(route)) {
                if (this.hasChildren(element)) {
                    if (path !== route.name) {
                        this.mergeRoute(element.children, route, path);
                    } else {
                        this.mergeRoutes(element.children, route.children, path);
                    }
                } else {
                    if (this._getRoute(root, route.name)) {
                        throw new Error('Route name: \'' + route.name + '\' already defined!');
                    }

                    element.children = [route];
                }
            } else {
                if (this.hasChildren(element)) {
                    this.mergeRoute(element.children, route, path);
                } else {
                    if (this._getRoute(root, route.name)) {
                        throw new Error('Route name: \'' + route.name + '\' already defined!');
                    }

                    element.children = [route];
                }
            }
        }

        if (!match) {
            if (this._getRoute(root, route.name)) {
                throw new Error('Route name: \'' + route.name + '\' already defined!');
            }

            if (this.hasChildren(route) && this._getRoute(route.children, route.name)) {
                throw new Error('Route name: \'' + route.name + '\' already defined!');
            }

            root.push(route);
        }
    }

    getRoute(name) {
        return this._getRoute(this.routes, name);
    }

    _getRoute(routes, name) {
        for (let i = 0; i < routes.length; i++) {
            const element = routes[i];
            if (element.name === name) {
                return element;
            } else if (this.hasChildren(element)) {
                const el = this._getRoute(element.children, name);
                if (el !== null) {
                    return el;
                }
                continue;
            }
        }

        return null;
    }

    hasChildren(route) {
        return route && route.children && route.children.length > 0;
    }
}

export default new RouteProvider();