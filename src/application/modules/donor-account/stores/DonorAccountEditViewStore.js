import { applicationContext } from 'core/utils';
import { action, runInAction } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorAccountEditForm } from 'application/donor-account/forms';
import { LookupService } from 'common/services';
import { DonorAccountService } from 'application/donor-account/services';

@applicationContext
class DonorAccountEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const service = new DonorAccountService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'donor-account',
            autoInit: false,
            id: id,
            actions: {
                get: async (id) => {
                    const response = await service.get(id, {
                        embed: [
                            'coreUser',
                            'companyProfile',
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

        this.prefixTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: (prefixTypeId) => {
                    this.item.prefixTypeId = prefixTypeId;
                }
            });
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: (deliveryMethodTypeId) => {
                    this.item.deliveryMethodTypeId = deliveryMethodTypeId;
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.donor-account.list'
            )
        }
        else {
            this.form.clear();
            await this.fetch([
                this.fetchPrefixTypes(),
                this.fetchDeliveryMethodTypes()
            ]);
            await this.fetch([
                this.getResource(this.id)
            ]);
        }
    }

    @action.bound
    async getResource(id) {
        await super.getResource(id);

        runInAction(() => {
            this.form.$('prefixTypeId').set(this.item.prefixTypeId);
            this.form.$('deliveryMethodTypeId').set(this.item.deliveryMethodTypeId);
            this.form.validate();
        });
    }

    @action.bound
    async updateResource(resource) {
        const { prefixTypeId, firstName, lastName, middleName, fundName, blankBookletMax, deliveryMethodTypeId, notificationLimitRemainderAmount,
            lineOfCredit, certificateDeduction, certificateFee, contributionMinimumAdditional, contributionMinimumInitial, extraBookletPercentage,
            grantFee, grantMinimumAmount, initialContribution, securityPin } = resource;
        const generalData = {
            prefixTypeId,
            firstName,
            lastName,
            middleName,
            fundName,
            blankBookletMax,
            deliveryMethodTypeId,
            notificationLimitRemainderAmount
        };

        const accountSettingsData = {
            lineOfCredit,
            certificateDeduction,
            certificateFee,
            contributionMinimumAdditional,
            contributionMinimumInitial,
            extraBookletPercentage,
            grantFee,
            grantMinimumAmount,
            initialContribution,
            securityPin
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
    async fetchPrefixTypes() {
        this.prefixTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'prefix-type');
        const response = await service.getAll();
        runInAction(() => {
            this.prefixTypeDropdownStore.setItems(response.data);
            this.prefixTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchDeliveryMethodTypes() {
        this.deliveryMethodTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        runInAction(() => {
            this.deliveryMethodTypeDropdownStore.setItems(response.data);
            this.deliveryMethodTypeDropdownStore.setLoading(false);
        });
    }
}

export default DonorAccountEditViewStore;
