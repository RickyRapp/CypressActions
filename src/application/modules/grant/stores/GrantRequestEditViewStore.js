import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { GrantRequestCreateForm } from 'application/grant/forms';
import { localizationService, validatorService } from 'core/services';

@applicationContext
class GrantRequestEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-request-edit',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await this.rootStore.application.grant.grantStore.createRequest({ charityId: this.charityId, ...resource });
                    }
                }
            },
            FormClass: GrantRequestCreateForm,
        });

        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.charityId = rootStore.routerStore.routerState.params.id;
        }
        else {
            this.charityId = rootStore.userStore.user.charityId;
        }

        this.createUniqueConstraintValidator();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
        }
    }

    createUniqueConstraintValidator() {
        validatorService.registerAsyncValidator('phoneNumberExist', async (value, attribute, req, passes) => {
            try {
                const { statusCode } = await this.rootStore.application.donor.donorStore.phoneNumberExists(value);
                if (statusCode === 204) {
                    return passes();
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    return passes(false, localizationService.t('GRANT_REQUEST.CREATE.ERROR_MESSAGES.PHONE_NUMBER_NOT_EXIST'))
                }
                return passes(false, localizationService.t('DONOR.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });
    }
}

export default GrantRequestEditViewStore;
