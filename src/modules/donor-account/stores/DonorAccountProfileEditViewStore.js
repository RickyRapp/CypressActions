import { action, runInAction, observable } from 'mobx';
import { BaseViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService, AddressService, EmailAddressService, PhoneNumberService } from "common/data";
import { DonorAccountProfileEditForm } from 'modules/donor-account/forms';
import { isSome } from 'core/utils';
import _ from 'lodash';

class DonorAccountProfileEditViewStore extends BaseViewStore {

    form = null;

    id = null;

    @observable item = null;

    changedDonorAccount = true;

    constructor(rootStore) {
        super(rootStore);

        this.name = 'donor account';
        this.id = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;
        this.form = new DonorAccountProfileEditForm({
            onSuccess: form => {
                const item = form.values();
                if (isSome(this.id)) {
                    this.fetch([
                        this.updateDonorProfile(item)
                    ]);
                }
            }
        });

        this.form.init();
        this.fetch([this.getResource(this.id)]);

        this.deliveryMethodTypeMultiSelectStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: false,
                placeholder: 'Choose Delivery Method'
            },
            {
                fetchFunc: term => {
                    return this.handleOptions('delivery-method-type');
                },
                onChange: this.onChangeDeliveryMethod
            }
        );

        this.prefixTypeMultiSelectStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Prefix Type'
            },
            {
                fetchFunc: term => {
                    return this.handleOptions('prefix-type');
                },
                onChange: this.onChangePrefixType
            },
        );
    }

    @action.bound
    async updateDonorProfile(donorAccount) {
        this.form.setFieldsDisabled(true);

        let promises = [];
        let updateText = '';

        if (this.form.$('coreUser').changed || this.form.$('fundName').changed || this.form.$('blankBookletMax').changed ||
            this.form.$('notificationLimitRemainderAmount').changed || this.changedDonorAccount) {
            const donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);

            donorAccount.coreUser.prefixTypeId = isSome(donorAccount.coreUser.prefixType) && isSome(donorAccount.coreUser.prefixType.id) ? donorAccount.coreUser.prefixType.id : null;
            donorAccount.deliveryMethodTypeId = isSome(donorAccount.deliveryMethodType) && isSome(donorAccount.deliveryMethodType.id) ? donorAccount.deliveryMethodType.id : null;

            donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });
            let donorPromise = donorAccountService.update({
                id: this.id,
                ...donorAccount
            })
            promises.push(donorPromise);
            updateText += 'donor account';
            this.changedDonorAccount = false;
        }

        if (this.form.$('donorAccountAddresses').changed) {
            let addressPromise = this.updateDonorAddresses(donorAccount.donorAccountAddresses);
            promises.push(addressPromise);
            updateText += updateText ? ', addresses' : 'addresses';
        }
        if (this.form.$('donorAccountEmailAddresses').changed) {
            let emailAddressPromise = this.updateDonorAccountEmailAddresses(donorAccount.donorAccountEmailAddresses);
            promises.push(emailAddressPromise);
            updateText += updateText ? ', email addresses' : 'email addresses';
        }
        if (this.form.$('donorAccountPhoneNumbers').changed) {
            let phoneNumberPromise = this.updateDonorAccountPhoneNumbers(donorAccount.donorAccountPhoneNumbers);
            promises.push(phoneNumberPromise);
            updateText += updateText ? ', phone numbers' : 'phone numbers';
        }

        if (promises.length > 0) {
            await this.fetch(promises);
            await this.getResource(this.id);
            this.form.setFieldsDisabled(false);
            await setTimeout(() => this.notifySuccessUpdate(updateText, { autoClose: 6000 }))
        }
        else {
            this.form.setFieldsDisabled(false);
            await setTimeout(() => this.notifySuccessWarning('Nothing to update.', { autoClose: 3000 }))
        }
    }

    @action.bound
    async updateDonorAddresses(donorAddresses) {
        const addressService = new AddressService(this.rootStore.app.baasic.apiClient);
        let form = this.form;
        let addressesToUpdate = [];
        _.forEach(donorAddresses, function (value, key) {
            if (isSome(value.id) && value.id !== "" && form.$(`donorAccountAddresses[${key}]`).changed) {
                addressesToUpdate.push(value.address);
            }
        });

        if (addressesToUpdate.length > 0) {
            await addressService.updateCollection({ id: this.id }, addressesToUpdate);
        };

        let addressesToInsert = [];
        _.forEach(donorAddresses, function (value) {
            if (!isSome(value.id) || value.id === "") {
                addressesToInsert.push(value.address);
            }
        });

        if (addressesToInsert.length > 0) {
            await addressService.createCollection({ id: this.id }, addressesToInsert);
        }
    }

    @action.bound
    async updateDonorAccountEmailAddresses(donorEmailAddresses) {
        const emailAddressService = new EmailAddressService(this.rootStore.app.baasic.apiClient);
        let form = this.form;
        let emailAddressesToUpdate = [];
        _.forEach(donorEmailAddresses, function (value, key) {
            if (isSome(value.id) && value.id !== "" && form.$(`donorAccountEmailAddresses[${key}]`).changed) {
                emailAddressesToUpdate.push(value.emailAddress);
            }
        });

        if (emailAddressesToUpdate.length > 0) {
            await emailAddressService.updateCollection({ id: this.id }, emailAddressesToUpdate);
        };

        let emailAddressesToInsert = [];
        _.forEach(donorEmailAddresses, function (value) {
            if (!isSome(value.id) || value.id === "") {
                emailAddressesToInsert.push(value.emailAddress);
            }
        });

        if (emailAddressesToInsert.length > 0) {
            await emailAddressService.createCollection({ id: this.id }, emailAddressesToInsert);
        }
    }

    @action.bound
    async updateDonorAccountPhoneNumbers(donorPhoneNumbers) {
        const phoneNumberService = new PhoneNumberService(this.rootStore.app.baasic.apiClient);
        let form = this.form;
        let phoneNumbersToUpdate = [];
        _.forEach(donorPhoneNumbers, function (value, key) {
            if (isSome(value.id) && value.id !== "" && form.$(`donorAccountPhoneNumbers[${key}]`).changed) {
                phoneNumbersToUpdate.push(value.phoneNumber);
            }
        });

        if (phoneNumbersToUpdate.length > 0) {
            await phoneNumberService.updateCollection({ id: this.id }, phoneNumbersToUpdate);
        };

        let phoneNumbersToInsert = [];
        _.forEach(donorPhoneNumbers, function (value) {
            if (!isSome(value.id) || value.id === "") {
                phoneNumbersToInsert.push(value.phoneNumber);
            }
        });

        if (phoneNumbersToInsert.length > 0) {
            await phoneNumberService.createCollection({ id: this.id }, phoneNumbersToInsert);
        }
    }


    @action.bound
    async getResource(id, updateForm = true) {
        let params = {};
        params.embed = ['coreUser,deliveryMethodType,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers'];
        const donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        const response = await donorAccountService.get(id, params);
        if (isSome(response)) {
            if (isSome(response.coreUser) && isSome(response.coreUser.json)) {
                response.coreUser.middleName = (JSON.parse(response.coreUser.json)).middleName;
                response.coreUser.prefixTypeId = (JSON.parse(response.coreUser.json)).prefixTypeId;
                if (isSome(response.coreUser.prefixTypeId)) {
                    let lookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'prefix-type')
                    let models = await lookupService.getAll();
                    response.coreUser.prefixType = _.find(models.data, { id: response.coreUser.prefixTypeId });
                }
            }

            response.donorAccountAddresses = _.orderBy(response.donorAccountAddresses, ['primary', 'dateCreated'], ['desc', 'asc']);
            response.donorAccountEmailAddresses = _.orderBy(response.donorAccountEmailAddresses, ['primary', 'dateCreated'], ['desc', 'asc']);
            response.donorAccountPhoneNumbers = _.orderBy(response.donorAccountPhoneNumbers, ['primary', 'dateCreated'], ['desc', 'asc']);
        }

        runInAction(() => {
            this.item = response;

            if (updateForm) {
                this.updateForm();
            }
        });
    }

    @action.bound
    updateForm() {
        if (this.item) {
            this.form.update(this.item);
        }
    }

    @action.bound
    notifySuccessCreate(name, options) {
        this.rootStore.notificationStore.success(
            `Successfully created ${_.toLower(name)}.`,
            options
        );
    }

    @action.bound
    notifySuccessUpdate(name, options) {
        this.rootStore.notificationStore.success(
            `Successfully updated ${_.toLower(name)}.`,
            options
        );
    }

    @action.bound
    notifySuccessWarning(name, options) {
        this.rootStore.notificationStore.warning(
            `${name}`,
            options
        );
    }

    @action.bound async onChangeDeliveryMethod(option) {
        this.item.deliveryMethodType = option;
        this.form.update(this.item);
        this.changedDonorAccount = true;
    }

    @action.bound async onChangePrefixType(option) {
        this.item.coreUser.prefixType = option;
        this.form.update(this.item);
        this.changedDonorAccount = true;
    }

    @action.bound async handleOptions(lookupType) {
        let lookupService = new LookupService(this.rootStore.app.baasic.apiClient, lookupType)
        let models = await lookupService.getAll();
        return models.data;
    }

    @action.bound async onChangePrimaryAddress(changedDonorAccountAddress, event) {
        if (event.currentTarget.checked) {
            await Promise.all(this.item.donorAccountAddresses.map(async (donorAccountAddress) => {
                if (donorAccountAddress.id === changedDonorAccountAddress.id) {
                    donorAccountAddress.primary = true;
                }
                else {
                    donorAccountAddress.primary = false;
                }
                this.form.update(this.item);
            }))
            const addressService = new AddressService(this.rootStore.app.baasic.apiClient);
            await addressService.updateDonorAccountAddresses(this.item.donorAccountAddresses);
            await this.getResource(this.id);
            await setTimeout(() => this.notifySuccessUpdate("primary address", { autoClose: 4000 }));
        }
    }

    @action.bound async onChangePrimaryEmailAddress(changedDonorAccountEmailAddress, event) {
        if (event.currentTarget.checked) {
            await Promise.all(this.item.donorAccountEmailAddresses.map(async (donorAccountEmailAddress) => {
                if (donorAccountEmailAddress.id === changedDonorAccountEmailAddress.id) {
                    donorAccountEmailAddress.primary = true;
                }
                else {
                    donorAccountEmailAddress.primary = false;
                }
                this.form.update(this.item);
            }))
            const emailAddressService = new EmailAddressService(this.rootStore.app.baasic.apiClient);
            await emailAddressService.updateDonorAccountEmailAddresses(this.item.donorAccountEmailAddresses);
            await this.getResource(this.id);
            await setTimeout(() => this.notifySuccessUpdate("primary email address", { autoClose: 4000 }));
        }
    }

    @action.bound async onChangePrimaryPhoneNumber(changedDonorAccountPhoneNumber, event) {
        if (event.currentTarget.checked) {
            await Promise.all(this.item.donorAccountPhoneNumbers.map(async (donorAccountPhoneNumber) => {
                if (donorAccountPhoneNumber.id === changedDonorAccountPhoneNumber.id) {
                    donorAccountPhoneNumber.primary = true;
                }
                else {
                    donorAccountPhoneNumber.primary = false;
                }
                this.form.update(this.item);
            }))
            const phoneNumberService = new PhoneNumberService(this.rootStore.app.baasic.apiClient);
            await phoneNumberService.updateDonorAccountPhoneNumbers(this.item.donorAccountPhoneNumbers);
            await this.getResource(this.id);
            await setTimeout(() => this.notifySuccessUpdate("primary phone number", { autoClose: 4000 }));
        }
    }
}

export default DonorAccountProfileEditViewStore;