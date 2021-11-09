import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
import { action, observable } from 'mobx';
import { APITestingForm } from 'application/administration/test/forms';
import moment from 'moment';

class APITestingViewStore extends BaseEditViewStore {
    @observable requestType;
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
        this.createGrantScheduleTypeDropdownStore();
        this.validationToken = '276b0b1c-e4a9-41c7-83d3-a1c9836b40c5';
        this.url = 'https://api.tdfcharitable.org/thedonorsfund/third-party/create-grant';
    }

    createGrantScheduleTypeDropdownStore() {
		this.grantScheduleTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				const data = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
				return data.filter(c => c.abrv != 'one-time');
			},
		});
	}

    createRequestTypeDropdownStore() {
		this.requestTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Third party request' },
					{ id: '2', name: 'Fidelity request' },
				];
			},
		});

        this.requestTypeDropdownStore.setValue({
            id: '1',
            name: 'Third party request' 
        })
        this.response = null;
        this.form.$('requestType').set('1');
	}

    @action.bound
	requestChange = async () => {   
        this.validationToken =  this.form.$('requestType').value == 1 ? '276b0b1c-e4a9-41c7-83d3-a1c9836b40c5': '27a1c6fd-9287-4ce1-8c0f-cec958e3d3c5';
        this.url  =  this.form.$('requestType').value == 1 ? 'https://api.tdfcharitable.org/thedonorsfund/third-party/create-grant' : 'https://api.tdfcharitable.org/thedonorsfund/grant/create';
    }

    @action.bound
	sendRequest = async () => { 
            var requestData;
            if (this.form.$('requestType').value == 1 && this.grantScheduleTypeDropdownStore.value){
                requestData = {
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value,
                    startFutureDate: moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD'),
                    noEndDate: this.form.$('noEndDate').value,
                    numberOfPayments: this.form.$('numberOfPayments').value,
                    grantScheduleType: this.grantScheduleTypeDropdownStore.value.abrv,
                    donor: this.form.$('donor').value,
                    donorAuthorization: this.form.$('donorAuthorization').value,
                    isRecurring: this.form.$('isRecurring').value
                }
            } else if (this.form.$('requestType').value == 2){
                requestData = {
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value,
                    cardNumber: this.form.$('cardNumber').value,
                    description: this.form.$('description').value
                } 
            } else {
                requestData = {
                    taxId: this.form.$('taxId').value,
                    amount: this.form.$('amount').value,
                    noEndDate: this.form.$('noEndDate').value,
                    donor: this.form.$('donor').value,
                    donorAuthorization: this.form.$('donorAuthorization').value,
                    isRecurring: this.form.$('isRecurring').value
                }
            }
            const requestOptions = {
                method: 'POST',
                headers: 
                { 'Content-Type': 'application/json', 
                'Validation-Token': this.validationToken
                },
                body: JSON.stringify(requestData)
            };
            fetch(this.url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if(data.error != undefined || data.error != null)
                    {
                        this.response = {
                            isSuccess : false,
                            error : data.error,
                            errorCode : data.errorCode
                        }
                    } else if (data == 'Success!') {
                        this.response = {
                            isSuccess : true,
                            msg : 'Approved'
                        }
                    } else {
                        if(this.requestType == 1){
                            this.response = {
                                isSuccess : true,
                                msg : data
                            }
                        }else{
                            this.response = {
                                isSuccess : true,
                                msg : data.status  
                            }
                        }
                    }
                });
    }
}

export default APITestingViewStore;
