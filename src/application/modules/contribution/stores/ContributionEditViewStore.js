import { action, runInAction } from 'mobx';
import { ContributionCreateForm } from 'application/contribution/forms';
import { applicationContext } from 'core/utils';
import { ContributionService } from 'application/contribution/services';
import _ from 'lodash';
import ContributionBaseViewStore from './ContributionBaseViewStore';

@applicationContext
class ContributionEditViewStore extends ContributionBaseViewStore {
    constructor(rootStore) {
        const service = new ContributionService(rootStore.application.baasic.apiClient);
        const editId = rootStore.routerStore.routerState.params.editId

        super(rootStore, {
            name: 'contribution-edit',
            id: editId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        return await service.update({ id: editId, ...resource });
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'payerInformation',
                                'payerInformation.address',
                                'payerInformation.emailAddress',
                                'payerInformation.phoneNumber',
                            ]
                        }
                        let response = await service.get(id, params);
                        if (response.data.json && JSON.parse(response.data.json).paymentTypeInformations) {
                            _.forOwn(JSON.parse(response.data.json).paymentTypeInformations, function (value, key) {
                                response.data[key] = value;
                            });
                        }

                        return response.data;
                    }
                }
            },
            FormClass: ContributionCreateForm,
        });

        this.editId = editId;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchPaymentTypes(),
                this.fetchBankAccounts()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);

            await this.getResource(this.editId);
        }
    }

    @action.bound
    async getResource(id) {
        await super.getResource(id);

        runInAction(() => {
            this.onPaymentTypeChange();
            this.onBankAccountChange();
            this.form.validate();
        });
    }
}

export default ContributionEditViewStore;
