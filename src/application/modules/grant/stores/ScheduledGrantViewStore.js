import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ScheduledGrantService } from 'application/grant/services';
import { applicationContext } from 'core/utils';
import { ScheduledGrantListFilter } from 'application/grant/models';
import moment from 'moment'

@applicationContext
class ScheduledGrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id
        let filter = new ScheduledGrantListFilter('dateCreated', 'desc')
        filter.donorAccountId = id;

        const service = new ScheduledGrantService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'scheduled-grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.grant.scheduled-edit',
                        {
                            id: id,
                            editId: editId
                        }
                    );
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'createdByCoreUser',
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile',
                            'charity',
                            'grantScheduleType'
                        ];
                        params.fields = [
                            'id',
                            'charity',
                            'charity.name',
                            'donorAccount',
                            'donorAccount.id',
                            'donorAccount.donorName',
                            'amount',
                            'name',
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
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'charity.name',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'name',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.NAME_LABEL',
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
                    key: 'startFutureDate',
                    title: 'SCHEDULED_GRANT.LIST.COLUMNS.START_FUTURE_DATE_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
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
                onEdit: (scheduledGrant) => this.routes.edit(scheduledGrant.donorAccount.id, scheduledGrant.id),
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

        this.service = service;
        this.rootStore = rootStore;
    }

    @action.bound async onCancel(id) {
        this.rootStore.modalStore.showConfirm('SCHEDULED_GRANT.CANCEL.QUESTION',
            async () => {
                try {
                    await this.service.cancel({ id: id });
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
                scheduleTypeDescription = `Number Of Payments: ${item.remainingNumberOfPayments}/${item.numberOfPayments}`;
            }
            return `${base} - ${scheduleTypeDescription}`;
        }

        return base;
    }
}

export default ScheduledGrantViewStore;
