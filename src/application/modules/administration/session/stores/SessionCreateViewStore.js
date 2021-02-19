import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { SessionCreateForm } from 'application/administration/session/forms';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

class SessionViewStore extends BaseEditViewStore {
    steps = [1, 2, 3, 4];
    @observable currentStep = 1;
    @observable barcode = '';
    @observable sessionCertificates = [];
    @observable currentCount = 30;
    @observable session = 30;
    refreshIntervalId = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'session-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        const response = await this.rootStore.application.administration.sessionStore.finishSession({ key: resource.key });
                        this.session = response.response;
                        this.nextStep(4);
                        this.form.clear();
                        this.charityDropdownStore.setValue(null);
                        this.refreshIntervalId = setInterval(() => {
                            --this.currentCount;
                            if (this.currentCount == 0) {
                                this.nextStep(1);
                            }
                        }, 1000);
                    }
                }
            },
            FormClass: SessionCreateForm,
            onAfterAction: () => {
                this.nextStep(4);
            }
        });

        this.createCharityDropdownStore();
        this.blankCertificateModal = new ModalParams({});
    }

    @action.bound
    onNextStep1Click(language) {
        this.form.$('language').set(language);
        this.nextStep(2);
    }

    @action.bound
    async onNextStep2Click() {
        const { isValid } = await this.form.validate({ showErrors: true });
        if (isValid) {
            const data = await this.rootStore.application.administration.sessionStore.createInitialSession(this.form.values());
            this.form.$('key').set(data.response);
            this.nextStep(3);
        }
    }

    @action.bound
    onPreviousStep2Click() {
        this.nextStep(1);
    }

    @action.bound
    onPreviousStep3Click() {
        this.nextStep(2);
    }

    @action.bound
    async onNextStep4Click() {
        clearInterval(this.refreshIntervalId);
        this.nextStep(1);
    }

    nextStep(step) {
        if (step) {
            this.currentStep = step;
        }
        else {
            ++this.currentStep;
        }
    }

    @action.bound
    async onBarcodeChange(event) {
        this.barcode = event.target.value;
        if (this.barcode && this.barcode.length === 10) {
            let data = null;
            try {
                data = await this.rootStore.application.administration.sessionStore.addCertificate({ key: this.form.$('key').value, barcode: this.barcode });
            } catch (ex) {
                data = ex.data;
            }
            if (data.isEligible) {
                if (data.certificate.denominationTypeValue === 0) {
                    this.blankCertificateModal.open({
                        certificate: data.certificate,
                        onClick: (certificate) => {
                            this.setBlankCertificate(certificate);
                            this.blankCertificateModal.close();
                        },
                        onClose: () => {
                        }
                    });
                }
                else {
                    this.sessionCertificates.push(data.certificate);
                }
            }
            else {
                this.handleResponse(data.errorCode);
            }
            this.barcode = '';
        }
    }

    @action.bound
    async setBlankCertificate(certificate) {
        try {
            const data = await this.rootStore.application.administration.sessionStore.setBlankCertificateFromOpenSession({ key: this.form.$('key').value, barcode: certificate.barcode, certificateValue: certificate.certificateValue });
            this.sessionCertificates.push(data.response);
        } catch (ex) {
            console.log(ex)
            try {
                await this.rootStore.application.administration.sessionStore.removeCertificateFromOpenSession({ key: this.form.$('key').value, barcode: certificate.barcode });
                this.rootStore.notificationStore.warning("Something went wrong. Check is not updated with entered amount and it's removed from session.");
            } catch (error) {
                this.rootStore.notificationStore.error("Something went wrong. Check is not updated and it's not removed from session.");
            }
        }
    }

    @action.bound
    setSessionKeyIdentifier(key) {
        this.sessionKeyIdentifier = key;
    }

    @action.bound
    setLanguage(lang) {
        this.language = lang;
        this.nextStep()
    }

    createCharityDropdownStore() {
        this.charityDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.charityStore.findCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAddresses'
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                }
            });
    }

    handleResponse(errorCode) {
        if (errorCode >= 4001 && errorCode <= 4010) {
            this.rootStore.notificationStore.error('ERROR_CODE.' + errorCode);
        }
        else {
            this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
        }
        return true;
    }
}

export default SessionViewStore;
