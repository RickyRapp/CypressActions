import { action, observable, runInAction } from 'mobx';
import * as _ from 'lodash';
import { UserCreateForm } from 'application/administration/user/forms';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { forEach } from 'lodash';

const ErrorType = {
    User: 0,
    Profile: 1
};

@applicationContext
class UserCreateViewStore extends BaseEditViewStore {
    @observable selectedRoles = [];
    @observable isUser = false;
    @observable userDonor = null;
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
                    
                    const user = {
                        isApproved: true,
                        creationDate: new Date(),
                        userName,
                        userEmail,
                        password,
                        confirmPassword,
                        firstName,
                        lastName,
                        roles: userRoles
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
                        roles: userRoles
                    }

                    user.email = user.userEmail;
                    delete user.userEmail;
                    let response = null;
                    try {
                        console.log("UserDonor", userDonor);
                        response = await this.rootStore.application.administration.donorStore.createAccount(userDonor);
                        response = await userStore.create(user);

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
