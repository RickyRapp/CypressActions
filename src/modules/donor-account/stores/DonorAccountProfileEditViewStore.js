import { action, runInAction, observable } from 'mobx';
import { BaseViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService, AddressService, EmailAddressService, PhoneNumberService } from "common/data";
import { DonorAccountProfileEditForm } from 'modules/donor-account/forms';
import { isSome } from 'core/utils';
import _ from 'lodash';

class DonorAccountProfileEditViewStore extends BaseViewStore {

    form = null;

    name = null;

    id = null;

    @observable item = null;

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
        if (isSome(donorAccount.coreUser.prefixType)) {
            donorAccount.coreUser.prefixTypeId = donorAccount.coreUser.prefixType.id;
        }

        donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });

        if (isSome(donorAccount.deliveryMethodType)) {
            donorAccount.deliveryMethodTypeId = donorAccount.deliveryMethodType.id;
        }

        const donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        await donorAccountService.update({
            id: this.id,
            ...donorAccount
        })

        let reloadAddresses = await this.updateDonorAddresses(donorAccount.donorAccountAddresses);
        let reloadEmailAddresses = await this.updateDonorAccountEmailAddresses(donorAccount.donorAccountEmailAddresses);
        let reloadPhoneNumbers = await this.updateDonorAccountPhoneNumbers(donorAccount.donorAccountPhoneNumbers);

        if (reloadAddresses || reloadEmailAddresses || reloadPhoneNumbers) {
            await this.getResource(this.id);
        }

        this.form.setFieldsDisabled(false);
        await setTimeout(() => this.notifySuccessUpdate(this.name, { autoClose: 10000 }))
    }

    @action.bound
    async updateDonorAddresses(donorAddresses) {
        const addressService = new AddressService(this.rootStore.app.baasic.apiClient);
        let donorAddressesToUpdate = _.filter(donorAddresses, function (x) {
            return isSome(x.id) && x.id !== "";
        });

        let addressesToUpdate = _.map(donorAddressesToUpdate, function (x) {
            return x.address;
        })

        if (addressesToUpdate.length > 0) {
            await addressService.updateCollection({ id: this.id }, addressesToUpdate);
        };

        let donorAddressesToInsert = _.filter(donorAddresses, function (x) {
            return !isSome(x.id) || x.id === "";
        });

        let addressesToInsert = _.map(donorAddressesToInsert, function (x) {
            return x.address;
        })

        if (addressesToInsert.length > 0) {
            await addressService.createCollection({ id: this.id }, addressesToInsert);
            return true;
        }
    }

    @action.bound
    async updateDonorAccountEmailAddresses(donorEmailAddresses) {
        const emailAddressService = new EmailAddressService(this.rootStore.app.baasic.apiClient);
        let donorEmailAddressesToUpdate = _.filter(donorEmailAddresses, function (x) {
            return isSome(x.id) && x.id !== "";
        });

        let emailAddressesToUpdate = _.map(donorEmailAddressesToUpdate, function (x) {
            return x.emailAddress;
        })

        if (emailAddressesToUpdate.length > 0) {
            await emailAddressService.updateCollection({ id: this.id }, emailAddressesToUpdate);
        };

        let donorEmailAddressesToInsert = _.filter(donorEmailAddresses, function (x) {
            return !isSome(x.id) || x.id === "";
        });

        let emailAddressesToInsert = _.map(donorEmailAddressesToInsert, function (x) {
            return x.emailAddress;
        })

        if (emailAddressesToInsert.length > 0) {
            await emailAddressService.createCollection({ id: this.id }, emailAddressesToInsert);
            return true;
        }
    }

    @action.bound
    async updateDonorAccountPhoneNumbers(donorPhoneNumbers) {
        const phoneNumberService = new PhoneNumberService(this.rootStore.app.baasic.apiClient);
        let donorPhoneNumbersToUpdate = _.filter(donorPhoneNumbers, function (x) {
            return isSome(x.id) && x.id !== "";
        });

        let phoneNumbersToUpdate = _.map(donorPhoneNumbersToUpdate, function (x) {
            return x.phoneNumber;
        })

        if (phoneNumbersToUpdate.length > 0) {
            await phoneNumberService.updateCollection({ id: this.id }, phoneNumbersToUpdate);
        };

        let donorPhoneNumbersToInsert = _.filter(donorPhoneNumbers, function (x) {
            return !isSome(x.id) || x.id === "";
        });

        let phoneNumbersToInsert = _.map(donorPhoneNumbersToInsert, function (x) {
            return x.phoneNumber;
        })

        if (phoneNumbersToInsert.length > 0) {
            await phoneNumberService.createCollection({ id: this.id }, phoneNumbersToInsert);
            return true;
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

    @action.bound async onChangeDeliveryMethod(option) {
        this.item.deliveryMethodType = option;
        this.form.update(this.item);
    }

    @action.bound async onChangePrefixType(option) {
        this.item.coreUser.prefixType = option;
        this.form.update(this.item);
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