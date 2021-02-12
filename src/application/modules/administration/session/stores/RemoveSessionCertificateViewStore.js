import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { RemoveSessionCertificateForm } from 'application/administration/session/forms';
import { SessionService } from 'application/administration/session/services';

@applicationContext
class RemoveSessionCertificateViewStore extends BaseEditViewStore {
    constructor(rootStore, grant, onAfterAction) {
        super(rootStore, {
            name: 'session-remove-certificate',
            id: grant.id,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {
                        const service = new SessionService(rootStore.application.baasic.apiClient);
                        await service.removeCertificate(
                            {
                                id: this.id,
                                ...resource
                            });
                    },
                    get: async () => {
                        return grant;
                    }
                }
            },
            FormClass: RemoveSessionCertificateForm,
            onAfterAction: onAfterAction,
        });

        this.bookletOrder = grant.certificate.booklet.bookletOrder;
        this.grant = grant;

        this.certificateValue = grant.amount;
        this.certificateFeeValue = Number((this.certificateValue * 0.029).toFixed(2))

        this.certificateStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.certificateStatusStore.find();
            },
            initValueFunc: async () => {
                this.form.$('certificateStatusId').set(grant.certificate.certificateStatusId)
                return grant.certificate.certificateStatus;
            }
        });

    }
}

export default RemoveSessionCertificateViewStore;
