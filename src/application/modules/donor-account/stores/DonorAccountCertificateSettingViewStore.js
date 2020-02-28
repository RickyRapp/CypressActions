import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAccountCertificateSettingForm } from 'application/donor-account/forms';
import { DonorAccountService } from '../services';
import { LookupService } from 'common/services';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAccountCertificateSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const donorAccountId = rootStore.routerStore.routerState.params.id;
        const service = new DonorAccountService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'certificate-edit',
            id: donorAccountId,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.editCertificateSetting({ id: donorAccountId, ...resource });
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
                await this.getResource(donorAccountId);
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorAccountCertificateSettingForm,
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

export default DonorAccountCertificateSettingViewStore;
