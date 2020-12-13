import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { ScheduledGrantListFilter } from 'application/administration/grant/models';
import moment from 'moment';

class ScheduledGrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'scheduled-grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                create: () => {
                    this.openSelectDonorModal();
                },
                edit: (editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.scheduled-edit', { id: editId });
                },
                scheduledGrantsList: (name) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.tab', null, { tab: 1, name: name });
                }
            },
            queryConfig: {
                filter: new ScheduledGrantListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'donor',
                            'charity',
                            'grantScheduleType'
                        ];
                        params.fields = [
                            'id',
                            'charity',
                            'charity.name',
                            'donor',
                            'amount',
                            'grantScheduleType',
                            'dateCreated',
                            'startFutureDate',
                            'nextDate',
                            'done',
                            'endDate',
                            'noEndDate',
                            'numberOfPayments',
                            'remainingNumberOfPayments'
                        ]

                        return rootStore.application.administration.grantStore.findScheduledGrant(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createSearchDonorDropdownStore();
        this.reviewModal = new ModalParams({});
        this.selectDonorModal = new ModalParams({});
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId })
            }
        );
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                },
                {
                    key: 'charity.name',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'amount',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'grantScheduleType.name',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.GRANT_SCHEDULE_TYPE_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderGrantScheduleType
                    }
                },
                {
                    key: 'nextDate',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.NEXT_DATE_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'done',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.DONE_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (grant) => this.routes.edit(grant.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (grant) => {
                    return !grant.done;
                }
            }
        }));
    }

    createSearchDonorDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'SCHEDULED_GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
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
                            'firstName',
                            'lastName',
                            'securityPin',
                            'donorAddresses'
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
                                'firstName',
                                'lastName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const data = await this.rootStore.application.administration.grantStore.getDonor(id, params);
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

    renderGrantScheduleType(item) {
        let base = item.grantScheduleType.name;

        if (item.grantScheduleType.abrv === 'one-time') {
            return base;
        }
        else if (item.grantScheduleType.abrv === 'monthly' || item.grantScheduleType.abrv === 'annual') {
            let scheduleTypeDescription = null;
            if (item.endDate) {
                scheduleTypeDescription = `End Date: ${moment(item.endDate).format('YYYY-MM-DD')}`;
            }
            else if (item.noEndDate === true) {
                scheduleTypeDescription = 'Ongoing';
            }
            else {
                scheduleTypeDescription = `Number Of Payments: ${item.numberOfPayments - item.remainingNumberOfPayments}/${item.numberOfPayments}`;
            }
            return `${base} - ${scheduleTypeDescription}`;
        }

        return base;
    }
}

export default ScheduledGrantViewStore;
