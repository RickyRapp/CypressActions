import { observable } from 'mobx';
import { CharityUpdateForm } from 'modules/administration/charity/forms';
import { CharityService, FileStreamService, FileStreamRouteService } from "common/data";
import { BaseCharityEditViewStore } from 'modules/common/charity/stores';
import { bankAccountPath, charityPath, formatCharityTaxId, isErrorCode } from 'core/utils';
import _ from 'lodash';

class CharityEditViewStore extends BaseCharityEditViewStore {
    @observable charity = null;
    @observable imgPreview = null;

    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);
        const fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);
        const fileStreamRouteService = new FileStreamRouteService();
        const userId = rootStore.routerStore.routerState.params.userId;

        const editViewStore = {
            name: 'charity',
            id: userId,
            actions: {
                update: async item => {
                    if (!(item.contactInformation && item.contactInformation.firstName && item.contactInformation.lastName)) {
                        item.contactInformation = null;
                    }

                    try {
                        if (this.form.$('bankAccount.image').files) {
                            const fileResponse = await fileStreamService.create(
                                this.form.$('bankAccount.image').files[0],
                                charityPath + formatCharityTaxId(item.taxId) + '/' + bankAccountPath + this.form.$('bankAccount.image').files[0].name
                            );
                            item.bankAccount.coreMediaVaultEntryId = fileResponse.data.id;
                        }
                    } catch (errorResponse) {
                        this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
                        return;
                    }
                    return await charityService.update({ id: this.id, ...item });
                },
                get: async id => {
                    let params = {};
                    params.embed = ['charityAddresses,address,coreUser,coreMembership,contactInformation,address,emailAddress,phoneNumber,bankAccount'];
                    const response = await charityService.get(id, params);

                    this.charity = response;
                    if (this.charity && this.charity.bankAccount) {
                        if (this.charity.bankAccount.coreMediaVaultEntryId) {
                            this.imgPreview = await fileStreamRouteService.getPreview(this.charity.bankAccount.coreMediaVaultEntryId)
                        }
                    }

                    return this.charity;
                }
            },
            FormClass: CharityUpdateForm,
            goBack: false,
            setValues: true,
            loader: true
        }

        const config = {};
        config.editViewStore = editViewStore;
        config.userId = userId;

        super(rootStore, config);

        this.load();
    }
}

export default CharityEditViewStore;