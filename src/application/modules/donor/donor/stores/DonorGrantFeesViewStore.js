import { BaseEditViewStore } from 'core/stores';
import { DonorGrantFeesForm } from 'application/donor/donor/forms';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorGrantFeesViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-grant-fees',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.donor.donorStore.updateGrantFees(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.donor.donorStore.getDonor(
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
