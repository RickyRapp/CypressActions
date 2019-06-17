import { observable } from 'mobx';
import { GrantScheduledPaymentService } from "common/data";
import { GrantScheduledPaymentListFilter } from 'modules/main/grant/models';
import { renderGrantScheduleType } from 'modules/common/grant/components';
import { BaseGrantScheduledPaymentListViewStore } from 'modules/common/grant/stores';
import _ from 'lodash';

class GrantScheduledPaymentListViewStore extends BaseGrantScheduledPaymentListViewStore {
    grantPurposeTypeModels = null;
    grantScheduleTypeModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;
    @observable grantId = null;

    constructor(rootStore) {
        const grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);

        let filter = new GrantScheduledPaymentListFilter()
        filter.donorAccountId = rootStore.authStore.user.id;
        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        const listViewStore = {
            name: 'scheduled grant',
            routes: {
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,charity';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantScheduledPaymentService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        };

        const config = {
            listViewStore: listViewStore
        }

        super(rootStore, config);

        this.setColumns = [
            {
                key: 'name',
                title: 'NAME'
            },
            {
                key: 'done',
                title: 'DONE',
                type: 'bool'
            },
            {
                key: 'charity.name',
                title: 'Charity (click on row)',
                onClick: grant => this.routes.charityEdit(grant.charity.id)
            },
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency'
            },
            {
                key: 'grantScheduleTypeId',
                title: 'TYPE',
                type: 'function',
                function: (item) => renderGrantScheduleType(item, this.grantScheduleTypeModels)
            },
            {
                key: 'startFutureDate',
                title: 'STARTDATE',
                type: 'date',
                format: 'YYYY-MM-DD'
            },
            {
                key: 'nextDate',
                title: 'NEXTDATE',
                type: 'date',
                renderIf: (item) => item.grantScheduleTypeId !== _.find(this.grantScheduleTypeModels, { abrv: 'one-time' }).id,
                default: '',
                format: 'YYYY-MM-DD'
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'function',
                function: (item) => { return item.createdByCoreUser ? `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` : 'System' }
            }
        ];

        this.setRenderActions = {
            renderCancel: (item) => !item.done
        }
    }
}

export default GrantScheduledPaymentListViewStore;