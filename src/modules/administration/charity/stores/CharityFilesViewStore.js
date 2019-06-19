import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { charityPath, documentPath, formatCharityTaxId } from 'core/utils';
import { CharityDocumentService, CharityService } from 'common/data';
import _ from 'lodash'

class CharityFilesViewStore extends BaseViewStore {
    @observable refresh = new Date();
    @observable path = null;

    constructor(rootStore) {
        super(rootStore);
        this.rootStore = rootStore;
        this.userId = rootStore.routerStore.routerState.params.userId;
        this.onAfterFileUpload = this.updateCharityDocuments;
        this.charityDocumentService = new CharityDocumentService(rootStore.app.baasic.apiClient)
        this.charityService = new CharityService(rootStore.app.baasic.apiClient)

        this.load()
    }

    @action.bound async load() {
        const charity = await this.charityService.get(this.userId, { fields: 'taxId' });
        this.path = charityPath + formatCharityTaxId(charity.taxId) + '/' + documentPath;
    }

    @action.bound async updateCharityDocuments(fileEntries) {
        let charityDocuments = [];
        const userId = this.userId;
        _.forEach(fileEntries, function (file) {
            charityDocuments.push({
                charityId: userId,
                coreMediaVaultEntryId: file.id
            });
        });
        try {
            return await this.charityDocumentService.createBatch(charityDocuments);
        } catch (errorResponse) {
            return errorResponse;
        }
    }

    @action.bound onRefresh() {
        this.refresh = new Date();
    }
}

export default CharityFilesViewStore;
