import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/administration/grant/models';
import GrantDeclineForm from 'application/common/grant/forms';
import _ from 'lodash';
import moment from 'moment';
class GrantViewStore extends BaseListViewStore {
    @observable declinationTypeId;

    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                scheduledGrantsList: () => {
                },
                preview: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.charity.accept-security.details', { id: id });

                },
            },
            queryConfig: {
                filter: new GrantListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.donationStatusDropdownStore.setValue(null);
                    this.donationTypeDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        if(params.dateCreatedFrom){
                            let fromDate = params.dateCreatedFrom.replace(' 00:00:00','');
                            params.dateCreatedFrom = `${fromDate} 00:00:00`;
                        }
                        if(params.dateCreatedTo){
                            let toDate = params.dateCreatedTo.replace(' 23:59:59','');
                            params.dateCreatedTo = `${toDate} 23:59:59`;
                        }

                        params.charityId = this.charityId;
                        return await this.rootStore.application.charity.charityStore.findGivingInsight(params);
                    }
                }
            },
            FormClass: GrantDeclineForm,
        });
        
        this.contributionStatuses;
        this.charityId = rootStore.userStore.applicationUser.id;
        this.getContributionStatusLookup();

        this.createTableStore();
        this.createSearchDonorDropdownStore();
        this.createDonationStatusDropdownStore();
        this.createDonationTypeDropdownStore();

        this.reviewModal = new ModalParams({});
        this.selectDonorModal = new ModalParams({});
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
        this.declineModal = new ModalParams({});
    }
    
    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId })
            }
        );
    }

    async getContributionStatusLookup(){
        this.contributionStatuses =  await this.rootStore.application.lookup.contributionStatusStore.find();
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId })
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => {
                this.reviewModal.close();
                this.queryUtility.fetch();
            }
        });
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorName',
                    title: 'GRANT.LIST.COLUMNS.DONOR_NAME_LABEL'
                },
                {
                    key: 'amount',
                    title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'GRANT.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'status',
                    title: 'GRANT.LIST.COLUMNS.GRANT_STATUS_NAME_LABEL'
                },
                {
                    key: 'type',
                    title: 'GRANT.LIST.COLUMNS.GRANT_TYPE_NAME_LABEL'
                },
                {
                    key: 'grantPurposeType',
                    title: 'GRANT.LIST.COLUMNS.GRANT_PURPOSE_TYPE_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onCancel: contribution => this.openCancelContribution(contribution),
                onPreview: contribution => this.routes.preview(contribution.id, contribution.donorId),
                onSort: column => this.queryUtility.changeOrder(column.key),
            },
            actionsRender: {
                onPreviewRender : item => {
                    if (item.transactionType === 'deposit') {
                        return true;
                    }
                    return false;
                },
                onCancelRender: item => {
                    if (item.status === 'Pending' && item.transactionType === 'deposit') {
                        const dateToEdit = moment(item.dateCreated).add(30, 'm');
                        return moment().isBetween(moment(item.dateCreated), dateToEdit);
                    }
                    return false;
                },
            },
        }));
    }

    createSearchDonorDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses',
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (this.rootStore.routerStore.routerState.queryParams && this.rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = this.rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses',
                            ]
                        }
                        const data = await this.rootStore.application.administration.grantStore.getDonor(id, params);
                        return { id: data.id, name: donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' }) };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter.donorId = donorId;
                }
            });
    }

    createDonationStatusDropdownStore() {
        this.donationStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.donationStatusStore.find();
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = donationStatus.map(c => { return c.id });
                }
            });
    }

    createDonationTypeDropdownStore() {
        this.donationTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.donationTypeStore.find();
                },
                onChange: (donationType) => {
                    this.queryUtility.filter.donationTypeIds = donationType.map(c => { return c.id });
                }
            });
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

}

export default GrantViewStore;
