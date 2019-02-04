import _ from 'lodash';
import {
  routeProvider,
  menuProvider,
  storeProvider,
  moduleProviderFactory
} from 'core/providers';

class ModuleBuilder {
  globalContext = null;

  setGlobalContext(context) {
    this.globalContext = context;
  }

  buildRoutes(moduleNames, ctx = {}) {
    const fullContext = { ...ctx, ...this.globalContext };
    const routeConfigs = getModulesConfigs(
      moduleNames,
      'getRouteConfiguration',
      fullContext
    );
    return routeProvider.buildRoutes(routeConfigs, fullContext);
  }

  buildMenus(moduleNames, ctx = {}) {
    const fullContext = { ...ctx, ...this.globalContext };
    const menuConfigs = getModulesConfigs(
      moduleNames,
      'getMenuConfiguration',
      fullContext
    );
    return menuProvider.buildMenus(menuConfigs, fullContext);
  }

  buildStores(moduleNames, ctx = {}) {
    const fullContext = { ...ctx, ...this.globalContext };
    const storeFactoryConfigs = getModulesConfigs(
      moduleNames,
      'getStoreConfiguration',
      fullContext
    );
    return storeProvider.buildStores(storeFactoryConfigs, fullContext);
  }
}

function getModulesConfigs(moduleNames, configName, context) {
  const modules = moduleProviderFactory.find(moduleNames);

  let configs = [];
  _.each(modules, module => {
    configs = [...configs, ...module[configName](context)];
  });

  return configs;
}

const moduleBuilder = new ModuleBuilder();
export default moduleBuilder;
