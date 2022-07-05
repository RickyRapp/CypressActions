import { BasePreviewViewStore } from 'core/stores';
import { action, observable } from 'mobx';

class ContributionDetailsViewStore extends BasePreviewViewStore {
    @observable statusList = null;
    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution',
            authorization: 'theDonorsFundContributionSection',
            id: rootStore.routerStore.routerState.params.id,
            routes: {},
            actions: () => {
                return {
                    get: async (id) => {
                        let params = {
                            embed: [
                                'donor',
                                'payerInformation',
                                'bankAccount',
                                'paymentType',
                                'contributionStatus',
                            ]
                        }

                        return rootStore.application.administration.contributionStore.getDetails(id, params);
                    }
                }
            }
        });
        this.getStatuses();
    }

    async getStatuses(){
        var contributionEntity = 'ContributionEntity'
        var response = await this.rootStore.application.administration.entityStatusLogStore.findStatus(this.rootStore.routerStore.routerState.params.id,contributionEntity);
        this.statusList = response;
    }
}

export default ContributionDetailsViewStore;
