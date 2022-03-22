import { CharityEditForm } from 'application/charity/charity/forms';
import { ModalParams } from 'core/models';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class CharityGeneralDataViewStore extends BaseEditViewStore {
    @observable isEditEnabled = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'charity',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: ['contactInformation', 'charityApiKey', 'charityAccountNumber']
                        }
                        const data = await rootStore.application.charity.charityStore.getCharity(id, params);
                        const charityApiKey = data.charityApiKey ? data.charityApiKey.apiKey : '';
                        const charityAccNumber = data.charityAccountNumber ? data.charityAccountNumber.accountNumber : '';
                        this.apiKey = charityApiKey;
                        return {
                            name: data.name,
                            taxId: data.taxId,
                            charityAccountNumber : charityAccNumber,
                            charityStatusId: data.charityStatusId,
                            charityTypeId: data.charityTypeId,
                            contactInformationName: data.contactInformation.name,
                            contactInformationEmail: data.contactInformation.email,
                            contactInformationNumber: data.contactInformation.number,
                            presentBalance: data.presentBalance,
                            apiKey: charityApiKey,
                            dba: data.dba,
                            description : data.description
                        }
                    },
                    update: async (resource) => {
                        const data = await rootStore.application.charity.charityStore.getCharity(rootStore.userStore.applicationUser.id);
                        resource.name = data.name;
                        resource.keepFundsUntilManuallyDistributedIsEnabled = data.keepFundsUntilManuallyDistributedIsEnabled;
                        resource.keepFundsUntilAccumulatedAmountIsEnabled = data.keepFundsUntilAccumulatedAmountIsEnabled;
                        resource.accumulatedAmountExceeding = data.accumulatedAmountExceeding;

                        await this.rootStore.application.charity.charityStore.updateCharity({ contactInformation: { name: resource.contactInformationName, email: resource.contactInformationEmail, number: resource.contactInformationNumber }, ...resource });
                        rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
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

    @action.bound
    onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
    }

    @action.bound
    downloadQrCode(){
        const canvas = document.getElementById("charity-qr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `qr-code.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    @action.bound
    async copyToClipboard(){
        await navigator.clipboard.writeText(this.apiKey);
        this.rootStore.notificationStore.success('API key copied to clipboard');
        this.getResource(this.id);
    }

}

export default CharityGeneralDataViewStore;
