import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { EditBlankCertificateForm } from 'application/session/forms';
import { SessionService } from 'application/session/services';

@applicationContext
class EditBlankCertificateViewStore extends BaseEditViewStore {
    sendReviewEmail = false;

    constructor(rootStore, sessionCertificate, onAfterAction) {
        super(rootStore, {
            name: 'session-edit-blank-certificate',
            id: sessionCertificate.id,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {
                        try {
                            const service = new SessionService(rootStore.application.baasic.apiClient);
                            await service.updateBlankCertificate({
                                id: this.id,
                                sendReviewEmail: this.sendReviewEmail,
                                reviewUrl: window.location.host + '/app/review-certificate',
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
                        return sessionCertificate;
                    }
                }
            },
            FormClass: EditBlankCertificateForm,
            onAfterAction: onAfterAction,
        });

        this.form.$('blankCertificateValue').set('rules', this.form.$('blankCertificateValue').rules + '|max:' + sessionCertificate.certificate.booklet.donorAccount.blankBookletMaxAmount)
        this.sessionCertificate = sessionCertificate;
    }

    @action.bound
    async saveAndSendReviewEmail() {
        this.sendReviewEmail = true;
        this.form.submit()
    }
}

export default EditBlankCertificateViewStore;
