import { RouterState } from 'mobx-state-router';
import { moduleProviderFactory } from "core/providers";
import { MembershipModuleStore } from "platform/modules/membership/stores";
import { PublicLayout, MainLayout } from 'core/layouts';
import { 
	Login, 
	Register, 
	PasswordChange, 
	PasswordRecovery,
	UserPreferences
} from 'platform/modules/membership/pages';
import { getDefaultStoreKey } from 'core/utils';

(function () {
	moduleProviderFactory.platform.register({
		name: "Baasic.Platform.Membership",
		routes: [
			{
				name: "master.platform.membership",
				pattern: "",
				component: [PublicLayout],
				children: [
					{
						name: "master.platform.membership.login",
						pattern: "/login",
						component: Login,
						beforeEnter: function (fromState, toState, routerStore) {
							if (routerStore.rootStore.authStore.isAuthenticated) {
								if (fromState.routeName === "__initial__") {
									return Promise.reject(routerStore.rootStore.initialState);
								} else {
									return Promise.reject(fromState);
								}								
							}

							return Promise.resolve();
						}
					},
					{
						name: "master.platform.membership.register",
						pattern: "/register",
						component: Register
					},
					{
						name: "master.platform.membership.password-recovery",
						pattern: "/password-recovery",
						component: PasswordRecovery
					},
					{
						name: "master.platform.membership.password-change",
						pattern: "/password-change",
						component: PasswordChange
					}					
				]
			},
			{
				name: "master.platform.main.user-preferences",
				pattern: "/user-preferences",
				component: [MainLayout, UserPreferences],
				isPrivate: true
			}
		],		
		storeFactory: function (context) {
			const key = getDefaultStoreKey(context.appKey, "membership");
			return { 
				"platform.membership": new MembershipModuleStore(context.rootStore),
			}
		}
	});
})();