import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, DateRangeQueryPickerStore, BaasicDropdownStore } from 'core/stores';
import { charityFormatter } from 'core/utils';
import { ScheduledGrantListFilter } from 'application/donor/activity/grant/models';
import moment from 'moment'

class ScheduledGrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'scheduled-grant',
            authorization: 'theDonorsFundDonationSection',
            routes: {
                edit: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.grant.scheduled-edit', { id: id });
                },
                preview: (editId) => {
					this.rootStore.routerStore.goTo('master.app.main.donor.grant.scheduled-preview', { id: editId });
				}
            },
            queryConfig: {
                filter: new ScheduledGrantListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.charityDropdownStore.setValue(null);
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

                        return rootStore.application.donor.grantStore.findScheduledGrant({ donorId: this.donorId, ...params });
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.createTableStore();
        this.createCharityDropdownStore();

        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
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
                onPreview: (scheduledGrant) => this.routes.preview(scheduledGrant.id),
                onEdit: (scheduledGrant) => this.routes.edit(scheduledGrant.id),
                onCancel: (scheduledGrant) => this.onCancel(scheduledGrant.id, scheduledGrant.name),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (scheduledGrant) => {
                    if (scheduledGrant.done) {
                        return false;
                    }

                    if (moment(scheduledGrant.startFutureDate).isSameOrBefore(moment())) {
                        return false;
                    }
                    return true;
                },
                onCancelRender: (scheduledGrant) => {
                    return !scheduledGrant.done;
                }
            }
        }));
    }

    @action.bound async onCancel(id) {
        this.rootStore.modalStore.showConfirm('SCHEDULED_GRANT.CANCEL.QUESTION',
            async () => {
                try {
                    await this.rootStore.application.donor.grantStore.cancelScheduledGrant({ id: id });
                    this.rootStore.notificationStore.success('SCHEDULED_GRANT.CANCEL.SUCCESS');
                } catch (error) {
                    this.rootStore.notificationStore.error('SCHEDULED_GRANT.CANCEL.ERROR');
                }
                await this.queryUtility.fetch();
            }
        );
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
