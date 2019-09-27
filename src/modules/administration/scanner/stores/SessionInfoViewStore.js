import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionService } from "common/data";
import { SessionInformationCreateForm } from 'modules/administration/scanner/forms';
import { isSuccessCode } from 'core/utils'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('signalr');

class SessionInfoViewStore extends BaseEditViewStore {
    @observable loadingExistingSession = false;
    @observable isValidExisitingSessionKey = '';
    @observable existingSession = null;

    constructor(rootStore, nextStep, previousStep, setSessionKeyIdentifier, setExistingCertificates) {
        const sessionService = new SessionService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'session information',
            actions: {
                create: async (item) => {
                    return await sessionService.createSessionInformation(item);
                }
            },
            FormClass: SessionInformationCreateForm,
            goBack: false,
            onAfterCreate: (response) => {
                setSessionKeyIdentifier(response.data);
                this.existingSession ? setExistingCertificates(this.existingSession.sessionCertificates) : null;
                nextStep()
            }
        });

        this.isSuccessCode = isSuccessCode;
        this.rootStore = rootStore;
        this.sessionService = sessionService;
    }

    @action.bound async loadExistingSession(event) {
        if (event && event.target && event.target.value && event.target.value.length === 5) {
            const sessionKeyIdentifier = event.target.value;
            this.loadingExistingSession = true;
            try {
                const response = await this.sessionService.getExistingSession({ key: sessionKeyIdentifier });
                if (this.isSuccessCode(response.statusCode)) {
                    this.form.update(response.data)
                    this.form.$('key').set('value', sessionKeyIdentifier);
                    this.existingSession = response.data;
                    this.isValidExisitingSessionKey = true;
                }
                else {
                    this.isValidExisitingSessionKey = false;
                }
            } catch (errorResponse) {
                this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
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

export default SessionInfoViewStore;
