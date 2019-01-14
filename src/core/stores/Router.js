import _ from 'lodash';
import { RouterState, RouterStore, HistoryAdapter } from 'mobx-state-router';
import { computed, reaction, observable } from 'mobx';
import { history } from "common/utils";

class Router {
    rootStore = null;
    routerStore = null;
    historyAdapter = null;
    routeHistory = [];
    routerInitialized = false; 
    inSilentTransition = false;
    navigateBackFunc = null;
    routes = [];

    // route data definition per route
    // map in format: <route-name> : <{ title, crumbs: [{ title, route }]}>
    @observable routeDataMap = observable.map([]);      

    constructor(rootStore, routes, notFoundState) {
        this.rootStore = rootStore;
        this.routes = routes;

        this.routerStore = new RouterStore(rootStore, routes, notFoundState);
        this.historyAdapter = new HistoryAdapter(this.routerStore, history);
        this.historyAdapter.observeRouterStateChanges();

        reaction(
            () => this.routerStore.routerState,
            (routerState) => {
                const { routeHistory } = this;
                var index = _.findIndex(routeHistory, { routeName: routerState.routeName });

                if (!_.isNil(index) && index !== -1) {
                    // route exists in history, remove it so it can be added on top of stack (below)
                    routeHistory.splice(index, 1);
                }

                routeHistory.push(routerState);

                if (!this.routerInitialized) {
                    this.routerInitialized = true;
                }
            }
        );
    }

    get currentRoute() { 
        return this.routerStore.getCurrentRoute(); 
    }

    @computed get routerState() {
        return this.routerStore.routerState;
    }

    goTo(destination, params, queryParams) { // old compatibility
        return this.navigate(destination, params, queryParams);
    }

    navigate(destination, params, queryParams) {
        let newState = null;
        if (destination instanceof RouterState) {
            newState = getNextRouterState(this.rootStore, destination.routeName, destination.params, destination.queryParams);
        } else {
            newState = getNextRouterState(this.rootStore, destination, params, queryParams);
        }

        return this.routerStore.goTo(newState);
    }

    getRoute(name) {
        return this.routerStore.getRoute(name);
    }

    setErrorHandler(handler) {
        this.routerStore.setErrorHook(handler);
    }

    goBack() {
        return this.navigateBack(); // old compatibility
    }

    navigateBack() {
        const { routerStore, routeHistory, routeDataMap } = this;

        if (routeHistory.length <= 1) { 
            // if initial route
            const routeData = routeDataMap.get(routerStore.routerState.routeName);
            if (routeData && routeData.back) {
                if (typeof routeData.back === 'function') {
                    return routeData.back();
                }

                return this.navigate(routeData.back);
            }
        } else {
            routeHistory.pop();
            let newState = routeHistory[routeHistory.length - 1];
            if (newState) {
                this.navigate(newState);
            }
        }         
    }
   
    setQueryParams(params) {       
        return this.silentTransition(this.currentRoute.name, params);
    }

    updateQueryParams(params) {
        const { currentRoute, routeHistory } = this;  

        var toRoute = routeHistory.length === 0 
            ? this.rootStore.initialState : currentRoute.name;
        return this.silentTransition(toRoute, { ...this.routerStore.routerState.queryParams, ...params });
    }
    
    silentTransition(route, params) {
        this.inSilentTransition = true;
        return this.navigate(route, this.routerStore.routerState.params, params)
            .then(() => {
                this.inSilentTransition = false;
            }) 
    }

    setRouteTitle(routeTitleMap) {
        this.setRouteData(routeTitleMap, (value) => ({
            title: value
        }));
    }

    setRouteNavigateBack(routeBackMap) {
        this.setRouteData(routeBackMap, (value) => ({
            back: value
        }));
    }

    setRouteData(routeDataMap, getMergeObject) {
        _.forOwn(routeDataMap, (value, key) => {
            const routeData = this.routeDataMap.get(key) || {};
            const newRouteData = _.merge({}, routeData, getMergeObject(value));
            this.routeDataMap.set(key, newRouteData);
        });
    }
}

function getNextRouterState(rootStore, routeName, params, queryParams) {
    const { routerState } = rootStore.routerStore;    

    if ((_.isNil(params) || _.isNil(params.appId)) && _.startsWith(routeName, 'master.app.')) {
        if (routerState.params && !_.isNil(routerState.params.appId) && routerState.params.appId !== '') {
            // reuse current application identifier
            return new RouterState(routeName, {
                ...params,
                appId: routerState.params.appId
            }, queryParams);
        }
    }

    return new RouterState(routeName, params, queryParams);
}


export default Router;