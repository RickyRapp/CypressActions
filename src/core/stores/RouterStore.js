import { RouterState, RouterStore as MobxStateRouterStore } from 'mobx-state-router';
import { observable, computed, observe } from 'mobx';
import _ from 'lodash';

class RouterStore {
    routeHistory = [];
    router = null;
    transitionData = {};

    // route data definition per route
    // map in format: <route-name> : <{ title, crumbs: [{ title, route }]}>
    @observable routeDataMap = observable.map([]);
    @observable routerInitialized = false;

    get routes() { return this.router.routes; }

    @computed get routerState() { return this.router.routerState; }

    constructor(rootStore, routes) {
        this.rootStore = rootStore;

        this.router = new MobxStateRouterStore(
            rootStore,
            routes,
            new RouterState('master.not-found')
        );

        observe(this, 'routerState',
        // eslint-disable-next-line
            ({ oldValue, newValue }) => {
                var index = _.findIndex(this.routeHistory, {
                    routeName: newValue.routeName
                });

                if (!_.isNil(index) && index !== -1) {
                    // route exists in history, remove it so it can be added on top of stack (below)
                    this.routeHistory.splice(index, 1);
                }

                this.routeHistory.push(newValue);

                if (!this.routerInitialized) {
                    this.routerInitialized = true;
                }

                this.rootStore.menuStore.syncMenuRoute(newValue);
            }
        );
    }

    async goTo(route, params, queryParams) {
        let newRoute;
        let newParams;
        let newQueryParams;
        if (route instanceof RouterState) {
            newRoute = route.routeName;
            newParams = route.params;
            newQueryParams = route.queryParams;
        } else {
            newRoute = route;
            newParams = params;
            newQueryParams = queryParams;
        }

        newParams = newParams || {};
        newQueryParams = newQueryParams || {};

        // if new params don't have application identifier, old state had it and we are still on 'master.app' route, just
        // reuse old identifier to avoid whole application initialization logic
        // if (_.startsWith(newRoute, 'master.app') && !newParams.applicationIdentifier && this.routerState.params.applicationIdentifier) {
        //     newParams = {
        //         ...newParams,
        //         applicationIdentifier: this.routerState.params.applicationIdentifier
        //     }
        // }

        const newState = await this.router.goTo(newRoute, newParams, newQueryParams);
        this.transitionData = {};
        return newState;
    }

    goToNotFound() {
        return this.router.goToNotFound();
    }

    getCurrentRoute() {
        return this.router.getCurrentRoute();
    }

    getRoute(routeName) {
        return this.router.getRoute(routeName);
    }

    setErrorHook(handler) {
        this.router.setErrorHook(handler);
    }

    isInitial() {
        return this.routeHistory.length <= 1;
    }

    goBack(steps = 1) {
        if (this.isInitial()) {
            const routeData = this.routeDataMap.get(this.routerState.routeName);
            if (routeData && routeData.back) {
                if (typeof routeData.back === 'function') {
                    return routeData.back();
                }

                const gotoData = this.routeHistory.find(i => i.routeName === this.routerState.routeName);

                return this.goTo(routeData.back, gotoData.params, gotoData.queryParams);
            }
            else {
                // route to dashboard if no back function present
                return this.goTo(this.rootStore.initialState);
            }
        } else {
            this.routeHistory.pop();

            // just a 'safe' transform if someone passes 'goBack' as onClick action
            // because then steps would be js event
            const numberOfSteps = typeof steps === 'number' ? steps : 1;

            // this allows to go back multiple steps
            const backStepsCount = this.routeHistory.length - numberOfSteps;
            const backSteps = backStepsCount < 0 ? 1 : backStepsCount;

            let newState = this.routeHistory[backSteps];
            if (newState) {
                // if there is already application on current state, route to that application
                // in case back leads to previous application and we don't want that
                if (this.routerState.params.applicationIdentifier) {
                    newState = new RouterState(newState.routeName, {
                        ...(newState.params || {}),
                        applicationIdentifier: this.routerState.params.applicationIdentifier,
                        ...(newState.queryParams || {})
                    });
                }

                this.goTo(newState);
            }
        }
    }

    setQueryParams(params) {
        return this.goTo(this.getCurrentRoute().name, this.routerState.params, params);
    }

    setTransitionData(data) {
        this.transitionData = {
            ...this.transitionData,
            ...(data || {})
        };
    }

    findRoute(name) {
        return _.find(this.router.routes, (route) => route.name === name);
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

    getCurrentData() {
        return this.routeDataMap.get(this.routerState.routeName);
    }
}

export default RouterStore;
