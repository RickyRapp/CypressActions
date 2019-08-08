import { action, observable } from 'mobx';
import { ContributionService, DonorAccountService } from "common/data";
import { ContributionListFilter } from 'modules/administration/contribution/models';
import { BaseContributionListViewStore } from 'modules/common/contribution/stores';
import { BaasicDropdownStore } from "core/stores";
import { ModalParams } from 'core/models';
import { getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import _ from 'lodash';

class ContributionListViewStore extends BaseContributionListViewStore {
    @observable contributionId = null;
    @observable donorAccountSearchDropdownStore = null;

    fields = [
        'id',
        'donorAccountId',
        'dateUpdated',
        'amount',
        'confirmationNumber',
        'contributionStatus',
        'contributionStatus.name',
        'contributionStatus.abrv',
        'paymentType',
        'paymentType.name',
        'paymentType.abrv',
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
        'payerInformation',
        'payerInformation.name',
        'createdByCoreUser',
        'createdByCoreUser.userId',
        'createdByCoreUser.firstName',
        'createdByCoreUser.lastName'
    ]

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
                    params.embed = [
                        'donorAccount',
                        'donorAccount.coreUser',
                        'donorAccount.companyProfile',
                        'payerInformation',
                        'bankAccount',
                        'createdByCoreUser',
                        'paymentType',
                        'contributionStatus'
                    ];
                    params.fields = this.fields;
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
                key: 'donorAccount.donorName',
                title: 'DONORNAME',
                onClick: item => this.routes.donorAccountEdit(item.donorAccountId)
            },
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'confirmationNumber',
                title: 'CONFIRMATIONNUMBER',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'contributionStatus.name',
                title: 'STATUS'
            },
            {
                key: 'paymentType.name',
                title: 'PAYMENTTYPE',
                type: 'function',
                function: this.renderPaymentType
            },
            {
                key: 'payerInformation.name',
                title: 'PAYERNAME',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'function',
                function: (item) => item.createdByCoreUser ?
                    (item.createdByCoreUser.userId === item.donorAccountId ? item.donorAccount.donorName : `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}`)
                    :
                    'System'
            },
            {
                key: 'dateUpdated',
                title: 'DATEUPDATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
        ];

        this.setActions = {
            onEdit: (contribution) => this.routes.edit(contribution.donorAccountId, contribution.id),
            onReview: (contribution) => { this.contributionId = contribution.id; this.reviewModalParams.open(); }
        }

        this.setRenderActions = {
            renderEdit: (item) => item.contributionStatus.abrv === 'pending' || item.paymentType.abrv === 'in-process',
            renderReview: (item) => item.contributionStatus.abrv === 'pending' || item.paymentType.abrv === 'in-process' || item.paymentType.abrv === 'funded'
        }
    }

    setStores() {
        super.setStores();
        this.setAdditionalStores();
    }

    @action.bound renderPaymentType = (item) => {
        debugger;
        if (item.paymentType.abrv === 'ach' || item.paymentType.abrv === 'wire-transfer') {
            return `${item.paymentType.name}${item.bankAccount !== null ? ' ...' + item.bankAccount.accountNumber : ''}`;
        }
        else
            return item.paymentType.name;
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
                    let options = getDonorAccountDropdownOptions;

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
            let params = getDonorAccountDropdownOptions;
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }
}


export default ContributionListViewStore;