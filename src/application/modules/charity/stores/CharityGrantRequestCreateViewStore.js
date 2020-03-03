import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { GrantRequestService } from 'application/grant/services';
import { CharityService } from 'application/charity/services';
import { CharityGrantRequestCreateForm } from 'application/charity/forms';
import { ModalParams } from 'core/models';

class CharityGrantRequestCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterAction }) {
        const service = new GrantRequestService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity-grant-request-create',
            id: undefined,
            autoInit: true,
            actions: () => {
                return {
                    create: async (resource) => {
                        await this.fetch([
                            this.phoneNumberExist(resource.phoneNumber),
                        ])
                        if (!this.form.isValid) {
                            return;
                        }
                        await service.create({
                            charityId: id,
                            ...resource
                        });
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: CharityGrantRequestCreateForm,
        });

        this.charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.createModal = new ModalParams({});
    }

    @action.bound
    async phoneNumberExist(value) {
        value = value.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
        if (this.form.$('phoneNumber').isValid) {
            try {
                const response = await this.charityService.phoneNumberExists(value);
                if (response.statusCode === 204) {
                    this.form.$('phoneNumber').resetValidation();
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('phoneNumber').invalidate('Donor with entered phone number not found.')
                    return;
                }
            }
        }
    }
}

export default CharityGrantRequestCreateViewStore;
