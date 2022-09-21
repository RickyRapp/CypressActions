import { observable, computed, runInAction } from 'mobx';
import { LoaderStore } from 'core/stores';

class UserStore {
    loaderStore = new LoaderStore();
    @observable.ref applicationUser = null;

    @computed get user() {
        return this.applicationUser;
    }

    @computed get userBalances() {
        if (!this.user) return {};

        const user = this.user.donor || this.user.charity;

        if (!user) return {};

        return {
            availableBalance: user.availableBalance,
            accountBalance: user.accountBalance,
            presentBalance: user.presentBalance
        };
    }


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @computed get resolving() {
        return this.loaderStore.loading;
    }

    async resolveUser() {
        this.loaderStore.suspend();
        const applicationUser = await this.resolveApplicationUser();
         if(document.getElementById('trengo-web-widget') && document.getElementById('trengo-web-widget').style) {
             if (!applicationUser || (applicationUser && applicationUser.roles.find(e => e === "Administrators"))) {
                 document.getElementById('trengo-web-widget').style.display = 'none';
             }
             else {
                 document.getElementById('trengo-web-widget').style.display = '';
             }
         }
        
        runInAction(() => {
            this.applicationUser = applicationUser;
            this.loaderStore.resume();
        })
    }

    removeUser() {
        const { application } = this.rootStore;

        this.applicationUser = null;
        if (application && application.baasic) {
            application.baasic.setUser(null);
        }
    }

    async resolveApplicationUser() {
        const {
            authStore,
            application: { baasic: baasicApplication, charity, donor }
        } = this.rootStore;

        let user = null;

        if (authStore.isAuthenticated) {
            const response = await baasicApplication.membershipModule.login.loadUserData({ embed: 'permissions' });
            user = {
                ...response.data,
                isApplicationUser: true,
                apiKey: baasicApplication.getApiKey()
            };
            await this.getCharityProfile(user, charity);
            await this.getDonorProfile(user, donor);
        }
        baasicApplication.setUser(user);
        return user;
    }

    async getDonorProfile(user, donor) {
        try {
            if (user.roles.includes('Users')) {
                const data = await donor.donorStore.getDonorLoginProfile(user.id);
                if (data) {
                    user.donor = {
                        accountManager: data.accountManager,
                        fundName: data.fundName,
                        accountNumber: data.accountNumber,
                        accountType: data.accountType,
                        availableBalance: data.availableBalance
                    }
                }
            }
        } catch (ex) {
            // eslint-disable-line
        }
    }

    async getCharityProfile(user, charity) {
        try {
            if (user.roles.includes('Charities')) {
                const data = await charity.charity.charityStore.getCharityLoginProfile(user.id);
                const charityApiKey = data.charityApiKey ? data.charityApiKey.apiKey : '';
                if (data) {
                    user.charityId = data.id;
                    user.charity = { 
                        name: data.name,
                        taxId: data.taxId, 
                        apiKey: charityApiKey, 
                        accountNumber: data.charityAccountNumber.accountNumber,
                        addressLine1: data.charityAddresses[0] && data.charityAddresses[0].addressLine1,
                        addressLine2: data.charityAddresses[0] && data.charityAddresses[0].addressLine2,
                        city: data.charityAddresses[0] && data.charityAddresses[0].city,
                        state: data.charityAddresses[0] && data.charityAddresses[0].state,
                        zipCode: data.charityAddresses[0] && data.charityAddresses[0].zipCode,
                        phoneNumber: data.phoneNumber,
                        accountBalance: data.accountBalance,
                        availableBalance: data.availableBalance,
                        logo: await this.rootStore.application.charity.charityStore.getCharityMedia(data.id, 'logo')
                    }; 
                }
            }
        } catch (ex) {
            // eslint-disable-line
        }
    }

    async updateCharityBalances() {
        try {
            const availableBalance = await this.rootStore.application.charity.charityStore.getCharityAvailableBalance(this.applicationUser.id);
            this.applicationUser.charity.availableBalance = availableBalance;

            const accountBalance = await this.rootStore.application.charity.charityStore.getCharityAccountBalance(this.applicationUser.id);
            this.applicationUser.charity.accountBalance = accountBalance;

            this.applicationUser = { ...this.applicationUser };
        } catch(err) {
            console.log(err);
        }
    }

    async updateDonorBalances() {
        try {
            const response = await this.rootStore.application.donor.grantStore.getDonorInformation(this.applicationUser.id);
            this.applicationUser.donor.availableBalance = response.availableBalance;
            this.applicationUser.donor.presentBalance = response.presentBalance;
            
            this.applicationUser = { ...this.applicationUser };
        } catch(err) {
            console.log(err);
        }
    }
}

export default UserStore;
