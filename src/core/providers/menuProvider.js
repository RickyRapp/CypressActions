import _ from 'lodash';
import {
	isSome,
	buildAuthorizedMenu
} from 'core/utils';

class MenuProvider {
	menus = [];

	initialize(menus, context) {
		this.menus = [...menus];
		this.context = context;

		const rootStore = this.context.rootStore;

		if (menus.length > 0 && !isSome(rootStore.routerStore.routes)) {
			throw new Error('Menu provider requires that root store routes are initialized - initialize RouteProvider');
		}

		return this.buildMenu(rootStore, _.cloneDeep(menus), rootStore.routerStore.routes);
	}

	buildMenu(rootStore, menu, routes) {
		return buildAuthorizedMenu(menu, routes, rootStore);
	}
}

export default new MenuProvider();
