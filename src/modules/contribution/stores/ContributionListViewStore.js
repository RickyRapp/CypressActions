import { BaseListViewStore, TableViewStore } from "core/stores";
import { ContributionService, LookupService, ContributionRouteService } from "common/data";
import { ContributionListFilter } from 'modules/contribution/models';
import { BaasicDropdownStore } from "core/stores";
import _ from 'lodash';

class ContributionListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        const contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        const paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');
        const contributionEmployeeRead = rootStore.authStore.hasPermission('theDonorsFundSection.read')

        super(rootStore, {
            name: 'contribution',
            routes: {
                edit: (contributionId, userId) => this.rootStore.routerStore.navigate('master.app.main.contribution.edit', {
                    contributionId: contributionId,
                    id: userId
                }),
                create: () => this.rootStore.routerStore.navigate('master.app.main.contribution.create')
            },
            actions: {
                find: async params => {
                    params.embed = 'donorAccount,coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: new ContributionListFilter(contributionEmployeeRead ? null : rootStore.authStore.user.id)
            }
        });

        this.contributionService = contributionService;

        this.permissions = {
            contributionUpdate: rootStore.authStore.hasPermission('theDonorsFundContributionSection.update'),
            contributionEmployeeUpdate: rootStore.authStore.hasPermission('theDonorsFundSection.update'),
        }

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'amount',
                        title: 'Amount'
                    },
                    {
                        key: 'paymentType.name',
                        title: 'Payment Type'
                    },
                    {
                        key: 'payerInformation',
                        title: 'Payer Name',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'contributionStatus.name',
                        title: 'Status'
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'Created By',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm:ss'
                    },
                ],
                actions: {
                    onEdit: contribution => this.routes.edit(contribution.id),
                    onDetails: contribution => this.routes.details(contribution.id)
                },
                actionsConfig: {
                    onEditConfig: { 'minutes': 15, 'title': 'edit', 'permissions': this.permissions }
                }
            })
        );

        this.contributionStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Contribution Status'
            },
            {
                fetchFunc: async () => {
                    let models = await contributionStatusLookup.getAll();
                    return _.orderBy(models.data, ['sortOrder'], ['asc']);
                },
            }
        );

        this.selectedExportColumnsName = ['Amount', 'Payment Type'];
        this.additionalExportColumnsName = ['Payer Name', 'Status', 'Created By', 'Date Created'];

        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Payment Type'
            },
            {
                fetchFunc: async () => {
                    let models = await paymentTypeLookup.getAll();
                    return _.orderBy(models.data, ['sortOrder'], ['asc']);
                },
            }
        );
    }
}

export default ContributionListViewStore;