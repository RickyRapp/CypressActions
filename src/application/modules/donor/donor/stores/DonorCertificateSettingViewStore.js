import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorCertificateSettingForm } from 'application/donor/donor/forms';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorCertificateSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'certificate-edit',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.donor.donorStore.updateCertificateSetting(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.donor.donorStore.getCertificateSetting(id);
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource(donorId);
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorCertificateSettingForm,
        });

        this.donorId = this.id;

        this.createGrantAcknowledgmentTypeByAmountDropdownStore();
        this.createGrantAcknowledgmentTypeDropdownStore();
    }

    createGrantAcknowledgmentTypeByAmountDropdownStore() {
        this.grantAcknowledgmentTypeByAmountDropwdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
    }

    createGrantAcknowledgmentTypeDropdownStore() {
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
    }
}

export default DonorCertificateSettingViewStore;
