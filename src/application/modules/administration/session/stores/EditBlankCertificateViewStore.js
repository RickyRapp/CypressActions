import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { EditBlankCertificateForm } from 'application/administration/session/forms';
import { localizationService, validatorService } from 'core/services';

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
                            await rootStore.application.administration.sessionStore.updateBlankCertificate({
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

        this.grant = grant;
        this.createBalanceValidators();
    }

    @action.bound
    async saveAndSendReviewEmail() {
        this.sendReviewEmail = true;
        this.form.submit()
    }

    createBalanceValidators() {
        validatorService.registerAsyncValidator('blankCertificateValueMaxBooklet', async (value, attribute, req, passes) => {
            try {
                if (value > this.grant.donor.blankBookletMaxAmount) {
                    return passes(false, localizationService.t('Amount is greater than the donors setting for max booklet amount.'))
                }
                return passes();
            } catch (err) {
                return passes(false, localizationService.t('DONOR.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });

        validatorService.registerAsyncValidator('blankCertificateValueDonorBalance', async (value, attribute, req, passes) => {
            try {
                if (value > (this.grant.donor.presentBalance + this.grant.donor.lineOfCredit)) {
                    return passes(false, localizationService.t('Amount is greater than the donors balance plus line of credit.'))
                }
                return passes();
            } catch (err) {
                return passes(false, localizationService.t('DONOR.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });
    }
}

export default EditBlankCertificateViewStore;
