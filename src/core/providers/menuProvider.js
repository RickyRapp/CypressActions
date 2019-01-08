import { 
	isSome, 
	buildAuthorizedMenu 
} from 'core/utils';

class MenuProvider {
	menus = [];

	buildMenus(menus, context) {
		this.menus = menus;
		this.context = context;

		const rootStore = this.context.rootStore;
		const {
			routerStore: { routerStore: { routes } },
			authStore: { hasPermission }
		} = rootStore;

		if (menus.length > 0 && !isSome(routes)) {
			throw new Error('Menu provider requires that root store routes are initialized - initialize RouteProvider');
		}

		return buildAuthorizedMenu(menus, routes, hasPermission);
	}

	refresh() {
		return this.initialize(this.menus, this.context);
	}
}

export default new MenuProvider();
