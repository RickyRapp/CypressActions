import React from 'react';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { ContributionListFilter } from 'application/donor/activity/contribution/models';
import moment from 'moment';
import { action, observable } from 'mobx';

class DepositsInsightViewStore extends BaseListViewStore {
    contributionStatuses = [];

    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-deposit-insight',
            authorization: 'theDonorsFundContributionSection',
            routes: {
				edit: (id) => {
					this.rootStore.routerStore.goTo('master.app.main.charity.accept-security.edit', { id: id });
				},
				create: () => {
					this.rootStore.routerStore.goTo('master.app.main.charity.accept-security.create');
				},
				preview: (id) => {
					this.rootStore.routerStore.goTo('master.app.main.charity.accept-security.details', { id: id });
				},
			},
			queryConfig: {
				filter: new ContributionListFilter('dateCreated', 'desc'),
				onResetFilter: filter => {
					filter.reset();
					this.paymentTypeDropdownStore.setValue(null);
					this.contributionStatusDropdownStore.setValue(null);
					this.dateCreatedDateRangeQueryStore.reset();
				},
			},
			actions: () => {
				return {
					find: async params => {
						if(params.dateCreatedFrom){
                            let fromDate = params.dateCreatedFrom.replace(' 00:00:00','');
                            params.dateCreatedFrom = `${fromDate} 00:00:00`;
                        }
                        if(params.dateCreatedTo){
                            let toDate = params.dateCreatedTo.replace(' 23:59:59','');
                            params.dateCreatedTo = `${toDate} 23:59:59`;
                        }
						params.embed = ['donor', 'payerInformation', 'bankAccount', 'paymentType', 'contributionStatus', 'bankAccount.accountHolder'];
						this.summaryData = await rootStore.application.donor.grantStore.findSummaryPastGrant({
								donorId: this.donorId,
								...params,
						});
						this.timelineSummary = await rootStore.application.donor.contributionStore.findTimelineSummary({ partyId: this.partyId, ...params });
						this.allData = await rootStore.application.donor.contributionStore.findContribution({ partyId: rootStore.userStore.applicationUser.id, ...params });

						if(this.depositTab == 1) {
							return this.timelineSummary;
						} else {
							return this.allData;
						}
					},
				};
			},
        });

        this.charityId = rootStore.userStore.applicationUser.id;
		this.createContributionStatusDropdownStore();
        this.createTableStore();
    }

    
    @action.bound
	async openCancelContribution(item) {
		this.rootStore.modalStore.showConfirm(
			`Are you sure you want to cancel contribution (#${item.confirmationNumber}) created 
            on: ${moment(item.dateCreated).format('dddd, MMMM Do YYYY, h:mm:ss a')} with amount: $${item.amount.toFixed(
				2
			)}`,
			async () => {
				this.loaderStore.suspend();
				try {
					await this.rootStore.application.donor.contributionStore.reviewContribution({
						id: item.id,
						contributionStatusId: this.contributionStatuses.find(c => c.abrv === 'canceled').id,
					});
					this.queryUtility.fetch();
					this.rootStore.notificationStore.success('Contribution canceled');
				} catch (err) {
                    console.log(err)
					this.rootStore.notificationStore.error('Failed to cancel contribution');
				} finally {
					this.loaderStore.resume();
				}
			}
		);
	}
    createTableStore() {
        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'dateCreated',
                        title: 'CONTRIBUTION.LIST.COLUMNS.DATE_CREATED_LABEL',
                        format: {
                            type: 'date',
                            value: 'short',
                        },
                        onClick: (item) => { this.routes.preview(item.id, item.donorId) }
                    },
                    {
                        key: 'confirmationNumber',
                        title: 'CONTRIBUTION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                    },
                    {
                        key: 'contributionStatus.name',
                        title: 'CONTRIBUTION.LIST.COLUMNS.CONTRIBUTION_STATUS_NAME_LABEL',
                    },
                    {
                        key: 'paymentType.name',
                        title: 'CONTRIBUTION.LIST.COLUMNS.PAYMENT_TYPE_NAME_LABEL',
                        format: {
                            type: 'function',
                            value: (item) => {
                                return item.paymentType && item.paymentType.name ? item.paymentType.name : ""
                            }
                        },
                        sortable: false
                    },
                    {
                        key: 'payerInformation.name',
                        title: 'CONTRIBUTION.LIST.COLUMNS.PAYER_INFORMATION_NAME_LABEL',
                        format: {
                            type: 'function',
                            value: (item) => {
                                return item.bankAccount && item.bankAccount.isThirdPartyAccount && item.bankAccount.accountHolder ? item.bankAccount.accountHolder.name : item.thirdPartyDonorAdvisedFundId && item.thirdPartyDonorAdvisedFundId != "" ? (this.thirdPartyFunds.find(c => c.id == item.thirdPartyDonorAdvisedFundId)).name : item.payerInformation.name
                            }
                        },
                        sortable: false
                    },
                    {
                        key: 'amount',
                        title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'currency',
                            value: '$',
                        },
                        sortable: false
                    },
                ],
                actions: {
                    onEdit: contribution => this.routes.edit(contribution.id, contribution.donorId),
                    onCancel: contribution => this.openCancelContribution(contribution),
                    onPreview: contribution => this.routes.preview(contribution.id, contribution.donorId),
                    onSort: column => this.queryUtility.changeOrder(column.key),
                },
                actionsRender: {
                    onEditRender: item => {
                        if (item.contributionStatus.abrv === 'pending') {
                            const dateToEdit = moment(item.dateCreated).add(15, 'm');
                            return moment().isBetween(moment(item.dateCreated), dateToEdit);
                        }
                        return false;
                    },
                    onCancelRender: item => {
                        if (item.contributionStatus.abrv === 'pending') {
                            const dateToEdit = moment(item.dateCreated).add(30, 'm');
                            return moment().isBetween(moment(item.dateCreated), dateToEdit);
                        }
                        return false;
                    },
                },
            })
        );
    }
    createContributionStatusDropdownStore() {
		this.contributionStatusDropdownStore = new BaasicDropdownStore(
			{
				multi: true,
			},
			{
				fetchFunc: async () => {
					this.contributionStatuses = await this.rootStore.application.lookup.contributionStatusStore.find();
					return this.contributionStatuses;
				},
				onChange: contributionStatus => {
					this.queryUtility.filter.contributionStatusIds = contributionStatus.map(status => {
						return status.id;
					});
				},
			}
		);
	}
}

export default DepositsInsightViewStore;
