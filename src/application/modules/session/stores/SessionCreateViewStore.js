import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { SessionCreateForm } from 'application/session/forms';
import { charityFormatter } from 'core/utils';

class SessionViewStore extends BaseEditViewStore {
    steps = [1, 2, 3, 4];
    @observable currentStep = 1;
    @observable barcode = '';
    @observable sessionCertificates = [];

    constructor(rootStore) {
        super(rootStore, {
            name: 'session-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        console.log(resource)
                        console.log(this.sessionCertificates)
                    }
                }
            },
            FormClass: SessionCreateForm,
            onAfterAction: () => {
                this.nextStep(4);
            }
        });

        this.createCharityDropdownStore();
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
            const data = await this.rootStore.application.session.sessionStore.createInitialSession(this.form.values());
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
                data = await this.rootStore.application.session.sessionStore.addCertificate({ key: this.form.$('key').value, barcode: this.barcode });
            } catch (ex) {
                data = ex.data;
            }
            if (data.isEligible) {
                this.sessionCertificates.push(data.certificate);
            }
            else {
                this.handleResponse(data.errorCode);
            }
            this.barcode = '';
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
                    const data = await this.rootStore.application.session.sessionStore.searchCharity({
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
                    return _.map(data, x => {
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
