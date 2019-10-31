import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionService } from 'application/session/services';
import { Step3CreateForm } from 'application/session/forms';
import { applicationContext, isSome } from 'core/utils';
import { LookupService } from 'common/services';
import _ from 'lodash';
import 'signalr';

const ErrorType = {
    ScannerNotInitialized: 0
};

@applicationContext
class Step3ViewStore extends BaseEditViewStore {
    @observable session = null;
    @observable barcode = '';
    @observable denominationTypes = null;

    constructor(rootStore, { nextStep, previousStep, sessionKeyIdentifier, setSessionKeyIdentifier }) {
        const service = new SessionService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'step2-create',
            id: sessionKeyIdentifier,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {
                        try {
                            const response = await service.finishSession(resource);
                            setSessionKeyIdentifier(response.data.response);
                        } catch (err) {
                            if (err.data.statusCode === 4000000001) {
                                throw { type: ErrorType.ScannerNotInitialized, error: err };
                            }
                            else {
                                throw { error: err };
                            }
                        }
                    },
                    get: async (id) => {
                        const response = await service.getExistingSession({ key: id });
                        this.session = response.data.response;
                        return { key: id };
                    }
                }
            },
            errorActions: {
                onUpdateError: ({ type, error }) => {
                    switch (type) {
                        default:
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE', error);
                            break;
                    }
                }
            },
            FormClass: Step3CreateForm,
            onAfterAction: () => {
                nextStep()
            }
        });

        this.service = service;
        this.rootStore = rootStore;
        this.previousStep = previousStep;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadConnection(),
                this.getResource(this.id),
                this.fetchDenominationTypes()
            ]);
        }
    }

    @action.bound
    async loadConnection() {
        const response = await this.rootStore.application.baasic.apiClient.get("http://api.thedonorsfund.local/signalr/hubs");
        eval(response.data);
        // eslint-disable-next-line
        $.connection.hub.url = "http://api.thedonorsfund.local/signalr";

        // eslint-disable-next-line
        const sessionHub = $.connection.sessionHub;
        // Create a function that the hub can call back to display messages.
        sessionHub.client.newCertificate = this.onAddedNewCertificate;

        // Start the connection.
        // eslint-disable-next-line
        $.connection.hub.start()
            .then(_.bind(function () {
                sessionHub.invoke('getConnectionId')
                    .then(_.bind(function (connectionId) {
                        this.setConnectionId(connectionId);
                    }, this));
            }, this));
    }

    @action.bound
    async setConnectionId(connectionId) {
        try {
            await this.service.setConnectionId({ id: connectionId });
            this.rootStore.notificationStore.success('SESSION.CREATE.STEP3.READY_FOR_SCANNING');
        } catch (err) {
            if (err.data.statusCode === 4000000001) {
                this.rootStore.notificationStore.error('SESSION.CREATE.STEP3.SCANNER_NOT_INITIALIZED_ERROR', err);
            }
            else {
                this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
            }
        }
    }

    @action.bound
    async addCertificate(event) {
        if (event && event.target && event.target.value && event.target.value.length === 10) {
            this.barcode = event.target.value;
            try {
                await this.service.addCertificate(
                    {
                        key: this.form.$('key').value,
                        id: this.barcode
                    })
                this.barcode = '';
            } catch (err) {
                this.barcode = '';
            }
        }
        else {
            this.barcode = '';
        }
    }

    @action.bound
    async onAddedNewCertificate(certificate) {
        if (!isSome(this.session.sessionCertificates)) {
            this.session.sessionCertificates = [];
        }
        this.session.sessionCertificates.push(certificate);
    }

    @action.bound
    async fetchDenominationTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }

}

export default Step3ViewStore;