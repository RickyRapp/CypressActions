import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorCertificateSettingForm } from 'application/donor/forms';
import { DonorService } from '../services';
import { LookupService } from 'common/services';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorCertificateSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const donorId = rootStore.routerStore.routerState.params.id;
        const service = new DonorService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'certificate-edit',
            id: donorId,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.editCertificateSetting({ id: donorId, ...resource });
                    },
                    get: async (id) => {
                        try {
                            let response = await service.getCertificateSetting(id);
                            return response.data;
                        } catch (error) {
                            return null;
                        }
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource(donorId);
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorCertificateSettingForm,
        });

        this.grantAcknowledgmentTypeByAmountDropwdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
                    const response = await service.getAll();
                    return response.data;
                },
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
                    const response = await service.getAll();
                    return response.data;
                },
            });
    }
}

export default DonorCertificateSettingViewStore;
