import { action, observable, runInAction } from 'mobx';
import * as _ from 'lodash';
import { UserCreateForm } from 'application/administration/user/forms';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { forEach } from 'lodash';
import { BaasicInput } from 'core/components';
import { t } from 'i18next';
import classNames from 'classnames';
import React from 'react';
const ErrorType = {
    User: 0,
    Profile: 1
};

@applicationContext
class UserCreateViewStore extends BaseEditViewStore {
    @observable selectedRoles = [];
    @observable isUser = false;
    @observable userDonor = null;
    @observable isExistingFundName;
    @observable isExistingUserName;
    roleMultiselectStore = null;
    titleDropdownStore = null;
    languageDropdownStore = null;
    constructor(rootStore) {
        super(rootStore, {
            name: 'user',
            id: undefined,

            actions: {
                create: async () => {
                    const userStore = rootStore.application.baasic.membershipModule.user;
                    const userProfileStore = rootStore.application.baasic.userProfileModule.profile;
                    const { roles, userName, userEmail, password, confirmPassword, firstName, lastName, fundName, addressLine1, addressLine2, city, state, zip, phoneNumber, securityPin, confirmSecurityPin, isThisABussinessAccount, isPrivateClientSuite, ...userProfile } = this.form.values();

                    const userRoles = _.map(roles, (r) => {
                        return {
                            name: r.name
                        }
                    });
                    const address =
                    {
                        addressLine1: addressLine1,
                        addressLine2: addressLine2,
                        city: city,
                        zipCode: zip,
                        state: state
                    };

                    const email = { email: userEmail }
                    const phone = { number: phoneNumber };
                    const coreMembership = { password: password, confirmPassword: confirmPassword }

                    const user = {
                        isApproved: true,
                        creationDate: new Date(),
                        userName,
                        userEmail,
                        password,
                        confirmPassword,
                        firstName,
                        lastName,
                        roles: userRoles,
                        coreMembership: coreMembership
                    };
                    const userDonor = {
                        isApproved: true,
                        creationDate: new Date(),
                        userName,
                        userEmail,
                        password,
                        confirmPassword,
                        firstName,
                        lastName,
                        fundName,
                        addressLine1,
                        addressLine2,
                        isPrivateClientSuite,
                        isThisABussinessAccount,
                        zip,
                        city,
                        state,
                        securityPin,
                        confirmSecurityPin,
                        phoneNumber,
                        roles: userRoles,
                    }
                    userDonor.emailAddress = email;
                    userDonor.address = address;
                    userDonor.phoneNumber = phone;
                    user.email = user.userEmail;
                    delete user.userEmail;
                    let response = null;

                    try {
                        userRoles.forEach(async (userRole) => {
                            if (userRole.name === 'Users') {
                                user.userName = user.email;
                                userDonor.coreUser = user;
                                response = await this.rootStore.application.administration.donorStore.createAccount(userDonor);
                            }
                            else {
                                response = await userStore.create(user);
                            }
                        })

                    } catch (err) {
                        this.form.invalidate(err.data);
                        // propagate to base edit view store. Will trigger onCreateError
                        throw { type: ErrorType.User, error: err };
                    }
                    if (response) {
                        try {
                            await userProfileStore.update({
                                id: response.data.id,
                                ...userProfile
                            });
                        }
                        catch (err) {
                            this.form.invalidate(err.data);
                            throw { type: ErrorType.Profile, error: err };
                        }
                    }
                }
            },
            errorActions: {
                onCreateError: ({ type, error }) => {
                    switch (type) {
                        case ErrorType.User:
                            rootStore.notificationStore.error('USER.CREATE.USER_CREATE_ERROR', error);
                            break;
                        case ErrorType.Profile:
                            rootStore.notificationStore.error('USER.CREATE.PROFILE_CREATE_ERROR', error);
                            break;
                        default:
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: UserCreateForm
        });

        this.roleMultiselectStore = new BaasicDropdownStore({
            multi: true
        },
            {
                onChange: (e) => {
                    e.forEach((item) => {
                        if (item.name === 'Users') {
                            this.validateForm();
                            this.isUser = true;
                        }
                        else {
                            this.isUser = false;
                        }
                    })

                }
            });
        // fetchFunc: async () => {
        //     const response = await this.rootStore.application.baasic.membershipModule.lookups.get({ embed: 'role', rpp: 30 });
        //     return response.data.role;
        // }

        this.titleDropdownStore = new BaasicDropdownStore(null, null, [
            { name: 'Mr.', id: 'Mr.' },
            { name: 'Miss/Mrs.', id: 'Miss/Mrs.' }
        ]);
    }

    @action.bound
    async checkIfDuplicated(e) {
        var params = { fundName: e }
        var fundname = await this.rootStore.application.donor.donorStore.findDonor(params);
        if (fundname != null) {
            this.isExistingFundName = true;
        }
        else
            this.isExistingFundName = false;
    }

    @action.bound
    async checkIfUserName(e) {
        var params = { userName: e }
        var user = await this.rootStore.application.donor.donorStore.findDonor(params);
        if (user != null) {
            this.isExistingUserName = true;
        }
        else
            this.isExistingUserName = false;
    }

    @action.bound
    validateForm() {
        this.form.$('fundName').set('rules', 'required|string|min:1|max:40');
        this.form.$('addressLine1').set('rules', 'required|string|min:1|max:40');
        this.form.$('city').set('rules', 'required|string|min:1|max:40');
        this.form.$('state').set('rules', 'required|string|min:1|max:40');
        this.form.$('zip').set('rules', 'required|string|min:1|max:40');
        this.form.$('phoneNumber').set('rules', 'required|string');
        this.form.$('securityPin').set('rules', 'required|string|digits:4');
    }

    @action.bound
    notifySuccessCreate() {
        this.rootStore.notificationStore.success('USER.CREATE.USER_CREATE_SUCCESS');
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.user.list'
            )
        }
        else {
            this.form.clear();
            // instantiate new shop service when application changes                        
            // load roles for application
            await this.fetchRoles();
        }
    }

    @action.bound
    async fetchRoles() {
        this.roleMultiselectStore.setLoading(true);
        const response = await this.rootStore.application.baasic.membershipModule.lookups.get({ embed: 'role', rpp: 30 });

        runInAction(() => {
            this.roleMultiselectStore.setItems(response.data.role);
            this.roleMultiselectStore.setLoading(false);
        });
    }
}

export default UserCreateViewStore;
