import { action, observable, computed } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionScanService } from 'application/session/services';
import { Step3CreateForm } from 'application/session/forms';
import { applicationContext, isSome } from 'core/utils';
import { LookupService } from 'common/services';
import { ModalParams } from 'core/models';
import _ from 'lodash';
import 'signalr';

@applicationContext
class Step3ViewStore extends BaseEditViewStore {
    @observable session = null;
    @observable barcode = '';
    @observable denominationTypes = null;
    @observable connectionEstablished = false;

    constructor(rootStore, { nextStep, previousStep, sessionKeyIdentifier, setSessionKeyIdentifier, handleResponse }) {
        const service = new SessionScanService(rootStore.application.baasic.apiClient);

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
                            throw { error: err };
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
                onUpdateError: ({ error }) => {
                    this.handleResponse(error.data, error);
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
        this.handleResponse = handleResponse;
        this.sessionKeyIdentifier = sessionKeyIdentifier;
        this.blankCertificateModal = new ModalParams({});
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
        const connection = $.hubConnection(ApplicationSettings.useSSL ? 'https://' : 'http://' + ApplicationSettings.appUrl + '/signalr'); //eslint-disable-line
        const sessionHubProxy = connection.createHubProxy('sessionHub');
        sessionHubProxy.on('newCertificate', this.onAddedNewCertificate);

        connection.start()
            .done(_.bind(function () {
                sessionHubProxy.invoke('getConnectionId')
                    .then(_.bind(function (connectionId) {
                        this.setConnectionId(connectionId);
                    }, this));
            }, this))
            .fail(function (data) {
                console.log(data);//eslint-disable-line
            });
    }

    @action.bound
    async setConnectionId(connectionId) {
        try {
            await this.service.setConnectionId({ connectionId: connectionId });
            this.connectionEstablished = true;
            this.rootStore.notificationStore.success('SESSION.CREATE.STEP3.READY_FOR_SCANNING');
        } catch (err) {
            this.handleResponse(err.data, err)
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
    async onAddedNewCertificate(response) {
        if (!isSome(this.session.sessionCertificates)) {
            this.session.sessionCertificates = [];
        }
        debugger
        if (response.statusCode === 2000000000) {
            this.session.sessionCertificates.push(response.response);
            this.rootStore.notificationStore.success('SESSION.STATUS_CODE.CERTIFICATE_SUCCESSFULLY_SCANNED_SUCCESS')
            if (response.response.denominationTypeId === this.blankDenominationTypeId) {
                this.blankCertificateModal.open({
                    sessionCertificate: response.response,
                    onClick: this.onSetBlankCertificate
                });
            }
        }
        else {
            this.handleResponse(response);
        }
    }

    @action.bound
    async onSetBlankCertificate(sessionCertificate) {
        await this.service.setBlankCertificate({
            key: this.sessionKeyIdentifier,
            barcode: sessionCertificate.barcode,
            certificateValue: sessionCertificate.certificateValue
        });
        await this.getResource(this.id);
        this.blankCertificateModal.close();
    }

    @action.bound
    async fetchDenominationTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }

    @computed get blankDenominationTypeId() {
        return this.denominationTypes ? _.find(this.denominationTypes, { abrv: 'blank' }).id : null;
    }
}

export default Step3ViewStore;