import { action, computed, observable } from 'mobx';
import { BaasicDropdownStore, BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { SessionService } from 'application/administration/session/services';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { SessionCreateForm } from '../forms';

class SessionViewStore extends BaseEditViewStore {
    steps = [1,2,3];
    @observable currentStep = 1;
    @observable barcode = '';
    @observable sessionCertificates = [];
    @observable currentCount = 30;
    @observable session = 30;
    refreshIntervalId = null;
    @observable isChangedDefaultAddress = null;
    charities = [];
	@observable charity = null;
    @observable charityInputValue = null;
	@observable filteredCharities = [];
    @observable isCharitySelected = false;
    @observable cardNumber = null;
    @observable isCharityAccount = false;
    @observable isScannerAccount = false;
    @observable charityName = 'N/A';
    @observable blankScans = [];
    @observable charityAddress = null;
    @observable taxId = null;
    @observable phoneNumber = null;
    @observable paymentMethod = null;
    @observable emailInputs = [{email:'bla', valid:true, message:''}]

    constructor(rootStore) {
        const service = new SessionService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'remote-deposit-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        const response = await this.rootStore.application.administration.sessionStore.finishSession({ key: resource.key });
                        this.session = response.response;
                        this.nextStep(3);
                        this.form.clear();
                        this.charityDropdownStore.setValue(null);
                        this.charityDropdownStore.setFilteredItems([]);
                        this.charityDropdownStore.setItems([]);
                        this.refreshIntervalId = setInterval(() => {
                            --this.currentCount;
                            if (this.currentCount == 0) {
                                this.nextStep(1);
                            }
                        }, 1000);
                    }
                }
            },
            FormClass: SessionCreateForm,
            onAfterAction: () => {
                this.nextStep(3);
            }
        });
        
        this.currentStep = 1;
        this.isCharityAccount = true;
        this.isCharitySelected = true;
        var charityFromUser = this.rootStore.userStore.applicationUser.charity;
        this.charityName = charityFromUser.name;
        this.charityAddress = `${charityFromUser.addressLine1}, ${charityFromUser.city}, ${charityFromUser.state}, ${charityFromUser.zipCode}`;
        this.taxId = charityFromUser.taxId;
        this.phoneNumber = charityFromUser.phoneNumber;
        this.emailInputs[0].email = charityFromUser.email;
        this.form.$('charityId').value = this.rootStore.userStore.applicationUser.charityId;
        
        if(this.rootStore.userStore.applicationUser.roles.includes('Scanners')) {
            this.isScannerAccount = true;
        }
        this.createCharityDropdownStore();
        this.createImageUploadStore();
        this.getPaymentMethod();
        this.blankCertificateModal = new ModalParams({});
        this.givingCardModal = new ModalParams({});
        this.service = service;
    }

    @action.bound
    goToCharityDashboard() {
        this.rootStore.routerStore.goTo('master.app.main.charity.dashboard');
    }
    @action.bound
    async cancelCertificate(barcode) {
        await this.rootStore.application.administration.sessionStore.removeCertificateFromOpenSession({ key: this.form.$('key').value, barcode: barcode });
        this.sessionCertificates = this.sessionCertificates.filter(obj => {
            return obj.barcode !== barcode;
        });
        this.rootStore.notificationStore.success(`Successfully removed from cache`);
    }

    @action.bound
    async removeFromCache() {
        await this.service.inActivateSession({ key: this.form.$('key').value });
        await this.service.removeSessionFromCache({ key: this.form.$('key').value });
        if(this.rootStore.userStore.applicationUser.roles.includes('Charities')) {
            this.rootStore.routerStore.goTo('master.app.main.charity.remote-deposit.list');
        } else {
            this.rootStore.routerStore.goTo('master.app.main.administration.session.tab');
        }
        
        this.rootStore.notificationStore.success(`Successfully removed from cache`);
    }

    @action.bound
    async editCheck(item) {
        this.blankCertificateModal.open({
            certificate: {... item, certificateValue: item.denominationTypeValue},
            isCharityAccount: this.isCharityAccount,
            imageUploadStore: this.imageUploadStore,
            isEdit: this.sessionCertificates.map(c => c.barcode).indexOf(item.barcode) >= 0,
            isScannerAccount: this.isScannerAccount,
            onClick: (certificate) => {
                this.setBlankCertificate(certificate);
                this.blankCertificateModal.close();
            },
            onClose: () => {
                this.cancelCertificate(item.certificate.barcode);
            }
        });
    }

    @action.bound
	setCharityId(id) {
		const charity = this.filteredCharities.find(x => x.value === id);
		this.charity = charity;
        this.form.$('charityId').value = id;
        this.isCharitySelected = true;
	} 
	@action.bound
	async filterCharities(inputValue) {
		const data = await this.rootStore.application.administration.grantStore.searchCharity({
			pageNumber: 1,
			pageSize: 10,
			search: inputValue,
			sort: 'name|asc',
			embed: ['charityAddresses'],
			fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary'],
		});
		const mapped = data.item.map(x => {
			return {
				id: x.id,
				name: charityFormatter.format(x, { value: 'charity-name-display' }),
				item: x,
			};
		});
		let options = [];
		mapped.forEach(item => {
			options.push({value: item.id, label:item.name, item: item.item});
		});
		this.filteredCharities = options;
		return options;
	};
	
	@action.bound
	async charityLoadOptions(inputValue) {
		await this.filterCharities(inputValue);
	};

    @action.bound
    async onNextStep1Click() {
        let invalidEmail = false;
        let emails = '';
        this.emailInputs.forEach((item, idx) => {
            if(!item.valid)
            {
                invalidEmail = true;
                return;
            }
            emails += `${item.email}${(idx < this.emailInputs.length-1 ? ',' : '')}`;
        });

        if(invalidEmail)
            return;

        this.form.$('email').set(emails);
        if(this.isCharityAccount) {
            const params = {
                embed: ['contactInformation', 'charityAddresses']
            }
            const charityId = this.rootStore.userStore.applicationUser.charityId;
            this.setCharityId(charityId);
            const data = await this.rootStore.application.charity.charityStore.getCharity(charityId, params);
            const primaryAddress = data && data.charityAddresses && data.charityAddresses.find(c => c.isPrimary);
            this.charity = {label: charityFormatter.format(data, {value: 'charity-name-display'}), value: charityId};
            if(!this.isChangedDefaultAddress)
                this.setAddress(primaryAddress);
        } else if (!this.isChangedDefaultAddress) {
            const address = this.charity.item;
            this.setAddress(address);
        }
        const { isValid } = await this.form.validate({ showErrors: true });
        if (isValid) {
            const data = await this.rootStore.application.administration.sessionStore.createInitialSession(this.form.values());
            this.form.$('key').set(data.response);
            this.nextStep(2);
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

    @action.bound
    async onNextStep3Click() {
        clearInterval(this.refreshIntervalId);
        this.form.$('key').value = null;
        this.sessionCertificates = [];
        this.nextStep(1);
    }

    nextStep(step) {
        if (step) {
            this.currentStep = step;
        }
        else {
            ++this.currentStep;
        }
    }

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { // eslint-disable-line
                //async call to delete if needed
            },
            onChange: value => {
			},
			onRemoveFromBuffer: () => {
			},
        });

    }

    @action.bound
    async onBarcodeChange(event) {
        this.barcode = event.target.value;
        if (this.barcode && this.barcode.length === 10) {
            let data = null;
            try {
                data = await this.rootStore.application.administration.sessionStore.addCertificate({ key: this.form.$('key').value, barcode: this.barcode });
            } catch (ex) {
                data = ex.data;
            }
            if (data.isEligible) {
                data.certificate.isBlank = false;
                if (data.certificate.denominationTypeValue === 0) {
                    this.blankCertificateModal.onClose = (() => this.cancelCertificate(data.certificate.barcode));
                    this.blankCertificateModal.open({
                        certificate: data.certificate,
                        isCharityAccount: this.isCharityAccount,
                        isScannerAccount: this.isScannerAccount,
                        imageUploadStore: this.imageUploadStore,
                        isEdit: false,
                        onClick: (certificate) => {
                            certificate.isBlank = true;
                            this.setBlankCertificate(certificate);
                            this.blankCertificateModal.onClose = null;
                            this.blankCertificateModal.close();
                        },
                        onClose: () => {
                            this.cancelCertificate(data.certificate.barcode);
                        }
                    });
                }
                else {
                    this.sessionCertificates.push(data.certificate);
                }
            }
            else {
                this.handleResponse(data.errorCode);
            }
            this.barcode = '';
        }
    }

    @action.bound
    async setBlankCertificate(certificate) {
        try {
            let mediaEntry = null;
            if(this.imageUploadStore.files.length > this.imageUploadStore.originalFiles.length) {
                mediaEntry = await this.service.uploadBlankCertificate(this.imageUploadStore.files[0], certificate.certificateId);
            }
            const data = await this.rootStore.application.administration.sessionStore.setBlankCertificateFromOpenSession({ key: this.form.$('key').value, barcode: certificate.barcode, certificateValue: certificate.certificateValue, coreMediaVaultEntryId: mediaEntry ? mediaEntry.data.id : null });
            data.response.isBlank = true;

            let existingCertificateInSession = this.sessionCertificates.map(c => c.barcode).indexOf(certificate.barcode);
            if(existingCertificateInSession >= 0) {
                this.sessionCertificates[existingCertificateInSession].certificateValue = data.response.certificateValue;
                this.sessionCertificates[existingCertificateInSession].denominationTypeValue = data.response.denominationTypeValue;
            } else {
                this.sessionCertificates.push(data.response);
            }
        } catch (ex) {
            try {
                await this.rootStore.application.administration.sessionStore.removeCertificateFromOpenSession({ key: this.form.$('key').value, barcode: certificate.barcode });
                this.rootStore.notificationStore.warning("Something went wrong. Check is not updated with entered amount and it's removed from session.");
            } catch (error) {
                this.rootStore.notificationStore.error("Something went wrong. Check is not updated and it's not removed from session.");
            }
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
                    const data = await this.rootStore.application.administration.charityStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                        ],
                        fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary']
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                },
                onChange: value => {
                    if (value) {
                        try {
                            const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
                            this.setAddress(address);
                        } catch (error) {
                            
                        }
                    }
                },
            });
    }

    handleResponse(errorCode) {
        if (errorCode >= 4001 && errorCode <= 4010) {
            this.rootStore.notificationStore.error('ERROR_CODE.' + errorCode);
        } else if (errorCode == 4019) {
            this.rootStore.notificationStore.error('Certificate expired');
        } else if (errorCode == 4016) {
            this.rootStore.notificationStore.error('Certificate not in status for session');
        } else {
            this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
        }
        return true;
    }

    @action.bound
    async onChangeDefaultAddressClick() {
        this.isChangedDefaultAddress = !this.isChangedDefaultAddress;
        if (!this.isChangedDefaultAddress && this.charityDropdownStore.value) {
            const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
            this.setAddress(address);
        }
    }

    setAddress(address) {
        this.form.$('addressLine1').set(address.addressLine1);
        this.form.$('addressLine2').set(address.addressLine2);
        this.form.$('city').set(address.city);
        this.form.$('state').set(address.state);
        this.form.$('zipCode').set(address.zipCode);
    }
    @computed get insufficientAmount() {
        this.sessionCertificates.length > 0 ? this.sessionCertificates.filter(c => c.insufficientFunds).map(c => c.certificateValue).reduce((a, b) => a + b, 0) : 0;
    }

    async getPaymentMethod(){
        this.paymentMethod = await this.rootStore.application.administration.sessionStore.getPaymentMethod(this.rootStore.userStore.applicationUser.charityId);
    }

    @action.bound
    addEmailField(){
        this.emailInputs = [...this.emailInputs, {email:'', valid:false, message:''}]
    }

    @action.bound
    handleEmailChange(index, event){
        let data = [...this.emailInputs];
        data[index].email = event.target.value;
        
        if(event.target.value === ''){
            data[index].message = 'Please enter email address';
            data[index].valid = false;
            return;
        }
        
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)){
            data[index].message = 'Invalid email address';
            data[index].valid = false;
        }else{
            data[index].message = '';
            data[index].valid = true;
        }
    }

    @action.bound
    removeEmailInputField(){
        if(this.emailInputs.length > 1){
            this.emailInputs.splice(-1);
        }
    }

    @action.bound
    redirectToAllRemoteDeposits(){
        this.rootStore.routerStore.goTo('master.app.main.charity.activity', null, {tab: '2'});
    }

}

export default SessionViewStore;
