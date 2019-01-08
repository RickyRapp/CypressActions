import React from 'react';
import { RouterState } from 'mobx-state-router';
import { flattenArray, isSome } from 'core/utils';
import _ from 'lodash';

export default function flattenRoutes(rootStore, routes) {
    var flatRoutes = getFlatRoutes(rootStore, routes);
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

function getFlatRoutes(rootStore, routes, parentOptions = []) {
    return flattenArray(routes.map(r => {
        return flatten(rootStore, r, parentOptions);
    }));
}

function flatten(rootStore, route, parentOptions = []) {
    let options = new StateRouteOptions(route, parentOptions);
    route.parent = options.parent;

    if (route.children && route.children.length > 0) {
        options.parent = route;
        options.appendLayouts(route.component);

        var children = getFlatRoutes(rootStore, route.children, [...parentOptions, options]);
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
        this.authorization = route.authorization;

        this.pattern = _.reduce(parentOptions, (prev, current) => joinPaths(prev, current.pattern), '');        
        this.isPrivate = _.reduce(parentOptions, (prev, current) => prev || current.isPrivate, false);

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
                    _.each(crumbs, (c) => { 
                        c.route = current.name
                        c.canNavigate = false;
                    });
                    prev.crumbs = [...prev.crumbs, ...crumbs];
                } else if (optionLength - 1 === idx) {
                    prev.crumbs = [...prev.crumbs, 
                        {
                            title: getBreadcrumbTitle(route.name),
                            route: route.name,
                            canNavigate: true
                        }
                    ];
                }
            }

            return prev;
        }, {
            crumbs: []
        });

        this.component = this.getComponent(route, parentOptions);      

        this.onExit = (fromState, toState, routerStore) => { 
            return this.fireEvent('onExit', fromState, toState, routerStore, parentOptions);
        }
        this.onEnter = (fromState, toState, routerStore) => { 
            return this.fireEvent('onEnter', fromState, toState, routerStore, parentOptions);
        }
        this.beforeExit = (fromState, toState, routerStore) => { 
            return this.fireEvent('beforeExit', fromState, toState, routerStore, parentOptions);
        }
        this.beforeEnter = async (fromState, toState, routerStore) => { 
            const { rootStore } = routerStore;
            if (routerStore.isSilentTransition === true) return Promise.resolve();
         
            try {
                await this.fireEvent('beforeEnter', fromState, toState, routerStore, parentOptions, (option) => {
                    if (option.isPrivate) {
                        if (!rootStore.authStore.isAuthenticated) {
                            rootStore.authStore.setSignInRedirect(toState);
                            return Promise.reject(rootStore.getLoginRoute());
                        }
                    }

                    return Promise.resolve();
                }, (option) => {
                    if (isSome(option.authorization) && !rootStore.authStore.hasPermission(option.authorization)) {
                        return Promise.reject(new RouterState('unauthorized'));
                    }

                    return Promise.resolve();
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
    async fireEvent(
        name, 
        fromState,
        toState,
        routerStore,
        parentOptions, 
        beforeEvent = () => Promise.resolve(), 
        afterEvent = () => Promise.resolve()
    ) {
        for (let i = 0; i < parentOptions.length; i++) {
            const current = parentOptions[i];

            await beforeEvent(current);
    
            if (current[name] 
                && (fromState.routeName !== toState.routeName || !compareObjects(fromState.params, toState.params))
            ) {
                const skipRoutePrefix = getSkipRoutePrefix(fromState, toState);
                if (!skipRoutePrefix || !_.startsWith(skipRoutePrefix, current.name)) {
                    try {              
                        await current[name](fromState, toState, routerStore);
                    } catch (ex) {
                        if (process.env.NODE_ENV === 'development' && typeof ex !== RouterState) {
                            console.log(ex);
                        }                    
                        return Promise.reject(ex);
                    }
                }                
            }

            await afterEvent(current);
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

        this.parent = parentOptions.length > 0 ? _.last(parentOptions).parent : null
        this.isPrivate = route.isPrivate || false;        

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
        return renderComponent(component, renderProps)} 
    }/>
}

function joinPaths(a, b) {
    a = a || '';
    b = b || '';
    if (b === '') return a;
    return removeEndingSlash(a) + '/' + removeStartingSlash(b);
}

function removeStartingSlash(str) {
    return str.replace(/^[\/]+/, '');
}

function removeEndingSlash(str) {
    return str.replace(/[\/]+$/, '');
}

function compareObjects(o1, o2) {
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
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
    const predicate = (suffix) => _.endsWith(routeName, suffix);

    let breadcrumb;
    if (predicate('.list')) {
        breadcrumb = '';
    } else if (predicate('.edit')) {
        breadcrumb = 'BREADCRUMBS.EDIT';
    } else if (predicate('.create')) {
        breadcrumb = 'BREADCRUMBS.CREATE';
    } else if (predicate('.language') || predicate('.localization')) {
        breadcrumb = 'BREADCRUMBS.LANGUAGE';
    } else if (predicate('.settings')) {
        breadcrumb = 'BREADCRUMBS.SETTINGS'
    }
    return breadcrumb;
}

function getRouteParts(route) {
    return route.split('.');
}

