import { action } from 'mobx';
import { BaseListViewStore, TableViewStore } from "core/stores";
import { ContributionService, LookupService, DonorAccountService } from "common/data";
import { ContributionListFilter } from 'modules/contribution/models';
import { BaasicDropdownStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class ContributionListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        const contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        const paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');

        super(rootStore, {
            name: 'contribution',
            routes: {
                edit: (contributionId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.main.contribution.edit', {
                        contributionId: contributionId,
                        id: userId
                    }),
                create: () => {
                    if (rootStore.routerStore.routerState.params.id) {
                        this.rootStore.routerStore.navigate('master.app.main.contribution.create', {
                            id: rootStore.routerStore.routerState.params.id
                        })
                    }
                    else if (rootStore.authStore.hasPermission('theDonorsFundSection.create')) {
                        this.findDonorModalParams.open();
                    }
                    else {
                        rootStore.routerStore.navigate('master.error');
                    }
                }
            },
            actions: {
                find: async params => {
                    params.embed = 'donorAccount,coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(rootStore.routerStore.routerState.params.id, params);
                    return response;
                }
            },
            queryConfig: {
                filter: new ContributionListFilter()
            }
        });

        this.contributionService = contributionService;
        const contributionEmployeeUpdate = rootStore.authStore.hasPermission('theDonorsFundSection.update');
        const contributionUpdate = rootStore.authStore.hasPermission('theDonorsFundContributionSection.update');
        this.minutes = 15;

        if (contributionEmployeeUpdate) {
            this.minutes = null;
        }

        this.permissions = {
            update: contributionUpdate || contributionEmployeeUpdate,
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
                    onEdit: contribution => this.routes.edit(contribution.id, contribution.donorAccountId),
                    onDetails: contribution => this.routes.details(contribution.id)
                },
                actionsConfig: {
                    onEditConfig: { 'minutes': this.minutes, 'title': 'edit', 'permissions': this.permissions }
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

        this.selectedExportColumnsName = ['Amount'];
        if (contributionEmployeeUpdate) {
            this.selectedExportColumnsName.push('Payment Type');
        }
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

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.main.contribution.create', {
                id: option.id
            })
        }
    }
}

export default ContributionListViewStore;