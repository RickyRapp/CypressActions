import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionService } from 'application/session/services';
import { Step2CreateForm } from 'application/session/forms';
import { applicationContext } from 'core/utils';

const ErrorType = {
    ScannerNotInitialized: 0,
    SessionAlreadyActive: 1
};

@applicationContext
class Step2ViewStore extends BaseEditViewStore {
    @observable loadingExistingSession = false;
    @observable isValidExisitingSessionKey = '';
    existingSession = null;
    response = null;

    constructor(rootStore, { nextStep, previousStep, setSessionKeyIdentifier }) {
        const service = new SessionService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'step2-create',
            id: undefined,
            autoInit: true,
            actions: () => {
                return {
                    create: async (resource) => {
                        try {
                            this.response = await service.createSessionInformation(resource);
                        } catch (err) {
                            if (err.data.statusCode === 4000000001) {
                                throw { type: ErrorType.ScannerNotInitialized, error: err };
                            }
                            else if (err.data.statusCode === 4000000002) {
                                throw { type: ErrorType.SessionAlreadyActive, error: err };
                            }
                            else {
                                throw { error: err };
                            }
                        }
                    }
                }
            },
            errorActions: {
                onCreateError: ({ type, error }) => {
                    switch (type) {
                        case ErrorType.ScannerNotInitialized:
                            rootStore.notificationStore.error('SESSION.CREATE.STEP2.SCANNER_NOT_INITIALIZED_ERROR', error);
                            break;
                        case ErrorType.SessionAlreadyActive:
                            rootStore.notificationStore.error('SESSION.CREATE.STEP2.SESSION_ALREADY_ACTIVE_ERROR', error);
                            break;
                        default:
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: Step2CreateForm,
            onAfterAction: () => {
                setSessionKeyIdentifier(this.response.data.response);
                nextStep()
            }
        });

        this.service = service;
        this.rootStore = rootStore;
        this.previousStep = previousStep;
    }

    @action.bound
    async loadExistingSession() {
        if (this.form.$('key') && this.form.$('key').value.length === 5) {
            const sessionKeyIdentifier = this.form.$('key').value;
            this.loadingExistingSession = true;
            try {
                const response = await this.service.getExistingSession({ key: sessionKeyIdentifier });
                this.form.update(response.data.response)
                this.form.$('key').set(sessionKeyIdentifier);
                this.existingSession = response.data;
                this.isValidExisitingSessionKey = true;
            } catch (err) {
                this.isValidExisitingSessionKey = false;
                if (err.data.statusCode === 4000000001) {
                    this.rootStore.notificationStore.error('SESSION.CREATE.STEP2.SCANNER_NOT_INITIALIZED_ERROR', err);
                }
                else if (err.data.statusCode === 4000000002) {
                    this.rootStore.notificationStore.error('SESSION.CREATE.STEP2.SESSION_ALREADY_ACTIVE_ERROR', err);
                }
                else if (err.data.statusCode === 4040020000) {
                    this.rootStore.notificationStore.error('SESSION.CREATE.STEP2.SESSION_NOT_FOUND_ERROR', err);
                }
                else {
                    this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
                }
            }
        }
        else {
            this.isValidExisitingSessionKey = false;
        }

        if (this.loadingExistingSession) {
            this.loadingExistingSession = false;
        }
    }
}

export default Step2ViewStore;
