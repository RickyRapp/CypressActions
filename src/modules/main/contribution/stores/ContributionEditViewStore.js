import { action } from 'mobx';
import { ContributionService } from "common/data";
import { ContributionEditForm } from 'modules/common/contribution/forms';
import { BaseContributionEditViewStore } from 'modules/common/contribution/stores';
import moment from 'moment';
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
            'json',
            'confirmationNumber',
            'contributionStatus',
            'contributionStatus.name',
            'contributionStatus.abrv',
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
            'bankAccount.accountNumber',
            'createdByCoreUser',
            'createdByCoreUser.userId',
            'createdByCoreUser.firstName',
            'createdByCoreUser.lastName'
        ];

        const editViewStore = {
            name: 'contribution',
            id: id,
            actions: {
                update: async item => {
                    return await contributionService.update({ id: this.id, ...item });
                },
                get: async id => {
                    let params = {};
                    params.embed = [
                        'contributionStatus',
                        'payerInformation',
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
            goBack: true,
            setValues: true,
            loader: true
        }

        const config = {};
        config.editViewStore = editViewStore;
        config.userId = userId;
        config.id = id;

        super(rootStore, config);

        this.additionalActions.additionalValidateBeforeEditing = this.additionalValidateBeforeEditing;
        this.additionalActions.additionalSetFormDefaults = this.additionalSetFormDefaults;
        this.rootStore = rootStore;
    }

    @action.bound additionalValidateBeforeEditing() {
        if (moment().local().isAfter(moment.utc(this.contribution.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'))) {
            this.rootStore.notificationStore.warning('Time Expired For Editing.', 6000);
            this.rootStore.routerStore.navigate('master.app.main.contribution.list');
            return;
        }

        if (this.contribution.contributionStatus.abrv !== 'pending') {
            this.rootStore.notificationStore.warning('Contribution Can Ber Edited Only In Pending Status.');
            this.rootStore.routerStore.navigate('master.app.main.contribution.list');
            return;
        }
    }

    @action.bound additionalSetFormDefaults() {
        this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.contribution.donorAccount.initialContribution ? this.contribution.donorAccount.contributionMinimumAdditional : this.contribution.donorAccount.contributionMinimumInitial}`);
    }
}

export default ContributionEditViewStore;
