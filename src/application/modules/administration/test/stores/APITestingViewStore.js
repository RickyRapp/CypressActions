import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
import { action, observable } from 'mobx';
import { APITestingForm } from 'application/administration/test/forms';
import moment from 'moment';

class APITestingViewStore extends BaseEditViewStore {
    @observable requestType;
    @observable processRequest;
    @observable url;
    @observable validationToken;
    @observable response;
    @observable url;
    constructor(rootStore) {

        super(rootStore, {
            name: 'api-testing',
            FormClass: APITestingForm,
        });
        this.service = new AdministrationService(rootStore.application.baasic.apiClient)
        this.createRequestTypeDropdownStore();
        this.createProcessRequestDropdownStore();
        this.createGrantScheduleTypeDropdownStore();
        this.createGrantPurposeTypeDropdownStore();
        this.createFundraisingPlatformDropdownStore();
        this.validationToken = '276b0b1c-e4a9-41c7-83d3-a1c9836b40c5';
        this.baseUrl = ApplicationSettings.useSSL ? 'https://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/";
        this.url = this.baseUrl + 'third-party/create-grant';
    }

    createGrantScheduleTypeDropdownStore() {
        this.grantScheduleTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const data = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
                return data.filter(c => c.abrv != 'one-time');
            },
        });
    }

    createGrantPurposeTypeDropdownStore() {
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const data = await this.rootStore.application.lookup.grantPurposeTypeStore.find();
                return data;
            },
        });
    }

    createRequestTypeDropdownStore() {
        this.requestTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return [
                    { id: '1', name: 'Third party request' },
                    { id: '2', name: 'Terminal machine API' },
                    { id: '3', name: 'Fundraising platforms' },
                ];
            },
            onChange: async () => {
                this.validationToken = this.form.$('requestType').value == 1 ? '276b0b1c-e4a9-41c7-83d3-a1c9836b40c5' : (this.form.$('requestType').value == 2 ? this.form.$('processRequest').value : '');
                this.url = (this.form.$('requestType').value == 1 || this.form.$('requestType').value == 3) ? this.baseUrl + 'third-party/create-grant' : this.baseUrl + 'grant/create';
            }
        });

        this.requestTypeDropdownStore.setValue({
            id: '1',
            name: 'Third party request'
        })
        this.response = null;
        this.form.$('requestType').set('1');

    }

    async createProcessRequestDropdownStore() {
        let params = {};
        params.isApiTesting = true;
        var data = await this.rootStore.application.administration.charityWebsiteStore.findProcessingCompany(params);
        var items = data.item.filter(x => x.name != 'Internal');
        this.processRequestDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return items.map(x => {
                    return {
                        id: x.validationToken,
                        name: x.name,
                        item: x
                    }
                });
            },
            onChange: async () => {
                this.validationToken = this.processRequestDropdownStore.value.item.validationToken;
            }
        });
    }

    async createFundraisingPlatformDropdownStore() {
        let params = {};
        params.type = 'FundraisingPlatforms';
        params.isApiTesting = true;
        var data = await this.rootStore.application.administration.charityWebsiteStore.findCharityWebsite(params);

        this.fundraisingPlatformDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return data.item.map(x => {
                    return {
                        id: x.validationToken,
                        name: x.name,
                        item: x
                    }
                });
            },
            onChange: async () => {
                this.validationToken = this.fundraisingPlatformDropdownStore.value.item.validationToken;
            }
        });
    }


    @action.bound
    sendRequest = async () => {
        var requestData = null;
        if ((this.form.$('requestType').value == 1 || this.form.$('requestType').value == 3) && this.grantScheduleTypeDropdownStore.value) {
            if (this.grantPurposeTypeDropdownStore.value && (this.grantPurposeTypeDropdownStore.value.abrv == 'in-honor-of' || this.grantPurposeTypeDropdownStore.value.abrv == 'in-memory-of' || this.grantPurposeTypeDropdownStore.value.abrv == 'solicited-by' || this.grantPurposeTypeDropdownStore.value.abrv == 'other')) {
                requestData = {
                    accountNumber: this.form.$('accountNumber').value,
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value ? this.form.$('amount').value : 0,
                    startFutureDate: moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD'),
                    noEndDate: this.form.$('noEndDate').value,
                    numberOfPayments: this.form.$('numberOfPayments').value,
                    grantScheduleType: this.grantScheduleTypeDropdownStore.value.abrv,
                    donor: this.form.$('donor').value,
                    donorAuthorization: this.form.$('donorAuthorization').value,
                    isRecurring: this.form.$('isRecurring').value,
                    grantPurposeType: this.grantPurposeTypeDropdownStore.value.abrv,
                    purposeNote: this.form.$('purposeNote').value
                }
            } else {
                requestData = {
                    accountNumber: this.form.$('accountNumber').value,
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value ? this.form.$('amount').value : 0,
                    startFutureDate: moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD'),
                    noEndDate: this.form.$('noEndDate').value,
                    numberOfPayments: this.form.$('numberOfPayments').value,
                    grantScheduleType: this.grantScheduleTypeDropdownStore.value.abrv,
                    donor: this.form.$('donor').value,
                    grantPurposeType: this.grantPurposeTypeDropdownStore.value ? this.grantPurposeTypeDropdownStore.value.abrv : 'where-deemed-most-needed',
                    donorAuthorization: this.form.$('donorAuthorization').value,
                    isRecurring: this.form.$('isRecurring').value
                }
            }

        } else if (this.form.$('requestType').value == 2) {
            requestData = {
                accountNumber: this.form.$('accountNumber').value,
                taxId: this.form.$('taxId').value,
                amount: this.form.$('amount').value,
                cardNumber: this.form.$('cardNumber').value,
                description: this.form.$('description').value
            }
        } else {
            if (this.grantPurposeTypeDropdownStore.value && (this.grantPurposeTypeDropdownStore.value.abrv == 'in-honor-of' || this.grantPurposeTypeDropdownStore.value.abrv == 'in-memory-of' || this.grantPurposeTypeDropdownStore.value.abrv == 'solicited-by' || this.grantPurposeTypeDropdownStore.value.abrv == 'other')) {
                requestData = {
                    accountNumber: this.form.$('accountNumber').value,
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value ? this.form.$('amount').value : 0,
                    noEndDate: this.form.$('noEndDate').value,
                    donor: this.form.$('donor').value,
                    donorAuthorization: this.form.$('donorAuthorization').value,
                    isRecurring: this.form.$('isRecurring').value,
                    grantPurposeType: this.grantPurposeTypeDropdownStore.value.abrv,
                    purposeNote: this.form.$('purposeNote').value
                }
            } else {
                requestData = {
                    accountNumber: this.form.$('accountNumber').value,
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value ? this.form.$('amount').value : 0,
                    noEndDate: this.form.$('noEndDate').value,
                    donor: this.form.$('donor').value,
                    donorAuthorization: this.form.$('donorAuthorization').value,
                    isRecurring: this.form.$('isRecurring').value
                }
            }
        }
        const requestOptions = {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Validation-Token': this.validationToken,
                'API-Key': this.form.$('apiKey').value
            },
            body: JSON.stringify(requestData)
        };
        fetch(this.url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error != undefined || data.error != null || (data.message && data.message.includes("invalid"))) {
                    this.response = {
                        isSuccess: false,
                        error: data.error ? data.error : data.message,
                        errorCode: data.errorCode ? data.errorCode : 400
                    }
                } else if (data == 'Success!') {
                    this.response = {
                        isSuccess: true,
                        msg: 'Approved'
                    }
                } else {
                    if (this.requestType == 1) {
                        this.response = {
                            isSuccess: true,
                            msg: data
                        }
                    } else {
                        this.response = {
                            isSuccess: true,
                            msg: data.status
                        }
                    }
                }
            });
    }
}

export default APITestingViewStore;
