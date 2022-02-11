import React from 'react'
import { BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore, TableViewStore } from 'core/stores';
import { charityFormatter, canEditCancel } from 'core/utils';
import { observable, action } from 'mobx';
import { PastGrantFilter } from 'application/donor/activity/grant/models';
import { localStorageProvider } from 'core/providers';
import { GrantRouteService } from 'application/common/grant/services';
import moment from 'moment';
import { applicationContext } from 'core/utils';
import { CharityNameCell, DescriptionCell } from '../components'
@applicationContext
class PastGrantViewStore extends BaseListViewStore {
	@observable summaryData = null;
	@observable donor = null;
	@observable showMoreOptions = false;
	@observable upcomingGrants = 0;

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
						if (params.dateCreatedFrom)
							params.dateCreatedFrom = `${params.dateCreatedFrom} 00:00:00`;
						if (params.dateCreatedTo)
							params.dateCreatedTo = `${params.dateCreatedTo} 23:59:59`;
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
		this.createYearDropdownStore();

		this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
	}

	@action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		}
		else {
			await this.fetch([
				this.fetchDonorData()
			]);
		}
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

	setAddress(address) {
		this.form.$('addressLine1').set(address.addressLine1);
		this.form.$('addressLine2').set(address.addressLine2);
		this.form.$('city').set(address.city);
		this.form.$('state').set(address.state);
		this.form.$('zipCode').set(address.zipCode);
	}
	@action.bound
	setSimilarGrantTable(value) {
		this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.charityTypeId === value).sort());
		if (!this.similarGrantsTableStore.dataInitialized) {
			this.similarGrantsTableStore.dataInitialized = true;
		}
	}

	@action.bound
	setCharityId(id) {
		this.form.$('charityId').set(id);
		const charity = this.filteredCharities.find(x => x.value === id);
		this.charity = charity;
		this.setAddress(charity.item.charityAddresses[0]);
		this.setSimilarGrantTable(this.charity.item.charityTypeId);
	}

	@action.bound
	async grantAgain(grant) {
		localStorageProvider.add("ExistingGrant", true);
		localStorageProvider.add("ExistingGrantObject", JSON.stringify(grant));
		this.rootStore.routerStore.goTo("master.app.main.donor.grant.create", { grant: grant });
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
				filter.exportLimit = 1000;
				filter.exportType = exportData.exportType;
				return routeService.exportDonor(filter);
			}
		}
	}
	createYearDropdownStore() {
		this.yearDropdownStore = new BaasicDropdownStore();
	}
	@action.bound
	async fetchDonorData() {
		const data = await this.rootStore.application.donor.dashboardStore.loadDashboardData(this.rootStore.userStore.applicationUser.id);
		let initialValue = new Date().getFullYear();
		if (data.donationsPerYear.length > 0) {
			let donations = data.donationsPerYear.map(c => { return { name: c.year.toString(), id: c.year } });
			donations.push({ name: 'All Time', id: 1 }, { name: 'This Week', id: 7 }, { name: 'This Month', id: 30 }, { name: 'Last Month', id: -30 }, { name: 'Year To Date', id: 2 });
			this.yearDropdownStore.setItems(donations);
			//this.yearDropdownStore.setItems(data.donationsPerYear.map(c => { return { name: c.year.toString(), id: c.year } }));
		}
		else {
			this.yearDropdownStore.setItems([{ name: initialValue.toString(), id: initialValue }]);
		}
		this.yearDropdownStore.setValue({ name: initialValue.toString(), id: initialValue });
		this.donor = data;
		let upcoming = (await this.rootStore.application.donor.grantStore.getDonorInformation(this.donorId)).upcomingGrantsThisYear;
		this.upcomingGrants = upcoming ? upcoming : 0;
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
						fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary'],
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
		const declinationReason = [{ id: 1, name: 'Legally binding pledge' },
		{ id: 2, name: 'Charity failed to provide necessary documents' },
		{ id: 3, name: 'Charity has seen its status revoked by the IRS' },
		{ id: 4, name: 'This grant does not comply with the Donors Funds’ Policies and guidelines' },
		{ id: 5, name: 'Earmarked grant' }];
		this.setTableStore(
			new TableViewStore(
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
							cell: (data) => {
								return (<CharityNameCell data={data} />)
							}
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
							format: {
								type: 'function',
								value: (item) => {
									if (item.declinationTypeId != null && typeof item.declinationTypeId != 'undefined') {
										return `Declined - ${(declinationReason.filter(x => x.id == item.declinationTypeId)).length > 0 ? declinationReason.filter(x => x.id == item.declinationTypeId)[0].name : 'other'}`;
									} else {
										return item.donationStatus.name;
									}
								}
							}
						},
						{
							key: 'desciption',
							title: 'GRANT.LIST.COLUMNS.DESCRIPTION',
							cell: (data) => {
								return (<DescriptionCell data={data} />)
							},
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
							}
							return false;
						},
						onCancelRender: (grant) => {
							if (grant.donationStatus.abrv !== 'canceled') {
								if (grant.donationStatus.abrv === 'pending' || ((grant.grantPurposeType.abrv === 'where-deemed-most-needed' || grant.grantPurposeType.abrv === 'general-fund') && grant.donationStatus.abrv === 'approved')) {
									return canEditCancel(grant.dateCreated);
								}
							}
							return false;
						},
					},
				},
				true
			)
		);
	}

	@action.bound
	onShowMoreOptionsClick() {
		this.showMoreOptions = !this.showMoreOptions;
	}

	getDescription(item) {
		if (item.donationType.abrv === "online") {
			if (item.grantPurposeType.abrv === 'other' || item.grantPurposeType.abrv === 'in-honor-of' || item.grantPurposeType.abrv === 'solicited-by') {
				return `${item.grantPurposeType.name} - ${item.purposeNote}`
			}
			return item.grantPurposeType.name;
		} else if (item.donationType.abrv === 'charity-website') {
			return item.thirdPartyWebsite.url;
		}
		else if (item.donationType.abrv === "giving-card") {
			return `Fidelity`;
		}
		else if (item.donationType.abrv === "session") {
			return item.session.fullName;
		}
		else {
			return `Grant: ${item.charity.name}`;
		}
	}

	getTransactionType(item) {
		if (item.donationType.abrv === "session") {
			return ((((item.donationType.name + ' ') + item.certificate.booklet.code) + ' - ') + item.certificate.code);
		} else if (item.donationType.abrv === 'charity-website') {
			return `Charity website`;
		}
		else if (item.donationType.abrv === "giving-card") {
			return `Giving card`;
		}
		else {
			return item.donationType.name;
		}
	}

}

export default PastGrantViewStore;
