import { moduleProviderFactory, moduleBuilder } from 'core/providers';

class BaasicBootstrap {
	run(context) {
		moduleBuilder.setGlobalContext(context);

		const { rootStore } = context;
		let modules = ['common', 'application'];
		if (rootStore.isMultiTenancy)
			modules.push('platform');		

		const routes = moduleBuilder.buildRoutes(modules);
		const stores = moduleBuilder.buildStores(['common']);

		
		rootStore.initializeRoutes(routes);
		rootStore.initializeStores(stores);
	}
}

export default new BaasicBootstrap();