import { BaseEditViewStore } from "core/stores";
import { remoteDepositEditForm } from "application/charity/remote-deposit/forms";
import { remoteDepositService } from "application/charity/remote-deposit/services";

class remoteDepositEditViewStore extends BaseEditViewStore {
	params = {
		id: this.rootStore.routerStore.routerState.params.id,
	};

	constructor(rootStore) {
		const service = new remoteDepositService(rootStore.application.baasic.apiClient);
		const id = rootStore.routerStore.routerState.params.id;
		super(rootStore, {
			name: "remote-deposit",
			id: id,
			actions: {
				get: async id => {
					const response = await service.getWithProductCount(id);
					this.form.update(response.data);
					return response.data;
				},
				update: async resource => {
					const response = await service.update(resource);
					return response.data;
				},
				create: async resource => {
					const response = await service.create(resource);
					return response.data;
				},
			},
			errorActions: {
				onCreateError: ({ error }) => {
					rootStore.notificationStore.error('REMOTEDEPOSIT.CREATE.ERROR', error);
				},
				onUpdateError: ({ error }) => {
					rootStore.notificationStore.error('REMOTEDEPOSIT.EDIT.ERROR', error);
				},
			},
			FormClass: remoteDepositEditForm,
		});

		this.service = new remoteDepositService(rootStore.application.baasic.apiClient);
	}
}

export default remoteDepositEditViewStore;
