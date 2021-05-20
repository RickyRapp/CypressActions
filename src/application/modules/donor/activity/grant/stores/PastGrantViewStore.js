import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore, DateRangeQueryPickerStore } from 'core/stores';
import { charityFormatter } from 'core/utils';
import { observable } from 'mobx';
import moment from 'moment';
import { PastGrantFilter } from 'application/donor/activity/grant/models';

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
						params.embed = ['charity', 'donationType', 'donationStatus', 'donor', 'grantPurposeType', 'session', 'certificate', 'certificate.booklet'];
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

		this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
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
					},
					actionsRender: {
						onEditRender: grant => {
							if (grant.donationStatus.abrv === 'pending' || grant.donationStatus.abrv === 'approved') {
								const dateToEdit = moment(grant.dateCreated).add(15, 'minutes');
								return moment().isBetween(grant.dateCreated, dateToEdit);
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
        if(item.donationType.abrv === "online"){
			if (item.grantPurposeType.abrv === 'other' || item.grantPurposeType.abrv === 'in-honor-of' || item.grantPurposeType.abrv === 'solicited-by') {
				return `${item.grantPurposeType.name} - ${item.purposeNote}`
			}
			return item.grantPurposeType.name;
        }
		else{
			return item.session.fullName;
		} 
    }

	getTransactionType(item) {
		if (item.donationType.abrv === "session") {
			return ((((item.donationType.name + ' ') + item.certificate.booklet.code) + ' - ') + item.certificate.code);
		} else {
			return item.donationType.name;
		}
	}

}

export default PastGrantViewStore;
