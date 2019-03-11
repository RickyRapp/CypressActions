import { BaseListViewStore, TableViewStore } from "core/stores";
import { ContributionService } from "common/data";
import { ContributionListFilter } from 'modules/contribution/models';

class ContributionListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);

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
                    const response = await contributionService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: new ContributionListFilter()
            }
        })

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
                    onEditConfig: { 'days': 60, 'title': 'edit', 'permissions': this.permissions }
                }
            })
        );
    }
}

export default ContributionListViewStore;