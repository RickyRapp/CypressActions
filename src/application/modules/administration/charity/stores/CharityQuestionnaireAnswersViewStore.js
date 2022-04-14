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
    }

}

export default CharityQuestionnaireAnswersViewStore;