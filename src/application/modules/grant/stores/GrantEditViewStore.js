import { action } from 'mobx';
import { applicationContext } from 'core/utils';
import { GrantEditForm } from 'application/grant/forms';
import { GrantService } from 'application/grant/services';
import GrantBaseViewStore from './GrantBaseViewStore'
import _ from 'lodash';

@applicationContext
class GranteEditViewStore extends GrantBaseViewStore {
    constructor(rootStore) {
        const service = new GrantService(rootStore.application.baasic.apiClient);
        const editId = rootStore.routerStore.routerState.params.editId;
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'grant-edit',
            id: editId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        return await service.update({ id: this.editId, ...resource });
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

        this.editId = editId;
        this.id = id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchGrantPurposeTypes(),
                this.fetchGrantAcknowledgmentTypes(),
                this.fetchApplicationDefaultSetting(),
                this.fetchFeeTypes()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);

            await this.getResource(this.editId);
            this.form.validate();
            this.onChangeAmount();
            this.grantAcknowledgmentTypeDropdownStore.onChange(this.item.grantAcknowledgmentType);
            this.grantPurposeTypeDropdownStore.onChange(this.item.grantPurposeType);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorAccountId').set(this.id);
        this.donorName = this.donorAccount.donorName;
    }
}

export default GranteEditViewStore;
