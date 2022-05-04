import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityQuestionnaireAnswersViewStore extends BasePreviewViewStore {
    
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-questionnaire-answers',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: true,
            actions: () => {
                return {
                    get: async (id) => {
                        return await rootStore.application.administration.charityStore.getCharityQuestionnaireAnswers(id, null);
                    }
                }
            }
        });

        const baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" ;
        this.url = baseUrl + "charity-file-streams/";
    }

}

export default CharityQuestionnaireAnswersViewStore;