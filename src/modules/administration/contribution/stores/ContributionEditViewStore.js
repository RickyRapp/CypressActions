import { action } from 'mobx';
import { ContributionService } from "common/data";
import { ContributionEditForm } from 'modules/common/contribution/forms';
import { BaseContributionEditViewStore } from 'modules/common/contribution/stores';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class ContributionEditViewStore extends BaseContributionEditViewStore {
    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        const userId = rootStore.routerStore.routerState.params.userId;
        const id = rootStore.routerStore.routerState.params.id;

        const fields = [
            'id',
            'donorAccountId',
            'dateCreated',
            'dateUpdated',
            'amount',
            'confirmationNumber',
            'contributionStatusId',
            'paymentTypeId',
            'payerInformation',
            'payerInformation.name',
            'payerInformation.address',
            'payerInformation.address.addressLine1',
            'payerInformation.address.addressLine2',
            'payerInformation.address.city',
            'payerInformation.address.state',
            'payerInformation.address.zipCode',
            'payerInformation.emailAddress',
            'payerInformation.emailAddress.email',
            'payerInformation.phoneNumber',
            'payerInformation.phoneNumber.number',
            'donorAccount',
            'donorAccount.id',
            'donorAccount.donorName',
            'donorAccount.coreUser',
            'donorAccount.coreUser.firstName',
            'donorAccount.coreUser.lastName',
            'donorAccount.companyProfile',
            'donorAccount.companyProfile.name',
            'bankAccount',
            'bankAccount.accountNumber'
        ];

        const editViewStore = {
            name: 'contribution',
            id: id,
            actions: {
                update: async item => {
                    const response = await contributionService.update({ id: this.id, ...item });
                    this.rootStore.notificationStore.showMessageFromResponse(response);
                },
                get: async id => {
                    let params = {};
                    params.embed = ['payerInformation',
                        'payerInformation.address',
                        'payerInformation.emailAddress',
                        'payerInformation.phoneNumber',
                        'bankAccount',
                        'createdByCoreUser',
                        'donorAccount',
                        'donorAccount.coreUser',
                        'donorAccount.companyProfile',
                        'donorAccount.donorAccountAddresses',
                        'donorAccount.donorAccountAddresses.address',
                        'donorAccount.donorAccountEmailAddresses',
                        'donorAccount.donorAccountEmailAddresses.emailAddress',
                        'donorAccount.donorAccountPhoneNumbers',
                        'donorAccount.donorAccountPhoneNumbers.phoneNumber'
                    ];
                    params.fields = fields;
                    let model = await contributionService.get(id, params);
                    if (model.json && JSON.parse(model.json).paymentTypeInformations) {
                        _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                            model[key] = value;
                        });
                    }

                    this.contribution = model;
                    return this.contribution;
                }
            },
            FormClass: ContributionEditForm,
            goBack: false,
            setValues: true,
            loader: true
        }

        const config = {};
        config.editViewStore = editViewStore;
        config.userId = userId;
        config.id = id;

        super(rootStore, config);

        this.additionalActions.additionalSetFormDefaults = this.additionalSetFormDefaults;

        this.reviewModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.onAfterReview = async () => {
            this.reviewModalParams.close();
            await this.getResources(id)
            this.load();
        }
    }

    @action.bound additionalSetFormDefaults() {
        this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
    }
}

export default ContributionEditViewStore;