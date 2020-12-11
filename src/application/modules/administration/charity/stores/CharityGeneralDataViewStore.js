import { CharityEditForm } from 'application/administration/charity/forms';
import { ModalParams } from 'core/models';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class CharityGeneralDataViewStore extends BaseEditViewStore {
    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity',
            id: props.charityId,
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: ['contactInformation']
                        }
                        const data = await rootStore.application.administration.charityStore.getCharity(id, params);
                        return {
                            name: data.name,
                            taxId: data.taxId,
                            charityStatusId: data.charityStatusId,
                            charityTypeId: data.charityTypeId,
                            contactInformationName: data.contactInformation.name,
                            contactInformationEmail: data.contactInformation.email,
                            contactInformationNumber: data.contactInformation.number,
                            availableBalance: data.availableBalance
                        }
                    },
                    update: async (resource) => {
                        await this.rootStore.application.administration.charityStore.updateCharity(resource);
                    }
                }
            },
            FormClass: CharityEditForm,
            onAfterAction: () => { this.getResource(this.id); }
        });

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
}

export default CharityGeneralDataViewStore;
