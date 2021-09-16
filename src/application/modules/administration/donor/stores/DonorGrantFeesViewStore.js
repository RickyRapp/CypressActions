import { BaseEditViewStore } from 'core/stores';
import { DonorGrantFeesForm } from 'application/administration/donor/forms';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorGrantFeesViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-grant-fees',
            id: rootStore.routerStore.routerState.params.id,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.donorStore.updateGrantFees(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.administration.donorStore.getDonor(
                            id,
                            { fields: 'isGrantRequestFeePayedByCharity,isCharityWebsiteFeePayedByCharity,isGivingCardFeePayedByCharity,isSessionFeePayedByCharity' });
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource();
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorGrantFeesForm,
        });
    }
}

export default DonorGrantFeesViewStore;
