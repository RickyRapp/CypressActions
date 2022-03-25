import { CharityEditForm } from 'application/administration/charity/forms';
import { ModalParams } from 'core/models';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class CharityGeneralDataViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity',
            id: rootStore.routerStore.routerState.params.id,
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: ['contactInformation', 'charityApiKey', 'charityAccountNumber']
                        }
                        const data = await rootStore.application.administration.charityStore.getCharity(id, params);
                        const charityApiKey = data.charityApiKey ? data.charityApiKey.apiKey : '';
                        const charityAccNumber = data.charityAccountNumber ? data.charityAccountNumber.accountNumber : '';
                        this.apiKey = charityApiKey;
                        return {
                            name: data.name,
                            taxId: data.taxId,
                            charityAccountNumber : charityAccNumber,
                            charityStatusId: data.charityStatusId,
                            charityTypeId: data.charityTypeId,
                            contactInformationName: data.contactInformation && data.contactInformation.name,
                            contactInformationEmail: data.contactInformation && data.contactInformation.email,
                            contactInformationNumber: data.contactInformation && data.contactInformation.number,
                            url: data.url,
                            dba: data.dba,
                            contactInformation: {
                                name: data.contactInformation && data.contactInformation.name,
                                email: data.contactInformation && data.contactInformation.email,
                                number: data.contactInformation && data.contactInformation.number
                            },
                            presentBalance: data.presentBalance,
                            apiKey: charityApiKey
                        }
                    },
                    update: async (resource) => {
                        resource.contactInformation = {
                            name: resource.contactInformationName,
                            email: resource.contactInformationEmail,
                            number: resource.contactInformationNumber
                        };
                        try {
                            await this.rootStore.application.administration.charityStore.updateCharity(resource);
                        } catch (e) {
                            this.rootStore.notificationStore.error('The resource was not updated');
                        } finally {
                            this.rootStore.notificationStore.success('Successfully updated Charity general data');
                        }
                    }
                }
            },
            FormClass: CharityEditForm,
            onAfterAction: () => { this.getResource(this.id); }
        });

        this.apiKey;
        this.createCharityTypeDropdownStore();
        this.createCharityStatusDropdownStore();
        this.createWithdrawFundModalParams();
    }

    @action.bound
    async openWithdrawFundModalClick() {
        this.withdrawFundModalParams.open({
            charityId: this.id,
            charity: this.item,
            onAfterAction: () => {
                this.getResource(this.id);
                this.createModal.close();
            }
        });
    }

    @action.bound
    async regenerateApiKey(){
        try {
            await this.rootStore.application.administration.charityStore.regenerateCharityApiKey({id: this.id});
            this.getResource(this.id);
            this.rootStore.notificationStore.success('Successfully regenerated API key');
        } catch (e) {
            this.rootStore.notificationStore.error('API key was not regenerated');
        }
    }

    createCharityStatusDropdownStore() {
        this.charityStatusDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.charityStatusStore.find();
                }
            });
    }

    createCharityTypeDropdownStore() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.charityTypeStore.find();
                }
            });
    }

    createWithdrawFundModalParams() {
        this.withdrawFundModalParams = new ModalParams({});
    }

    @action.bound
    async copyToClipboard(){
        await navigator.clipboard.writeText(this.apiKey);
        this.rootStore.notificationStore.success('API key copied to clipboard');
        this.getResource(this.id);
    }
}

export default CharityGeneralDataViewStore;
