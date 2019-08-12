import { action, observable } from 'mobx';
import { ContributionService } from "common/data";
import { ContributionListFilter } from 'modules/main/contribution/models';
import { BaseContributionListViewStore } from 'modules/common/contribution/stores';
import { getDonorName } from 'core/utils';
import moment from 'moment';
import _ from 'lodash';

class ContributionListViewStore extends BaseContributionListViewStore {

    fields = [
        'id',
        'donorAccountId',
        'dateUpdated',
        'dateCreated',
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
                    params.embed = [
                        'donorAccount',
                        'donorAccount.coreUser',
                        'donorAccount.companyProfile',
                        'payerInformation',
                        'bankAccount',
                        'createdByCoreUser',
                        'contributionStatus',
                        'paymentType'
                    ];
                    params.fields = this.fields;
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

        this.contributionService = contributionService;
        this.minutes = 15;
        this.setColumns = [
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency'
            },
            {
                key: 'confirmationNumber',
                title: 'CONFIRMATIONNUMBER'
            },
            {
                key: 'contributionStatus.name',
                title: 'STATUS'
            },
            {
                key: 'paymentType.name',
                title: 'PAYMENTTYPE'
            },
            {
                key: 'payerInformation',
                title: 'PAYERNAME',
                type: 'function',
                function: (item) => item.payerInformation.name
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

    @action.bound renderEdit(item) {
        if (item.contributionStatus.abrv === 'pending') {
            return moment().local().isBefore(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'));
        }
        return false;
    }
}

export default ContributionListViewStore;