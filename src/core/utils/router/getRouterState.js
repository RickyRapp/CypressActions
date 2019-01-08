function getRouterState(rootStore, route, params) {
    if (!rootStore.isPlatformUrl && rootStore.isMultiTenancy) {
        const applicationIdentifier = params.appId;
        if (!applicationIdentifier) {
            const cacheApplication = rootStore.app;
            if (cacheApplication) {
                return new RouterState(route, {
                    ...params,
                    appId: cacheApplication.baasic.getApiKey()
                });
            }

            return rootStore.initialState;
        } else {
            return new RouterState(route, params);
        }
    } else {
        return new RouterState(route, params);
    }
}

export default getRouterState;