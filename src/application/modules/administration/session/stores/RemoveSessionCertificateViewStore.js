import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { RemoveSessionCertificateForm } from 'application/administration/session/forms';
import { SessionService } from 'application/administration/session/services';

@applicationContext
class RemoveSessionCertificateViewStore extends BaseEditViewStore {
    constructor(rootStore, sessionCertificate, onAfterAction) {
        super(rootStore, {
            name: 'session-remove-certificate',
            id: sessionCertificate.id,
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
                        return sessionCertificate;
                    }
                }
            },
            FormClass: RemoveSessionCertificateForm,
            onAfterAction: onAfterAction,
        });

        this.bookletOrder = sessionCertificate.certificate.booklet.bookletOrderItemBooklets[0].bookletOrderItem.bookletOrder;
        this.denominationType = sessionCertificate.certificate.booklet.denominationType;
        this.sessionCertificate = sessionCertificate;
        this.isPrivate = this.bookletOrder.accountType.abrv === 'private';

        this.certificateValue = null;
        this.certificateFeeValue = null;
        if (this.isPrivate) {
            if (this.denominationType.abrv === 'blank') {
                this.certificateValue = sessionCertificate.blankCertificateValue;
            }
            else {
                this.certificateValue = this.denominationType.value;
            }
            this.certificateFeeValue = Number((this.certificateValue * sessionCertificate.privateFeeCharge).toFixed(2))
        }
        else {
            this.certificateValue = this.denominationType.value;
            this.certificateFeeValue = Number((this.certificateValue * this.bookletOrder.regularFeeCharge).toFixed(2))
        }

        this.certificateStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.certificateStatusStore.find();
            },
            initValueFunc: async () => {
                this.form.$('certificateStatusId').set(sessionCertificate.certificate.certificateStatus.id)
                return sessionCertificate.certificate.certificateStatus;
            }
        });

    }
}

export default RemoveSessionCertificateViewStore;
