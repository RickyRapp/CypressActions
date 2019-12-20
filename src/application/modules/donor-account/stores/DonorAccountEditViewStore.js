import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorAccountEditForm } from 'application/donor-account/forms';
import { LookupService } from 'common/services';
import { DonorAccountService } from 'application/donor-account/services';

class DonorAccountEditViewStore extends BaseEditViewStore {
    @observable accountSettingsShow = false;
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const service = new DonorAccountService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'donor-account',
            id: id,
            actions: {
                get: async (id) => {
                    const response = await service.get(id, {
                        embed: [
                            'accountType'
                        ]
                    });
                    if (response) {
                        response.data.firstName = response.data.coreUser.firstName;
                        response.data.lastName = response.data.coreUser.lastName;
                        if (response.data && response.data.coreUser && response.data.coreUser.json) {
                            const coreUserJson = JSON.parse(response.data.coreUser.json);
                            response.data.middleName = coreUserJson.middleName;
                            response.data.prefixTypeId = coreUserJson.prefixTypeId;
                        }
                    }
                    return response.data;
                }
            },
            FormClass: DonorAccountEditForm,
        });

        this.rootStore = rootStore;

        this.prefixTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'prefix-type');
                const response = await service.getAll();
                return response.data;
            }
        });
    }

    @action.bound
    async updateResource(resource) {
        const { prefixTypeId, firstName, lastName, middleName, fundName, blankBookletMaxAmount, notificationLimitRemainderAmount,
            lineOfCredit, certificateDeductionPercentage, certificateFeePercentage, contributionMinimumAdditionalAmount, contributionMinimumInitialAmount, extraBookletPercentage,
            grantFeePercentage, grantMinimumAmount, isInitialContributionDone, securityPin } = resource;
        const generalData = {
            prefixTypeId,
            firstName,
            lastName,
            middleName,
            fundName,
            blankBookletMaxAmount,
            notificationLimitRemainderAmount,
            securityPin
        };

        const accountSettingsData = {
            lineOfCredit,
            certificateDeductionPercentage,
            certificateFeePercentage,
            contributionMinimumAdditionalAmount,
            contributionMinimumInitialAmount,
            extraBookletPercentage,
            grantFeePercentage,
            grantMinimumAmount,
            isInitialContributionDone
        };

        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        try {
            await service.updateGeneralData({
                id: this.id,
                ...generalData
            });
            if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
                await service.updateAccountSettingsData({
                    id: this.id,
                    ...accountSettingsData
                });
            }
            this.rootStore.notificationStore.success('DONOR_ACCOUNT.EDIT.SUCCESS');
            await this.rootStore.routerStore.goBack();
        }
        catch (err) {
            this.rootStore.notificationStore.error('DONOR_ACCOUNT.EDIT.ERROR', err);
        }
    }

    @action.bound
    onChangeAccountSettingsShow(visiblity) {
        this.accountSettingsShow = visiblity;
    }
}

export default DonorAccountEditViewStore;
