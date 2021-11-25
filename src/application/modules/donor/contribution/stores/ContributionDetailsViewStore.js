import { BasePreviewViewStore } from 'core/stores';

class ContributionDetailsViewStore extends BasePreviewViewStore {
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
                                'contributionStatus'
                            ]
                        }

                        params.donorId = rootStore.userStore.applicationUser.id;
                        return rootStore.application.donor.contributionStore.getDetails(id, params);
                    }
                }
            }
        });
    }
}

export default ContributionDetailsViewStore;
