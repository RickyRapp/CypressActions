import React from 'react';
import { RouterState } from 'mobx-state-router';
import { flattenArray } from 'core/utils';
import _ from 'lodash';

const suffixDictionary = {
    '.list': '',
    '.edit': 'BREADCRUMBS.EDIT',
    '.create': 'BREADCRUMBS.CREATE',
    '.language': 'BREADCRUMBS.LANGUAGE',
    '.localization': 'BREADCRUMBS.LANGUAGE',
    '.settings': 'BREADCRUMBS.SETTINGS',
    '.preview': 'BREADCRUMBS.PREVIEW'
}

export default function flattenRoutes(routes) {
    var flatRoutes = getFlatRoutes(routes);
    return {
        routes: flatRoutes,
        routerMaps: getRouterMaps(flatRoutes)
    }
}

function getRouterMaps(flatRoutes) {
    var maps = {};
    flatRoutes.forEach(item => {
        maps[item.name] = item.component;
    });
    return maps;
}

function getFlatRoutes(routes, parentOptions = []) {
    return flattenArray(routes.map(r => {
        return flatten(r, parentOptions);
    }));
}

function flatten(route, parentOptions = []) {
    let options = new StateRouteOptions(route, parentOptions);
    route.parent = options.parent;

    if (route.children && route.children.length > 0) {
        options.parent = route;
        options.appendLayouts(route.component);

        var children = getFlatRoutes(route.children, [...parentOptions, options]);
        return [...children];
    }

    // Support adding layout to leaf component (one that should be presented for that route)
    if (_.isArray(route.component) && route.component.length > 1) {
        var [component] = route.component.splice(-1);
        options.appendLayouts(route.component);
        route.component = component;
    }

    const stateRoute = new StateRoute(route, [...parentOptions, options]);
    return [stateRoute];
}

class StateRoute {
    constructor(route, parentOptions = []) {
        this.name = route.name;
        this.parent = route.parent;
        this.isPublic = route.isPublic || false;

        this.pattern = _.reduce(parentOptions, (prev, current) => joinPaths(prev, current.pattern), '');
        this.authorization = _.filter(
            _.map(parentOptions, p => p.authorization),
            f => !_.isNil(f) && f !== ''
        );

        const optionLength = parentOptions.length;
        this.data = _.reduce(parentOptions, (prev, current, idx) => {
            if (current.data) {
                if (current.data.title) {
                    prev.title = current.data.title;
                }

                if (current.data.back) {
                    prev.back = current.data.back;
                }

                if (current.data.crumbs) {
                    const crumbs = _.isArray(current.data.crumbs) ? current.data.crumbs : [current.data.crumbs];
                    prev.crumbs = [...prev.crumbs, ...crumbs];
                } else if (optionLength - 1 === idx) {
                    prev.crumbs = [...prev.crumbs,
                    {
                        title: getBreadcrumbTitle(route.data.breadcrumb || route.name),
                        route: route.name
                    }
                    ];
                }

                // NOTICE: add more properties here if you want to support them in data property
                if (current.data.type) {
                    prev.type = current.data.type;
                }
            }

            return prev;
        }, {
            crumbs: []
        });

        this.component = this.getComponent(route, parentOptions);

        this.onExit = (fromState, toState, routerStore) => {
            const router = routerStore.rootStore.routerStore;
            return this.fireEvent('onExit', fromState, toState, router, parentOptions);
        }
        this.onEnter = (fromState, toState, routerStore) => {
            const router = routerStore.rootStore.routerStore;
            return this.fireEvent('onEnter', fromState, toState, router, parentOptions);
        }
        this.beforeExit = (fromState, toState, routerStore) => {
            const router = routerStore.rootStore.routerStore;
            return this.fireEvent('beforeExit', fromState, toState, router, parentOptions);
        }
        this.beforeEnter = async (fromState, toState, routerStore) => {
            const { rootStore } = routerStore;
            if (fromState.routeName !== toState.routeName) {
                rootStore.viewStore.setNavigationOptions(null);
            } else if (_.isEqual(fromState.params, toState.params)) {
                // if same state and same params don't initiaze any beforeEnter actions
                return Promise.resolve();
            }

            try {
                await this.fireEvent('beforeEnter', fromState, toState, routerStore.rootStore.routerStore, parentOptions);

                await rootStore.routeChange({
                    fromState,
                    toState,
                    options: {
                        authorization: this.authorization,
                        pattern: this.pattern,
                        data: this.data,
                        isPublic: this.isPublic
                    }
                });
            } catch (ex) {
                return Promise.reject(ex);
            }

            return Promise.resolve();
        }
    }

    getComponent(route, parentOptions) {
        var layouts = parentOptions.reduce((acc, current) => {
            return [...acc, current.layouts]
        }, []);
        layouts = flattenArray(layouts).reverse();
        layouts.forEach(w => {
            route.component = renderParentComponent({ Parent: w, component: route.component });
        });

        return renderComponent(route.component);
    }

    // executes all parents and own event in order starting from initial parent
    // NOTE: this method is initiated when:
    // 1. route name is changed - in this case parts that changed are compared and only those
    //         parts are fired. e.g. master.user.edit -> master.user.list 
    //         means that only master.user.list event will be fired (master and master.user will be skipped since they are same as on previous route)
    // 2. custom condition has been defined for the route - condition is always inherited from
    //        parent route and it overrides rule 1. if defined. 
    //        It can be defiend on route as hookCondition: (fromState, toState, routerState) => { return bool; }
    //        If hookCondition returns false on master but true on master.user everything beneath master.user (including master.user) will be initiated
    async fireEvent(
        name,
        fromState,
        toState,
        routerStore,
        parentOptions
    ) {
        const routeChanged = fromState.routeName !== toState.routeName;

        let hookCondition = false;
        for (let i = 0; i < parentOptions.length; i++) {
            const routeOptions = parentOptions[i];
            const hook = routeOptions[name];
            // if there is no hook defined for route options, continue
            if (_.isNil(hook)) continue;

            if (routeOptions.hookCondition) {
                hookCondition = routeOptions.hookCondition(fromState, toState, routerStore);
            }

            if (routeChanged || hookCondition) {
                const skipRoutePrefix = getSkipRoutePrefix(fromState, toState);
                if (hookCondition || !skipRoutePrefix || !_.startsWith(skipRoutePrefix, routeOptions.name)) {
                    try {
                        await hook(fromState, toState, routerStore);
                    } catch (ex) {
                        if (process.env.NODE_ENV === 'development' && !(ex instanceof RouterState)) {
                            console.log(ex); // eslint-disable-line
                        }
                        return Promise.reject(ex);
                    }
                }
            }
        }

        return Promise.resolve();
    }
}

class StateRouteOptions {
    constructor(route, parentOptions = []) {
        this.layouts = [];
        this.name = route.name;
        this.pattern = route.pattern;
        this.authorization = route.authorization;
        this.data = route.data;

        this.parent = parentOptions.length > 0 ? _.last(parentOptions).parent : null;

        this.hookCondition = route.hookCondition;
        this.beforeExit = route.beforeExit;
        this.beforeEnter = route.beforeEnter;
        this.onExit = route.onExit;
        this.onEnter = route.onEnter;
    }

    appendLayouts(items) {
        let layouts = items ? (_.isArray(items) ? items : [items]) : [];
        this.layouts = [...this.layouts, ...layouts];
    }
}

function renderComponent(Component, props = {}) {
    return <Component {...props} />;
}

function renderParentComponent({ Parent, component }) {
    return (props) => <Parent {...props} render={renderProps => {
        return renderComponent(component, renderProps)
    }
    } />
}

function joinPaths(a, b) {
    a = a || '';
    b = b || '';
    if (b === '') return a;
    return removeEndingSlash(a) + '/' + removeStartingSlash(b);
}

function removeStartingSlash(str) {
    return str.replace(/^[\/]+/, ''); // eslint-disable-line
}

function removeEndingSlash(str) {
    return str.replace(/[\/]+$/, ''); // eslint-disable-line
}

function getSkipRoutePrefix(fromState, toState) {
    const fromParts = getRouteParts(fromState.routeName);
    const toParts = getRouteParts(toState.routeName);

    let skipRoutePrefix = undefined;
    const length = fromParts.length;
    for (let j = 0; j < toParts.length; j++) {
        if (length < j + 1) {
            break;
        }

        const fromElement = fromParts[j];
        const toElement = toParts[j];
        if (fromElement === toElement) {
            skipRoutePrefix = skipRoutePrefix === undefined ? toElement : (skipRoutePrefix + '.' + toElement)
        }
    }
    return skipRoutePrefix;
}

function getBreadcrumbTitle(routeName) {
    const suffix = routeName.substring(routeName.lastIndexOf("."));
    let breadcrumb;

    if (suffixDictionary[suffix]) {
        breadcrumb = suffixDictionary[suffix];
    } else if (!routeName.includes('.')) {
        breadcrumb = routeName;
    }

    return breadcrumb;
}

function getRouteParts(route) {
    return route.split('.');
}

