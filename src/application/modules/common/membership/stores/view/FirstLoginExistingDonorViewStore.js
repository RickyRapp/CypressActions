import { action } from 'mobx';
import { FirstLoginExistingDonorForm } from 'application/common/membership/forms';
import { BaasicDropdownStore, BaseViewStore } from 'core/stores';

class FirstLoginExistingDonorViewStore extends BaseViewStore {
	loaderStore = this.createLoaderStore();
	form = new FirstLoginExistingDonorForm({
		onSuccess: async form => {
			const model = form.values();
			this.createFirstLogin(model);
		},
	});

	constructor(rootStore) {
		super();
		this.rootStore = rootStore;
		this.passwordRecoveryToken = rootStore.routerStore.routerState.queryParams.passwordRecoveryToken;
		// if (!this.passwordRecoveryToken) {
		// 	this.goToLogin().then(() =>
		// 		this.rootStore.notificationStore.warning('PASSWORD_CHANGE.ERROR_MESSAGE.URL_NOT_VALID')
		// 	);
		// }
		this.createMonthDropdownStore();
	}

	async createFirstLogin(model) {
		this.loaderStore.suspend();
		try {
			const response = await this.rootStore.application.baasic.apiClient.put('donor/first-login/', model);
			console.log(response);
			debugger;
			// await this.rootStore.application.baasic.membershipModule.passwordRecovery.reset({
			// 	newPassword: model.password,
			// 	passwordRecoveryToken,
			// });

			this.loaderStore.resume();

			this.goToLogin().then(() =>
				this.rootStore.notificationStore.success('FIRST_LOGIN_EXISTING_DONOR.SUCCESS_MESSAGE')
			);
		} catch ({ statusCode, data }) {
			this.loaderStore.resume();

			switch (statusCode) {
				default:
					this.rootStore.notificationStore.error('FIRST_LOGIN_EXISTING_DONOR.ERROR_MESSAGE', data);
					break;
			}
		}
	}

	createMonthDropdownStore() {
		this.monthDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'January' },
					{ id: '2', name: 'February' },
					{ id: '3', name: 'March' },
					{ id: '4', name: 'April' },
					{ id: '5', name: 'May' },
					{ id: '6', name: 'June' },
					{ id: '7', name: 'July' },
					{ id: '8', name: 'August' },
					{ id: '9', name: 'September' },
					{ id: '10', name: 'October' },
					{ id: '11', name: 'November' },
					{ id: '12', name: 'December' },
				];
			},
		});
	}

	@action.bound goToLogin() {
		return this.rootStore.routerStore.goTo('master.public.membership.login');
	}
}

export default FirstLoginExistingDonorViewStore;
