import {  BaseListViewStore, BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class CharityVerificationDocumentListViewStore extends BasePreviewViewStore {
    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity-verification-document',
            id: props.charityId,
            autoInit: false,
            actions: () => {
                return {
                    get: async (id) => {
                        return await this.rootStore.application.administration.charityStore.getCharityVerificationDocuments(id);
                    }
                }
            }
        });

        const baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;
        this.url = baseUrl + "charity-file-streams/";
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.id)
            ]);
        }
    }

}

export default CharityVerificationDocumentListViewStore;
