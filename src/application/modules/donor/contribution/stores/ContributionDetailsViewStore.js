import { BasePreviewViewStore } from 'core/stores';
import { ContributionService } from 'application/donor/contribution/services';

class ContributionDetailsViewStore extends BasePreviewViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution',
            authorization: 'theDonorsFundContributionSection',
            id: rootStore.routerStore.routerState.params.id,
            routes: {},
            actions: () => {
                const service = new ContributionService(rootStore.application.baasic.apiClient);
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

                        if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                            params.donorId = rootStore.routerStore.routerState.queryParams.donorId;
                        }
                        else {
                            params.donorId = rootStore.userStore.user.id
                        }

                        let response = await service.getDetails(id, params);
                        return response.data;
                    }
                }
            }
        });
    }
}

export default ContributionDetailsViewStore;
