import _ from 'lodash';
import {
	routeProvider,
	menuProvider,
	storeProvider
} from "core/providers";

class ModuleProvider {
	configurations = [];

	register(config) {
		this.configurations.push(config);
	}

	getRouteConfiguration(context) {
		const items = [];
		_.each(this.configurations, (config) => {
			if (config.routes) {
				const routes = _.isFunction(config.routes) ? config.routes(context) : config.routes;
				items.push(...routes);
			}
		});
		return items;
	}

	getMenuConfiguration(context) {
		const items = [];
		_.each(this.configurations, (config) => {
			if (config.menu) {
				items.push(_.isFunction(config.menu) ? config.menu(context) : config.menu);
			}
		});
		return items;
	}

	getStoreConfiguration(context) {
		const items = [];
		_.each(this.configurations, (config) => {
			if (config.storeFactory) {
				items.push(config.storeFactory);
			}
		});
		return items;
	}
}

export default ModuleProvider;