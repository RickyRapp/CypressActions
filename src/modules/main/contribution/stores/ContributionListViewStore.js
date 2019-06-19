import { action, observable } from 'mobx';
import { ContributionService } from "common/data";
import { ContributionListFilter } from 'modules/main/contribution/models';
import { BaseContributionListViewStore } from 'modules/common/contribution/stores';
import moment from 'moment';
import _ from 'lodash';

class ContributionListViewStore extends BaseContributionListViewStore {
    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);

        let filter = new ContributionListFilter();
        filter.donorAccountId = rootStore.authStore.user.id;

        const listViewStore = {
            name: 'contribution',
            routes: {
                edit: (contributionId) =>
                    this.rootStore.routerStore.navigate('master.app.main.contribution.edit', {
                        id: contributionId
                    }),
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.main.contribution.create')
                }
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        }

        const config = {
            listViewStore: listViewStore,
            setSelectedExportColumnsName: [],
            setAdditionalExportColumnsName: []
        }

        super(rootStore, config);

        this.minutes = 15;
        this.setColumns = [
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
                function: (item) => _.find(this.paymentTypes, { id: item.paymentTypeId }).name
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
            onEdit: (contribution) => this.routes.edit(contribution.id),
        }

        this.setRenderActions = {
            renderEdit: this.renderEdit,
        }

        this.load();
    }

    @action.bound renderEdit(contribution) {
        let availableStatuesForEdit = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' }), function (o) { return o.id });
        if (_.some(availableStatuesForEdit, (item) => { return item === contribution.contributionStatusId })) {
            return moment().local().isBefore(moment.utc(contribution.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'));
        }
        return false;
    }
}

export default ContributionListViewStore;