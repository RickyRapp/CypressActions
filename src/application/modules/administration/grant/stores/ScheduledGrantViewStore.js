import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, DateRangeQueryPickerStore, BaasicDropdownStore } from 'core/stores';
import { charityFormatter } from 'core/utils';
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
                    this.charityDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
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
        this.createCharityDropdownStore();
        this.createSearchDonorDropdownStore();
        this.queryUtility.filter.done = false;
        this.reviewModal = new ModalParams({});
        this.selectDonorModal = new ModalParams({});

        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
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

    createCharityDropdownStore() {
		this.charityDropdownStore = new BaasicDropdownStore(
			{
				placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
				initFetch: false,
				filterable: true,
			},
			{
				fetchFunc: async searchQuery => {
					const data = await this.rootStore.application.donor.grantStore.searchCharity({
						pageNumber: 1,
						pageSize: 10,
						search: searchQuery,
						sort: 'name|asc',
						embed: ['charityAddresses'],
						fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary'],
					});
					return data.item.map(x => {
						return {
							id: x.id,
							name: charityFormatter.format(x, { value: 'charity-name-display' }),
						};
					});
				},
				onChange: charityId => {
					this.queryUtility.filter.charityId = charityId;
				},
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
                        type: 'date-no_utc',
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
                onEdit: (scheduledGrant) => this.routes.edit(scheduledGrant.id),
                onCancel: (scheduledGrant) => this.onCancel(scheduledGrant.id, scheduledGrant.name),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (scheduledGrant) => {
                    return !scheduledGrant.done;
                },
                onCancelRender: (scheduledGrant) => {
                    return !scheduledGrant.done;
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

    @action.bound async
    onCancel(id) {
        this.rootStore.modalStore.showConfirm('SCHEDULED_GRANT.CANCEL.QUESTION',
            async () => {
                try {
                    await this.rootStore.application.administration.grantStore.cancelScheduledGrant({ id: id });
                    this.rootStore.notificationStore.success('SCHEDULED_GRANT.CANCEL.SUCCESS');
                } catch (error) {
                    this.rootStore.notificationStore.error('SCHEDULED_GRANT.CANCEL.ERROR');
                }
                await this.queryUtility.fetch();
            }
        );
    }
}

export default ScheduledGrantViewStore;
