import { action } from 'mobx';
import { DonorAccountService } from 'common/data';

export default class RegisterStore {
  moduleStore;

  constructor(moduleStore) {
    this.moduleStore = moduleStore;
    this.rootStore = moduleStore.rootStore;
  }

  @action async register({ username, email, password, confirmPassword }) {
    const baasicApp = this.moduleStore.rootStore.app.baasic;

    const activationUrl = `${window.location.origin}/account-activation?activationToken={activationToken}`;
    await baasicApp.membershipModule.register.create({
      username,
      email,
      password,
      confirmPassword,
      activationUrl
    });
  }

  @action.bound async activate(activationToken) {
    const baasicApp = this.moduleStore.rootStore.app.baasic;
    await baasicApp.membershipModule.register.activate(activationToken);
  }

  @action async registerPublic(model) {
    console.log(model);
    const donorAccountService = new DonorAccountService(this.moduleStore.rootStore.app.baasic.apiClient);
    model.activationUrl = `${window.location.origin}/account-activation?activationToken={activationToken}`;
    model.accountTypeId = 'f0e138ae-9daa-1e41-41c9-254051e7d981';
    let postModel = {
      fundName: model.fundName,
      accountTypeId: model.accountTypeId,
      activationUrl: model.activationUrl,
      coreUser: {
        username: model.email,
        firstName: model.firstName,
        json: model.middleName,
        lastName: model.lastName,
        coreMembership: { email: model.email, password: model.password, confirmPassword: model.confirmPassword }
      },
      donorAccountAddresses: [
        {
          address: {
            addressLine1: model.addressLine1,
            addressLine2: model.addressLine2,
            city: model.city,
            state: model.state,
            zipCode: model.zipCode
          }
        }
      ],
      donorAccountEmailAddresses: [{ emailAddress: { email: model.email } }],
      donorAccountPhoneNumbers: [{ phoneNumber: { number: model.number, description: model.numberDescription } }]
    };
    await donorAccountService.create(postModel);
  }
}
