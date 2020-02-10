import { action } from 'mobx';
import { applicationContext, charityFormatter } from 'core/utils';
import { GrantEditForm } from 'application/grant/forms';
import { GrantService } from 'application/grant/services';
import GrantBaseViewStore from './GrantBaseViewStore'
import moment from 'moment';

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
                        this.onBlurAmount();
                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        return await service.update({ id: this.id, ...resource });
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'charity',
                                'charity.charityAccountType',
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
                                'charityId',
                                'charity'
                            ]
                        }
                        let response = await service.get(id, params);
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

            if (this.item && this.item.charity) {
                this.charityDropdownStore.setValue({ id: this.item.charity.id, name: charityFormatter.format(this.item.charity, { value: 'charity-name-display' }), item: this.item.charity })
            }

            this.form.validate();
            this.onBlurAmount();
            this.grantAcknowledgmentTypeDropdownStore.setValue(this.item.grantAcknowledgmentType);
            this.grantPurposeTypeDropdownStore.setValue(this.item.grantPurposeType);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.donorName = this.donorAccount.donorName;

        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
            const dateToEdit = moment(this.item.dateCreated).add('minutes', 15);
            if (!moment().isBetween(this.item.dateCreated, dateToEdit)) {
                this.rootStore.notificationStore.warning('Time expired for editing.');
                this.rootStore.routerStore.goTo('master.app.main.grant.preview', { editId: this.id });
            }
        }
    }
}

export default GrantEditViewStore;
