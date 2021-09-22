import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { SessionCreateForm } from 'application/administration/session/forms';
import { SessionService } from 'application/administration/session/services';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

class SessionViewStore extends BaseEditViewStore {
    steps = [1, 2, 3, 4];
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

    constructor(rootStore) {
        const service = new SessionService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'session-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        const response = await this.rootStore.application.administration.sessionStore.finishSession({ key: resource.key });
                        this.session = response.response;
                        this.nextStep(4);
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
                this.nextStep(4);
            }
        });

        this.createCharityDropdownStore();
        this.blankCertificateModal = new ModalParams({});
        this.service = service;
    }

    @action.bound
    async cancelCertificate(certificate) {
        // this.modalStore.showConfirm(
        //     `Are you sure you want to remove session from cache?`,
        //     async () => {
        //         await this.service.removeSessionFromCache({ key: key });
        //         await this.queryUtility.fetch();
        //         this.rootStore.notificationStore.success(`Successfully removed from cache`);
        //     }
        // );
        await this.rootStore.application.administration.sessionStore.removeCertificateFromOpenSession({ key: this.form.$('key').value, barcode: certificate.barcode });
        this.rootStore.notificationStore.success(`Successfully removed from cache`);
    }

    @action.bound
    async removeFromCache() {
        // this.rootStore.modalStore.showConfirm(
        //     `-Are you sure you want to remove session from cache?`,
        //     async () => {
        //         await this.service.removeSessionFromCache({ key: key });
        //         this.rootStore.notificationStore.success(`Successfully removed from cache`);
        //     }
        // );
        await this.service.removeSessionFromCache({ key: this.form.$('key').value });
        this.rootStore.notificationStore.success(`Successfully removed from cache`);
    }

    @action.bound
    async editCheck(item) {
        this.blankCertificateModal.open({
            certificate: item,
            onClick: (certificate) => {
                this.setBlankCertificate(certificate);
                this.blankCertificateModal.close();
            },
            onClose: () => {
            }
        });
    }

    @action.bound
    onNextStep1Click(language) {
        this.form.$('language').set(language);
        this.nextStep(2);
    }

    @action.bound
	setCharityId(id) {
		const charity = this.filteredCharities.find(x => x.value === id);
		this.charity = charity;
        this.queryUtility.filter.charityId = id;
		//this.setAddress(charity.item.charityAddresses[0]);
	} 
	@action.bound
	async filterCharities(inputValue) {
		const data = await this.rootStore.application.administration.grantStore.searchCharity({
			pageNumber: 1,
			pageSize: 10,
			search: inputValue,
			sort: 'name|asc',
			embed: ['charityAddresses'],
			fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable'],
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
    async onNextStep2Click() {
        if (!this.isChangedDefaultAddress) {
            const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
            this.setAddress(address);
        }
        const { isValid } = await this.form.validate({ showErrors: true });
        if (isValid) {
            const data = await this.rootStore.application.administration.sessionStore.createInitialSession(this.form.values());
            this.form.$('key').set(data.response);
            this.nextStep(3);
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
    async onNextStep4Click() {
        clearInterval(this.refreshIntervalId);
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
                if (data.certificate.denominationTypeValue === 0) {
                    this.blankCertificateModal.open({
                        certificate: data.certificate,
                        onClick: (certificate) => {
                            this.setBlankCertificate(certificate);
                            this.blankCertificateModal.close();
                        },
                        onClose: () => {
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
            const data = await this.rootStore.application.administration.sessionStore.setBlankCertificateFromOpenSession({ key: this.form.$('key').value, barcode: certificate.barcode, certificateValue: certificate.certificateValue });
            this.sessionCertificates.push(data.response);
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
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAddresses'
                        ]
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
                        const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
                        this.setAddress(address);
                    }
                },
            });
    }

    handleResponse(errorCode) {
        if (errorCode >= 4001 && errorCode <= 4010) {
            this.rootStore.notificationStore.error('ERROR_CODE.' + errorCode);
        }
        else {
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
}

export default SessionViewStore;
