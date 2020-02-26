import { BaseEditViewStore } from 'core/stores';
import { BankCreateForm } from 'application/administration/bank/forms';
import { BankService } from 'application/administration/bank/services';
import _ from 'lodash';

class BankCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        const service = new BankService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'bank-edit',
            id: id,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.update({ id: id, ...resource });
                    },
                    create: async (resource) => {
                        await service.create(resource);
                    },
                    get: async (id) => {
                        let response = await service.get(id);
                        return response.data;
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: BankCreateForm,
        });
    }
}

export default BankCreateViewStore;
