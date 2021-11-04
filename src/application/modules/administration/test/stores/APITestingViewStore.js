import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
import { action, observable } from 'mobx';
import { APITestingForm } from 'application/administration/test/forms';

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
        this.validationToken = '276b0b1c-e4a9-41c7-83d3-a1c9836b40c5';
        this.url = 'https://api.tdfcharitable.org/thedonorsfund/third-party/create-grant';
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
        if (this.form.$('requestType').value == 1 ){
            requestData = {
                taxId: this.form.$('taxId').value,
                amount: this.form.$('amount').value,
                startFutureDate: '2021-12-10',
                noEndDate: this.form.$('noEndDate').value,
                numberOfPayments: this.form.$('numberOfPayments').value,
                grantScheduleType: this.form.$('grantScheduleType').value,
                donor: this.form.$('donor').value,
                donorAuthorization: this.form.$('donorAuthorization').value,
                isRecurring: this.form.$('isRecurring').value
            }
        }else{
            requestData = {
                taxId: this.form.$('taxId').value,
                amount: this.form.$('amount').value,
                cardNumber: this.form.$('cardNumber').value,
                description: this.form.$('description').value
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
                }else {
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
                console.log(data)
            });

    }
}

export default APITestingViewStore;
