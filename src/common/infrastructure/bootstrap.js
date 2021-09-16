import _ from 'lodash';
import { moduleProviderFactory } from 'core/providers';

class BaasicBootstrap {
	run() {
		return this.getConfigurations(['common', 'application']);
	}

	getConfigurations(moduleNames) {
		const modules = moduleProviderFactory.find(moduleNames);

		let routes = [];
		let menus = [];
		let stores = [];

		_.each(modules, (module) => {
			routes = [...routes, ...module.getRoutes()];
			menus = [...menus, ...module.getMenus()];
			stores = [...stores, ...module.getStores()];
		});
		
		return {
			routes,
			menus,
			stores
		};
	}
}

export default new BaasicBootstrap();