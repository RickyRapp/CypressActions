import { RouterState } from "mobx-state-router";

const getAppRouterState = (routeName, appId) => {
    return new RouterState(routeName, { appId: appId });
}

export default getAppRouterState;