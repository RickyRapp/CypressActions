import { RouterState, routerStateToUrl } from 'mobx-state-router';

async function resolvePlatformUser(fromState, toState, routerStore) {
  const authStore = routerStore.rootStore.authStore;
  await authStore.initialize();

  const app = routerStore.rootStore.platform.baasic;

  const isAppUser = u =>
    u.isApplicationUser !== undefined && u.isApplicationUser === true;
  const resolveUnauthorized = () =>
    authStore.isAuthenticated
      ? Promise.reject(new RouterState('unauthorized'))
      : Promise.reject(new RouterState(routerState.rootState.getLoginRoute()));

  if (authStore.isAuthenticated) {
    var user = app.getUser();
    user = user !== null && user !== undefined ? user.user : null;

    if (user === undefined || user === null) {
      try {
        const response = await app.membershipModule.login.loadUserData();
        const user = response.data;
        if (isAppUser(user)) {
          return resolveUnauthorized();
        }

        const applications = await app.applicationSettingModule.find({
          pageNumber: 1,
          pageSize: 1000,
          orderBy: 'dateCreated',
          orderDirection: 'desc'
        });
        user.applications = applications.data.item;

        authStore.setUser(user);
        return Promise.resolve();
      } catch (ex) {
        const { statusCode } = ex;
        if (statusCode === 401) {
          return resolveUnauthorized();
        } else {
          routerStore.rootStore.errorStore.setError({
            Error: 'Something went wrong while trying to fetch platform user'
          });
          return Promise.reject(new RouterState('master.error'));
        }
      }
    }

    authStore.setUser(user);
    return Promise.resolve();
  }

  return resolveUnauthorized();
}

async function resolveApplicationUser(fromState, toState, routerStore) {
  const authStore = routerStore.rootStore.authStore;
  await authStore.initialize();

  const baasicApplication = routerStore.rootStore.app.baasic;
  const resolveUnauthorized = () =>
    authStore.isAuthenticated
      ? Promise.reject(new RouterState('unauthorized'))
      : Promise.reject(
          routerState.rootStore.getLoginRoute(baasicApplication.getApiKey())
        );

  const getAppUser = async () => {
    try {
      authStore.resetPermissions();
      const response = await baasicApplication.membershipModule.login.loadUserData(
        { embed: 'permissions' }
      );
      const user = {
        ...response.data,
        isApplicationUser: true,
        apiKey: baasicApplication.getApiKey()
      };
      authStore.setUser(user);
      return Promise.resolve();
    } catch (ex) {
      const { statusCode } = ex;
      if (statusCode === 401) {
        authStore.resetPermissions();
        authStore.setUser(null);
        return resolveUnauthorized();
      } else {
        routerStore.rootStore.errorStore.setError({
          Error: 'Something went wrong while trying to fetch application user'
        });
        return Promise.reject(new RouterState('master.error'));
      }
    }
  };

  if (authStore.isAuthenticated) {
    var user = baasicApplication.getUser();
    user = user !== null && user !== undefined ? user.user : null;

    if (user && user.apiKey !== baasicApplication.getApiKey()) {
      // cached user from previously accessed app, remove it
      user = null;
      baasicApplication.setUser(user);
    }

    if (user === undefined || user === null) {
      return await getAppUser();
    } else if (authStore.hasPermission()) {
      if (user.isApplicationUser === false) {
        return await getAppUser();
      } else {
        authStore.setUser(user);
        return Promise.resolve();
      }
    }
  }

  return resolveUnauthorized();
}

export { resolvePlatformUser, resolveApplicationUser };
