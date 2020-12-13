import { BaseEditViewStore } from 'core/stores';
import { BankCreateForm } from 'application/administration/bank/forms';

class BankCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        super(rootStore, {
            name: 'bank-edit',
            id: id,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.bankStore.updateBank(resource);
                    },
                    create: async (resource) => {
                        await rootStore.application.administration.bankStore.createBank(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.administration.bankStore.getBank(id);
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: BankCreateForm,
        });
    }
}

export default BankCreateViewStore;
