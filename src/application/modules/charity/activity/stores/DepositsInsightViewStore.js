import React from 'react';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { ContributionListFilter } from 'application/donor/activity/contribution/models';
import moment from 'moment';

class DepositsInsightViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-deposit-insight',
            authorization: 'theDonorsFundDonationSection',
            routes: {
				edit: id => {
					this.rootStore.routerStore.goTo('master.app.main.donor.contribution.edit', { id: id });
				},
				create: () => {
					this.rootStore.routerStore.goTo('master.app.main.donor.contribution.create');
				},
				preview: id => {
					this.rootStore.routerStore.goTo('master.app.main.donor.contribution.details', { id: id });
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
                        debugger;
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
						this.timelineSummary = await rootStore.application.donor.contributionStore.findTimelineSummary({ donorId: this.donorId, ...params });
						this.allData = await rootStore.application.donor.contributionStore.findContribution({ donorId: this.donorId, ...params });

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
        this.createTableStore();
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
                            value: this.renderPaymentType,
                        },
                    },
                    {
                        key: 'payerInformation.name',
                        title: 'CONTRIBUTION.LIST.COLUMNS.PAYER_INFORMATION_NAME_LABEL',
                        format: {
                            type: 'function',
                            value: (item) => {
                                return item.bankAccount && item.bankAccount.isThirdPartyAccount && item.bankAccount.accountHolder ? item.bankAccount.accountHolder.name : item.thirdPartyDonorAdvisedFundId && item.thirdPartyDonorAdvisedFundId != "" ? (this.thirdPartyFunds.find(c => c.id == item.thirdPartyDonorAdvisedFundId)).name : item.payerInformation.name
                            }
                        }
                    },
                    {
                        key: 'amount',
                        title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'currency',
                            value: '$',
                        },
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
}

export default DepositsInsightViewStore;
