import { BaseEditViewStore } from 'core/stores';
import { DonorGrantFeesForm } from 'application/donor/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorGrantFeesViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        super(rootStore, {
            name: 'donor-grant-fees',
            id: donorId,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.donor.donorStore.updateGrantFees(resource);
                    },
                    get: async () => {
                        return rootStore.application.donor.donorStore.getDonor(
                            donorId,
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

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource()
            ]);
        }
    }
}

export default DonorGrantFeesViewStore;
