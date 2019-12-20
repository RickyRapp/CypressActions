import { action } from 'mobx';
import { applicationContext } from 'core/utils';
import { GrantEditForm } from 'application/grant/forms';
import { GrantService } from 'application/grant/services';
import GrantBaseViewStore from './GrantBaseViewStore'

@applicationContext
class GrantEditViewStore extends GrantBaseViewStore {
    constructor(rootStore) {

        super(rootStore, {
            name: 'grant-edit',
            id: rootStore.routerStore.routerState.params.editId,
            autoInit: false,
            actions: () => {
                const service = new GrantService(rootStore.application.baasic.apiClient);
                return {
                    update: async (resource) => {
                        return await service.update({ id: this.id, ...resource });
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'donation',
                                'donation.charity',
                                'grantPurposeType',
                                'grantAcknowledgmentType'
                            ],
                            fields: [
                                'id',
                                'amount',
                                'grantPurposeTypeId',
                                'grantPurposeType',
                                'grantAcknowledgmentTypeId',
                                'grantAcknowledgmentType',
                                'additionalInformation',
                                'purposeMemberName',
                                'charityEventAttending',
                                'donation',
                                'donation.charity'
                            ]
                        }
                        let response = await service.get(id, params);
                        response.data.charity = response.data.donation.charity;
                        return response.data;
                    }
                }
            },
            FormClass: GrantEditForm,
        });

        this.donorAccountId = rootStore.routerStore.routerState.params.id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchApplicationDefaultSetting(),
                this.fetchFeeTypes(),
                this.getResource(this.id)
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues(),
            ]);

            this.form.validate();
            this.onChangeAmount();
            this.grantAcknowledgmentTypeDropdownStore.setValue(this.item.grantAcknowledgmentType);
            this.grantPurposeTypeDropdownStore.setValue(this.item.grantPurposeType);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.donorName = this.donorAccount.donorName;
    }
}

export default GrantEditViewStore;
