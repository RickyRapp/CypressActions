import { observable } from 'mobx';
import { GrantService } from "common/data";
import { GrantListFilter } from 'modules/main/grant/models';
import { BaseGrantListViewStore } from 'modules/common/grant/stores';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import _ from 'lodash';

class GrantListViewStore extends BaseGrantListViewStore {
    grantPurposeTypeModels = null;
    donationStatusModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;
    @observable grantId = null;

    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        filter.donorAccountId = rootStore.authStore.user.id;

        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        const listViewStore = {
            name: 'grant',
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.main.grant.create')
                },
                edit: (grantId) => {
                    this.rootStore.routerStore.navigate('master.app.main.grant.edit', { id: grantId })
                },
                grantScheduledPaymentEdit: (grantScheduledPaymentName) =>
                    this.rootStore.routerStore.navigate('master.app.main.grant.scheduled.list', null, { name: grantScheduledPaymentName })
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,grantPurposeMember,charity';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        }

        const config = {
            listViewStore: listViewStore
        }

        super(rootStore, config);

        this.setColumns = [
            {
                key: 'charity.name',
                title: 'CHARITY(CLICKONROW)',
                onClick: (item) => this.routes.charityEdit(item.charity.id)
            },
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency'
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'function',
                function: (item) => { return item.createdByCoreUser ? `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` : 'System' },
            },
            {
                key: 'donationStatusId',
                title: 'STATUS',
                type: 'function',
                function: (item) => _.find(this.donationStatusModels, { id: item.donationStatusId }).name
            },
            {
                key: 'grantPurposeTypeId',
                title: 'PURPOSE',
                type: 'function',
                function: (item) => renderGrantPurposeType(item, this.grantPurposeTypeModels)
            },
            {
                key: 'grantScheduledPayment.name',
                title: 'PARTOF(CLICKONROW)',
                onClick: grant => this.routes.grantScheduledPaymentEdit(grant.grantScheduledPayment.name)
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
        ];

        this.load();
    }
}

export default GrantListViewStore;