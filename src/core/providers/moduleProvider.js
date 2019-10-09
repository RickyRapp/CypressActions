import _ from 'lodash';

class ModuleProvider {
	name = null;
	configurations = [];

	constructor(name) {
		this.name = name;
	}

	register(config) {
		this.configurations.push(config);
	}

	getRoutes() {
		const items = [];
		_.each(this.configurations, (config) => {
			if (config.routes) {
				const routes = _.isFunction(config.routes) 
                    ? (ctx) => config.routes(ctx) 
                    : config.routes;
				items.push(...routes);
			}
		});
		return items;
	}

	getMenus() {
		const items = [];
		_.each(this.configurations, (config) => {
			if (config.menu) {
				items.push(
                    _.isFunction(config.menu) 
                        ? (ctx) => config.menu(ctx) 
                        : config.menu
                );
			}
		});
		return items;
	}

	getStores() {
		const items = [];
		_.each(this.configurations, (config) => {
			if (config.moduleStore) {
				items.push(
                    _.isFunction(config.moduleStore) 
                        ? (ctx) => config.moduleStore(ctx) 
                        : config.moduleStore
                );
			}
		});
		return items;
	}
}

export default ModuleProvider;