import { BaseEditViewStore } from "core/stores";
import { DepositInfoEditForm } from "application/administration/depositinfo/forms";
import { DepositInfoService } from "application/administration/depositinfo/services";

class DepositInfoEditViewStore extends BaseEditViewStore {
	params = {
		id: this.rootStore.routerStore.routerState.params.id,
	};

	constructor(rootStore) {
		const service = new DepositInfoService(rootStore.application.baasic.apiClient);
		const id = rootStore.routerStore.routerState.params.id;
		super(rootStore, {
			name: "${componentName}",
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
					rootStore.notificationStore.error('DEPOSITINFO.CREATE.ERROR', error);
				},
				onUpdateError: ({ error }) => {
					rootStore.notificationStore.error('DEPOSITINFO.EDIT.ERROR', error);
				},
			},
			FormClass: DepositInfoEditForm,
		});

		this.service = new DepositInfoService(rootStore.application.baasic.apiClient);
	}
}

export default DepositInfoEditViewStore;
