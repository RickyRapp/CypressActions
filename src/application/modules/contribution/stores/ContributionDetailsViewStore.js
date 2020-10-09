import { action, observable } from 'mobx';
import { TableViewStore, BasePreviewViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { ContributionService } from 'application/contribution/services';
import { DonorService } from 'application/donor/services';
import { applicationContext, donorFormatter, isSome } from 'core/utils';
import { ModalParams } from 'core/models';
import { LookupService } from 'common/services';
import { ContributionListFilter } from 'application/contribution/models';
import _ from 'lodash';
import moment from 'moment';

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
