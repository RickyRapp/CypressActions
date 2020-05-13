import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { SessionScanService } from 'application/session/services';
import { Step2CreateForm } from 'application/session/forms';
import { applicationContext, charityFormatter } from 'core/utils';
import { CharityService } from 'application/charity/services';
import _ from 'lodash';

@applicationContext
class Step2ViewStore extends BaseEditViewStore {
    @observable loadingExistingSession = false;
    @observable isValidExisitingSessionKey = '';
    existingSession = null;
    response = null;

    constructor(rootStore, { nextStep, previousStep, sessionKeyIdentifier, setSessionKeyIdentifier, handleResponse, language }) {
        const service = new SessionScanService(rootStore.application.baasic.apiClient);

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
                            throw { error: err };
                        }
                    }
                }
            },
            errorActions: {
                onCreateError: ({ error }) => {
                    this.handleResponse(error.data, error);
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
        this.handleResponse = handleResponse;

        if (sessionKeyIdentifier) {
            this.form.$('key').set(sessionKeyIdentifier);
            this.loadExistingSession();
        }

        if (language) {
            this.form.$('language').set(language);
        }
        else {
            this.form.$('language').set('eng');
        }

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION.CREATE.STEP2.FIELDS.CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAccountType'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAccountType',
                            'charityAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                }
            });
    }

    @action.bound
    async loadExistingSession() {
        if (this.form.$('key').value && this.form.$('key').value.toString().length === 5) {
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
                this.handleResponse(err.data, err);
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
