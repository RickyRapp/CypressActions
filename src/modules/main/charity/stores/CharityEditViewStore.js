import { observable } from 'mobx';
import { CharityUpdateForm } from 'modules/main/charity/forms';
import { CharityService, FileStreamRouteService } from "common/data";
import { BaseCharityEditViewStore } from 'modules/common/charity/stores';
import _ from 'lodash';

class CharityEditViewStore extends BaseCharityEditViewStore {
    @observable charity = null;
    @observable imgPreview = null;

    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);
        const fileStreamRouteService = new FileStreamRouteService(rootStore.app.baasic.apiClient);
        const userId = rootStore.authStore.user.id;

        const editViewStore = {
            name: 'charity',
            id: userId,
            actions: {
                update: async item => {
                    if (!(item.contactInformation && item.contactInformation.firstName && item.contactInformation.lastName)) {
                        item.contactInformation = null;
                    }
                    if (!(item.emailAddress && item.emailAddress.email)) {
                        item.emailAddress = null;
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