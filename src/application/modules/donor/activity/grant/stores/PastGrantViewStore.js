import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore, DateRangeQueryPickerStore } from 'core/stores';
import { charityFormatter, canEditCancel } from 'core/utils';
import { observable, action } from 'mobx';
import { PastGrantFilter } from 'application/donor/activity/grant/models';
import { localStorageProvider } from 'core/providers';
import { GrantRouteService } from 'application/common/grant/services';
import moment from 'moment';
class PastGrantViewStore extends BaseListViewStore {
	@observable summaryData = null;

	constructor(rootStore) {
		super(rootStore, {
			name: 'past-grant',
			authorization: 'theDonorsFundDonationSection',
			routes: {
				edit: id => {
					this.rootStore.routerStore.goTo('master.app.main.donor.grant.edit', { id: id });
				},
				preview: (editId) => {
					this.rootStore.routerStore.goTo('master.app.main.donor.grant.preview', { id: editId });
				}
			},
			queryConfig: {
				filter: new PastGrantFilter('dateCreated', 'desc'),
				onResetFilter: filter => {
					filter.reset();
					this.charityDropdownStore.setValue(null);
					this.donationStatusDropdownStore.setValue(null);
					this.donationTypeDropdownStore.setValue(null);
					this.dateCreatedDateRangeQueryStore.reset();
				},
			},
			actions: () => {
				return {
					find: async params => {
						params.embed = ['charity', 'donationType', 'donationStatus', 'donor', 'grantPurposeType', 'session', 'certificate', 'certificate.booklet', 'thirdPartyWebsite', 'charity.charityAddresses'];
						const tableData = await rootStore.application.donor.grantStore.findPastGrant({
							donorId: this.donorId,
							...params,
						});
						this.summaryData = await rootStore.application.donor.grantStore.findSummaryPastGrant({
							donorId: this.donorId,
							...params,
						});
						return tableData;
					},
				};
			},
		});

		this.donorId = rootStore.userStore.applicationUser.id;
		this.createTableStore();
		this.createCharityDropdownStore();
		this.createDonationStatusDropdownStore();
		this.createDonationTypeDropdownStore();
		this.createExportConfig();

		this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
	}

	@action.bound
	async cancelGrant(grant) {
		this.rootStore.modalStore.showConfirm(
			`Are you sure you want to cancel grant with charity name ${grant.charity.name}?`,
			async () => {
				try {
					await this.rootStore.application.donor.grantStore.cancelGrant({ id: grant.id });
					this.queryUtility.fetch();
					this.rootStore.notificationStore.success('Successfully canceled grant.');
				} catch ({ data }) {
					if (data && data.message) {
						this.rootStore.notificationStore.error(data.message);
					}
					else {
						this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
					}
				}
			}
		);
	}
	@action.bound
	async grantAgain(grant) {
		localStorageProvider.add("ExistingGrant", true);
		localStorageProvider.add("ExistingGrantObject", JSON.stringify(grant));
		this.rootStore.routerStore.goTo("master.app.main.donor.grant.create", {grant: grant});
	}

	createExportConfig() {
        this.exportConfig = {
            fileName: `Grants_${moment().format("YYYY-MM-DD_HH-mm-ss")}`,
            columns: [
                { id: 1, title: 'Date', key: 'DATE CREATED', selected: true, visible: true },
                { id: 2, title: 'Charity', key: 'CHARITY', selected: true, visible: true },
                { id: 3, title: 'TaxId', key: 'TAX ID', selected: true, visible: true },
                { id: 4, title: 'Amount', key: 'AMOUNT', selected: true, visible: true },
                { id: 5, title: 'Grant status', key: 'STATUS', selected: true, visible: true },
                { id: 6, title: 'Payment method', key: 'PAYMENT METHOD', selected: true, visible: true },
                { id: 7, title: 'Grant address', key: 'GRANT ADDRESS', selected: true, visible: true },
            ],
            exportUrlFunc: (exportData) => {
                const routeService = new GrantRouteService();
                let filter = this.queryUtility.filter;
                filter.exportFields = exportData.exportFields;
				filter.donorId = this.donorId;
                filter.exportLimit = exportData.exportLimit;
                filter.exportType = exportData.exportType;
                return routeService.exportDonor(filter);
            }
        }
    }
	createCharityDropdownStore() {
		this.charityDropdownStore = new BaasicDropdownStore(
			{
				placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
				initFetch: false,
				filterable: true,
			},
			{
				fetchFunc: async searchQuery => {
					const data = await this.rootStore.application.donor.grantStore.searchCharity({
						pageNumber: 1,
						pageSize: 10,
						search: searchQuery,
						sort: 'name|asc',
						embed: ['charityAddresses'],
						fields: ['id', 'taxId', 'name', 'charityAddresses'],
					});
					return data.item.map(x => {
						return {
							id: x.id,
							name: charityFormatter.format(x, { value: 'charity-name-display' }),
						};
					});
				},
				onChange: charityId => {
					this.queryUtility.filter.charityId = charityId;
				},
			}
		);
	}
	createDonationStatusDropdownStore() {
		this.donationStatusDropdownStore = new BaasicDropdownStore(
			{
				placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_STATUS_PLACEHOLDER',
				multi: true,
			},
			{
				fetchFunc: async () => {
					return this.rootStore.application.lookup.donationStatusStore.find();
				},
				onChange: donationStatus => {
					this.queryUtility.filter.donationStatusIds = donationStatus.map(status => {
						return status.id;
					});
				},
			}
		);
	}

	createDonationTypeDropdownStore() {
		this.donationTypeDropdownStore = new BaasicDropdownStore(
			{
				placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_TYPE_PLACEHOLDER',
				multi: true,
			},
			{
				fetchFunc: async () => {
					return this.rootStore.application.lookup.donationTypeStore.find();
				},
				onChange: donationType => {
					this.queryUtility.filter.donationTypeIds = donationType.map(type => {
						return type.id;
					});
				},
			}
		);
	}

	createTableStore() {
		this.setTableStore(
			new SelectTableWithRowDetailsViewStore(
				this.queryUtility,
				{
					columns: [
						{
							key: 'dateCreated',
							title: 'DONATION.PAST_GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
							format: {
								type: 'date',
								value: 'short',
							},
						},
						{
							key: 'charity.name',
							title: 'DONATION.PAST_GRANT.LIST.COLUMNS.CHARITY_LABEL',
						},
						{
							key: 'donationType.name',
							title: 'DONATION.PAST_GRANT.LIST.COLUMNS.DONATION_TYPE_LABEL',
							format: {
								type: 'function',
								value: (item) => {
									return this.getTransactionType(item);
								}
							},
						},
						{
							key: 'amount',
							title: 'DONATION.PAST_GRANT.LIST.COLUMNS.AMOUNT_LABEL',
							format: {
								type: 'currency',
								value: '$',
							},
						},
						{
							key: 'donationStatus.name',
							title: 'DONATION.PAST_GRANT.LIST.COLUMNS.DONATION_STATUS_LABEL',
						},
						{
							key: 'desciption',
							title: 'GRANT.LIST.COLUMNS.DESCRIPTION',
							format: {
								type: 'function',
								value: (item) => {
									return this.getDescription(item);
								}
							}
						},
					],
					actions: {
						onEdit: grant => this.routes.edit(grant.id),
						onPreview: (grant) => this.routes.preview(grant.id),
						onSort: column => this.queryUtility.changeOrder(column.key),
						onCancel: grant => this.cancelGrant(grant),
						onGrantAgain: grant => this.grantAgain(grant)
					},
					actionsRender: {
						onEditRender: grant => {
							if (grant.donationStatus.abrv !== 'canceled') {
								if (grant.donationStatus.abrv === 'pending' || ((grant.grantPurposeType.abrv === 'where-deemed-most-needed' || grant.grantPurposeType.abrv === 'general-fund') && grant.donationStatus.abrv === 'approved')) {
									return canEditCancel(grant.dateCreated);
								}
								return true;
							}
							return false;
						},
						onCancelRender: (grant) => {
							if (grant.donationStatus.abrv !== 'canceled') {
								if (grant.donationStatus.abrv === 'pending' || ((grant.grantPurposeType.abrv === 'where-deemed-most-needed' || grant.grantPurposeType.abrv === 'general-fund') && grant.donationStatus.abrv === 'approved')) {
									return canEditCancel(grant.dateCreated);
								}
								return true;
							}
							return false;
						},
					},
				},
				true
			)
		);
	}

	getDescription(item) {
		if (item.donationType.abrv === "online") {
			if (item.grantPurposeType.abrv === 'other' || item.grantPurposeType.abrv === 'in-honor-of' || item.grantPurposeType.abrv === 'solicited-by') {
				return `${item.grantPurposeType.name} - ${item.purposeNote}`
			}
			return item.grantPurposeType.name;
		} else if (item.donationType.abrv === 'charity-website') {
			return `Grant: ${item.charity.name}`;
		}
		else {
			return item.session.fullName;
		}
	}

	getTransactionType(item) {
		if (item.donationType.abrv === "session") {
			return ((((item.donationType.name + ' ') + item.certificate.booklet.code) + ' - ') + item.certificate.code);
		} else if (item.donationType.abrv === 'charity-website') {
			return item.thirdPartyWebsite.url;
		} else {
			return item.donationType.name;
		}
	}

}

export default PastGrantViewStore;
