import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { ContributionListFilter } from 'application/donor/activity/contribution/models';
import moment from 'moment';

@applicationContext
class ContributionViewStore extends BaseListViewStore {
	@observable accountTypes = null;
	@observable summaryData = null;
	contributionStatuses = [];

	constructor(rootStore) {
		super(rootStore, {
			name: 'contribution',
			authorization: 'theDonorsFundContributionSection',
			autoInit: true,
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
						params.embed = ['donor', 'payerInformation', 'bankAccount', 'paymentType', 'contributionStatus'];

						this.summaryData = await rootStore.application.donor.grantStore.findSummaryPastGrant({
							donorId: this.donorId,
							...params,
						});
						return rootStore.application.donor.contributionStore.findContribution({ donorId: this.donorId, ...params });
					},
				};
			},
		});

		this.donorId = rootStore.userStore.applicationUser.id;
		this.createTableStore();
		this.createPaymentTypeDropdownStore();
		this.createContributionStatusDropdownStore();

		this.selectDonorModal = new ModalParams({});
		this.reviewModal = new ModalParams({});
		this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
	}

	@action.bound
	renderPaymentType(item) {
		if (item.paymentType.abrv === 'ach' || item.paymentType.abrv === 'wire-transfer') {
			if (item.bankAccount) {
				if (item.bankAccount.accountNumber.length > 4) {
					return `${item.paymentType.name}${' ...' +
						item.bankAccount.accountNumber.substr(item.bankAccount.accountNumber.length - 4)}`;
				} else {
					return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber}`;
				}
			}
		}
		return item.paymentType.name;
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

	createPaymentTypeDropdownStore() {
		this.paymentTypeDropdownStore = new BaasicDropdownStore(
			{
				multi: true,
			},
			{
				fetchFunc: () => {
					return this.rootStore.application.lookup.paymentTypeStore.find();
				},
				onChange: paymentType => {
					this.queryUtility.filter.paymentTypeIds = paymentType.map(type => {
						return type.id;
					});
				},
			}
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

export default ContributionViewStore;
