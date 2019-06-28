import { action, observable } from 'mobx';
import { ContributionService, DonorAccountService } from "common/data";
import { ContributionListFilter } from 'modules/administration/contribution/models';
import { BaseContributionListViewStore } from 'modules/common/contribution/stores';
import { BaasicDropdownStore } from "core/stores";
import { ModalParams } from 'core/models';
import { getDonorNameDropdown } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';

class ContributionListViewStore extends BaseContributionListViewStore {
    @observable contributionId = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);

        let filter = new ContributionListFilter();
        filter.donorAccountId = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donorAccountId : null;

        const listViewStore = {
            name: 'contribution',
            routes: {
                edit: (donorAccountId, contributionId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.contribution.edit', {
                        userId: donorAccountId,
                        id: contributionId
                    }),
                create: () => {
                    this.findDonorModalParams.open();
                },
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'donorAccount,coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        }

        const config = {
            listViewStore: listViewStore,
            setSelectedExportColumnsName: [],
            setAdditionalExportColumnsName: []
        }

        super(rootStore, config);

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.contributionService = contributionService;

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewModalParams = new ModalParams({
            onClose: () => { this.contributionId = null; this.onClose }
        });

        this.setColumns = [
            {
                key: 'donorAccount.coreUser',
                title: 'Donor Name',
                type: 'function',
                function: (item) => `${item.donorAccount.coreUser.firstName} ${item.donorAccount.coreUser.lastName}`,
                onClick: item => this.routes.donorAccountEdit(item.donorAccountId)
            },
            {
                key: 'amount',
                title: 'Amount',
                type: 'currency'
            },
            {
                key: 'confirmationNumber',
                title: 'Conf. Number'
            },
            {
                key: 'contributionStatusId',
                title: 'Status',
                type: 'function',
                function: (item) => _.find(this.contributionStatuses, { id: item.contributionStatusId }).name
            },
            {
                key: 'paymentTypeId',
                title: 'Payment Type',
                type: 'function',
                function: this.renderPaymentType
            },
            {
                key: 'payerInformation',
                title: 'Payer Name',
                type: 'function',
                function: (item) => `${item.payerInformation.firstName} ${item.payerInformation.lastName}`
            },
            {
                key: 'createdByCoreUser',
                title: 'Created By',
                type: 'function',
                function: (item) => item.createdByCoreUser ? `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` : 'System'
            },
            {
                key: 'dateUpdated',
                title: 'Date Updated',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
        ];

        this.setActions = {
            onEdit: (contribution) => this.routes.edit(contribution.donorAccountId, contribution.id),
            onReview: (contribution) => { this.contributionId = contribution.id; this.reviewModalParams.open(); }
        }

        this.setRenderActions = {
            renderEdit: this.renderEdit,
            renderReview: this.renderReview
        }
    }

    setStores() {
        super.setStores();
        this.setAdditionalStores();
    }

    @action.bound renderEdit(contribution) {
        let availableStatuesForEdit = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' }), function (o) { return o.id });
        return _.some(availableStatuesForEdit, (item) => { return item === contribution.contributionStatusId });
    }

    @action.bound renderPaymentType = (item) => {
        if (item.paymentTypeId === _.find(this.paymentTypes, { abrv: 'ach' }).id || item.paymentTypeId === _.find(this.paymentTypes, { abrv: 'wire-transfer' }).id) {
            return `${_.find(this.paymentTypes, { id: item.paymentTypeId }).name}${item.bankAccount !== null ? ' ...' + item.bankAccount.accountNumber : ''}`;
        }
        else
            return _.find(this.paymentTypes, { id: item.paymentTypeId }).name;
    }

    @action.bound renderReview(contribution) {
        let availableStatuesForReview = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' || x.abrv === 'funded' }), function (o) { return o.id });
        return _.some(availableStatuesForReview, (item) => { return item === contribution.contributionStatusId });
    }

    @action.bound async onAfterReview() {
        this.queryUtility._reloadCollection();
        this.reviewModalParams.close();
        this.contributionId = null;
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.administration.contribution.create', {
                userId: option.id
            })
        }
    }

    @action.bound async setAdditionalStores() {
        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address,companyProfile' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.donorAccountId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.donorAccountId) {
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }
}


export default ContributionListViewStore;