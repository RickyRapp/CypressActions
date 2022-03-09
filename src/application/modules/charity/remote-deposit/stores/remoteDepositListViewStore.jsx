import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from "core/stores";
import { remoteDepositService } from "application/charity/remote-deposit/services";
import React from "react";
import { FormatterResolver } from "core/components";
import { action, observable } from "mobx";
import { SessionListFilter } from "application/charity/remote-deposit/models";
class remoteDepositListViewStore extends BaseListViewStore {
	@observable checksOnHold = null;
	@observable isChecksOnHoldVisible = false;

	constructor(rootStore) {
		const service = new remoteDepositService(rootStore.application.baasic.apiClient);
		super(rootStore, {
			autoInit: true,
			routes: {
				edit: id => {
					this.rootStore.routerStore.goTo("master.app.main.charity.remote-deposit.edit", { id: id });
				},
				create: () => {
					rootStore.notificationStore.warning("Not implemented");
					//this.rootStore.routerStore.goTo("master.app.main.charity.remote-deposit.create");
				},
				preview: id => {
					this.rootStore.routerStore.goTo("master.app.main.charity.remote-deposit.preview", { id: id });
				},
			},
			queryConfig: {
                filter: new SessionListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.paymentTypeDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
			actions: () => {
				return {
					find: async params => {
						params.charityId = this.rootStore.userStore.applicationUser.charityId;
						params.isCharityAccount = true;
						params.embed = [
                            'charity',
                            'grants',
                            'grants.certificate',
                            'grants.donationStatus',
                            'grants.certificate.denominationType'
                        ];
						
						const response = await service.find(params);
						return response.data;
					},
					delete: service.delete,
				};
			},
		});
		this.createTableStore();
		this.createChecksOnHoldTableStore();
		this.fetchChecksOnHold();
		this.createPaymentTypeDropdownStore();
		this.createDonationStatusDropdownStore();
		this.createDateCreatedDateRangeQueryStore();
	}

	createChecksOnHoldTableStore() {
		this.checksOnHoldTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'certificate.booklet.bookletOrder.donor.donorName',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.DONOR_LABEL'
                },
                {
                    key: 'certificate.code',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return `${item.certificate.booklet.code}-${item.certificate.code}`
                        }
                    }
                },
                {
                    key: 'certificate.denominationType',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'denomination',
                        additionalField: 'certificate.openCertificateAmount',
                        value: 'short'
                    }
                },
            ],
            actions: {},
            actionsRender: {}
        });
	}

	@action.bound
    onExpandChecksOnHoldClick() {
        this.isChecksOnHoldVisible = !this.isChecksOnHoldVisible;
    }

	createTableStore() {
	this.setTableStore(
			new TableViewStore(this.queryUtility, {
				columns: [
					{
						key: 'confirmationNumber',
						title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
						onClick: (item) => this.routes.preview(item.id),
					},
					{
						key: 'charity.name',
						title: 'SESSION.LIST.COLUMNS.CHARITY_NAME_LABEL',
					},
					{
						key: 'amount',
						title: 'SESSION.LIST.COLUMNS.AMOUNT_LABEL',
						format: {
							type: 'function',
							value: (item) => {
								return <React.Fragment>
									<FormatterResolver
										item={{ amount: item.amount }}
										field='amount'
										format={{ type: 'currency' }}
									/>
									{item.json &&
										<span data-tip={`${item.json}`} data-type="info" style={{cursor: 'pointer'}}>
											<b>&nbsp;[?]</b>
											<ReactTooltip />
										</span>
									}
								</React.Fragment >
	
							}
						}
					},
					{
						key: 'grants',
						title: 'SESSION.LIST.COLUMNS.SESSION_STATUS_LABEL',
						format: {
							type: 'function',
							value: (item) => {
								return item.grants && item.grants.length > 0 && item.grants[0].donationStatus.name
							}
						}
					},
					{
						key: 'dateCreated',
						title: 'SESSION.LIST.COLUMNS.DATE_CREATED_LABEL',
						format: {
							type: 'date',
							value: 'short'
						}
					}
				],
				actions: {
					onPreview: item => this.routes.preview(item.id),
				},
			})
		);
	}
	async fetchChecksOnHold() {
        const statuses = await this.rootStore.application.lookup.sessionPendingCertificateStatusStore.find();
		
		const response = await this.rootStore.application.charity.activityStore.activityService.findPendingCheck({
			charityId: this.rootStore.userStore.applicationUser.charityId, //'45edabf2-1469-4f2a-9362-ad4800a5ab24'
			sessionPendingCertificateStatusIds: statuses.find(c => c.abrv === 'pending').id,
			embed: 'charity,certificate,certificate.booklet,certificate.denominationType,certificate.booklet.bookletOrder,certificate.booklet.bookletOrder.donor',
			sort: 'dateCreated|desc',
			page: 1,
			rpp: 1000
		});
        this.checksOnHoldTableStore.setData(response.data.item);
        if (!this.checksOnHoldTableStore.dataInitialized) {
            this.checksOnHoldTableStore.dataInitialized = true;
        }
    }
	createPaymentTypeDropdownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.paymentTypeStore.find();
                },
                onChange: (paymentType) => {
                    this.queryUtility.filter.paymentTypeIds = paymentType.map((type) => { return type.id });
                }
            });
    }

    createDonationStatusDropdownStore() {
        this.donationStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.donationStatusStore.find();
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = donationStatus.map((status) => { return status.id });
                }
            });
    }

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }
}

export default remoteDepositListViewStore;