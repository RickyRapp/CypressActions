import _ from 'lodash';
import {
	routeProvider,
	menuProvider,
	storeProvider
} from 'core/providers';

class ModuleBuilder {
	buildRoutes(routes, ctx = {}) {
        const ctxRoutes = buildConfiguration(routes, ctx);  
		return routeProvider.initialize(ctxRoutes, ctx);
	}

	buildMenus(menus, ctx = {}) {
		const ctxMenus = buildConfiguration(menus, ctx);  
		return menuProvider.initialize(ctxMenus, ctx);
	}

	buildStores(stores, ctx = {}) {
		const ctxStores = buildConfiguration(stores, ctx);  
		return storeProvider.initialize(ctxStores, ctx);
	}
}

function buildConfiguration(items, ctx) {
    return _.map(items, 
        item => _.isFunction(item) ? item(ctx) : item
    );
}

const moduleBuilder = new ModuleBuilder();
export default moduleBuilder;