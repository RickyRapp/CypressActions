import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { CreditDebitListFilter } from 'application/administration/credit-debit/models';

class CreditDebitViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'credit-debit',
            authorization: 'theDonorsFundCreditDebitSection',
            routes: {
                create: () => {
                    this.openSelectDonorModal();
                }
            },
            queryConfig: {
                filter: new CreditDebitListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.dateCreatedDateRangeQueryStore.reset();
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'donor',
                            'coreUser',
                            'charity'
                        ];

                        params.fields = [
                            'id',
                            'donorId',
                            'dateCreated',
                            'amount',
                            'donor',
                            'description',
                            'coreUser',
                            'userId',
                            'charity',
                            'charityId'
                        ];
                        return this.rootStore.application.administration.creditDebitStore.findCreditDebit(params);
                    }
                }
            }
        });

        this.createTableStore()
        this.createDonorSearchDropdownStore();
        this.createSelectDonorModal();
        this.createDateCreatedDateRangeQueryStore();
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.credit-debit.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.credit-debit.create', { id: donorId })
            });
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.administration.credit-debit.create', { id: donorId })
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'CREDIT_DEBIT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    format: {
                        type: 'function',
                        value: (val) =>  {
                            if(val.donorId) {
                                return val.donor.donorName;
                            } 
                            return val.charity.name;
                        }
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'CREDIT_DEBIT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'amount',
                    title: 'CREDIT_DEBIT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'description',
                    title: 'CREDIT_DEBIT.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'coreUser',
                    title: 'CREDIT_DEBIT.LIST.COLUMNS.CREATED_BY_CORE_USER_LABEL',
                    format: {
                        type: 'created-by',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }

    createDonorSearchDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: true,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses',
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (this.rootStore.routerStore.routerState.queryParams && this.rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = this.rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses',
                            ]
                        }
                        const data = await this.rootStore.application.administration.donorStore.getDonor(id, params);
                        return { id: data.id, name: donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' }) };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter.donorId = donorId;
                }
            });
    }

    createSelectDonorModal() {
        this.selectDonorModal = new ModalParams({});
    }

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }
}

export default CreditDebitViewStore;
