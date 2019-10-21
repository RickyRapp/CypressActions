import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantService } from 'application/grant/services';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/grant/models';
import _ from 'lodash';

@applicationContext
class GrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.grant.edit',
                        {
                            id: id,
                            editId: editId
                        }
                    );
                },
                create: () => {
                    if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.openSelectDonorModal();
                    }
                    else {
                        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: this.rootStore.userStore.applicationUser.id });
                    }
                }
            },
            queryConfig: {
                filter: new GrantListFilter('dateCreated', 'desc')
            },
            actions: () => {
                const service = new GrantService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donation',
                            'donation.donationStatus',
                            'donation.charity',
                            'grantPurposeType',
                            'createdByCoreUser',
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile',
                            'grantStatus'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorAccount.donorName',
                    title: 'GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'donation.charity.name',
                    title: 'GRANT.LIST.COLUMNS.DONATION_CHARITY_LABEL',
                },
                {
                    key: 'amount',
                    title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'GRANT.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'grantStatus.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_STATUS_NAME_LABEL',
                },
                {
                    key: 'grantPurposeType.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_PURPOSE_TYPE_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (grant) => this.routes.edit(grant.donorAccountId, grant.id),
                onReview: (grantId) => this.openReviewDonorModal(grantId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        this.selectDonorModal = new ModalParams({});
        this.reviewModal = new ModalParams({});

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.SELECT_DONOR',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'coreUser',
                            'companyProfile',
                            'donorAccountAddresses',
                            'donorAccountAddresses.address'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.donorName } });
                },
                onChange: (donorAccountId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId })
                }
            });
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open({ donorAccountId: this.queryUtility.filter.donorAccountId });
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }
}

export default GrantViewStore;
