import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { EditBlankCertificateForm } from 'application/administration/session/forms';
import { SessionService } from 'application/administration/session/services';

@applicationContext
class EditBlankCertificateViewStore extends BaseEditViewStore {
    sendReviewEmail = false;

    constructor(rootStore, grant, onAfterAction) {
        super(rootStore, {
            name: 'session-edit-blank-certificate',
            id: grant.id,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {
                        try {
                            const service = new SessionService(rootStore.application.baasic.apiClient);
                            await service.updateBlankCertificate({
                                id: this.id,
                                sendReviewEmail: this.sendReviewEmail,
                                reviewUrl: window.location.host + '/review-certificate/{reviewToken}',
                                ...resource
                            });
                        } catch (err) {
                            if (err.data) {
                                if (err.data.statusCode === 4000000009) {
                                    this.maxAmountError = true;
                                    this.rootStore.notificationStore.error('SESSION.EDIT.INSUFFICIENT_FUNDS_ERROR', err);
                                }
                            }
                            else {
                                this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
                            }
                        }
                    },
                    get: async () => {
                        return grant;
                    }
                }
            },
            FormClass: EditBlankCertificateForm,
            onAfterAction: onAfterAction,
        });

        this.form.$('blankCertificateValue').set('rules', this.form.$('blankCertificateValue').rules + '|max:' + grant.certificate.booklet.bookletOrder.donor.blankBookletMaxAmount)
        this.grant = grant;
    }

    @action.bound
    async saveAndSendReviewEmail() {
        this.sendReviewEmail = true;
        this.form.submit()
    }
}

export default EditBlankCertificateViewStore;
