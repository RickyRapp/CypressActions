import React from 'react';
import { action, observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { SessionService } from "common/data";
import { SessionCreateForm } from 'modules/administration/scanner/forms';

class ScanningProcessStartViewStore extends BaseEditViewStore {
    @observable barcode = '';

    constructor(rootStore, nextStep, previousStep, sessionKeyIdentifier, certificates) {
        const sessionService = new SessionService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'session information',
            actions: {
                create: async (item) => {
                    return await sessionService.finishSession(item);
                }
            },
            FormClass: SessionCreateForm,
            goBack: false,
            onAfterCreate: () => { nextStep() }
        });

        this.nextStep = nextStep;
        this.certificates = certificates;
        this.sessionService = sessionService;
        this.rootStore = rootStore;
        this.form.$('key').set('value', sessionKeyIdentifier);
    }

    @action.bound addCertificate(event) {
        if (event && event.target && event.target.value && event.target.value.length === 10) {
            this.barcode = event.target.value;
            try {
                this.sessionService.addCertificate({ key: this.form.$('key').value, id: this.barcode })
                    .then(this.onAcceptAddCertificate)
                    .catch(this.onRejectAddCertificate);
            } catch (errorResponse) {
                this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
            }
        }
        else {
            this.barcode = '';
        }
    }

    @action.bound onRejectAddCertificate(response) {
        this.rootStore.notificationStore.showMessageFromResponse(response);
        this.barcode = '';
    }

    @action.bound onAcceptAddCertificate(response) {
        this.barcode = '';
    }

    @action.bound async onContinueLaterClick() {
        try {
            await this.sessionService.continueLater({ key: this.form.$('key').value });
            this.nextStep();
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
        }
    }
}

export default ScanningProcessStartViewStore;
