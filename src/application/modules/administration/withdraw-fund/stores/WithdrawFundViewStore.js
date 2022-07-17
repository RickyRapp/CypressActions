import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { GrantRouteService } from 'application/common/grant/services';
import { charityFormatter, donorFormatter, isSome } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/administration/grant/models';
import moment from 'moment'
import GrantDeclineForm from 'application/common/grant/forms';
import _ from 'lodash';
class WithdrawFundViewStore extends BaseListViewStore {
    @observable declinationTypeId;
    charities = [];
	@observable charity = null;
    @observable charityInputValue = null;
	@observable filteredCharities = [];
    debouncedSearchCharities =  _.debounce(this.filterCharities, 500);
    constructor(rootStore) {
        super(rootStore, {
            name: 'withdraw-fund',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                preview: (editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.preview', { id: editId });
                },
            },
            queryConfig: {
                filter: new GrantListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.donationStatusDropdownStore.setValue(null);
                    this.donationTypeDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                    this.searchCharityDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'grantPurposeType',
                            'createdByCoreUser',
                            'donor',
                            'donationStatus',
                            'donationType',
                            'scheduledGrantPayment',
                            'givingCardType',
                            'charity.charityBankAccounts'
                        ];
                        params.fields = [
                            'id',
                            'charity',
                            'charity.name',
                            'donor',
                            'donor.id',
                            'donor.donorName',
                            'amount',
                            'confirmationNumber',
                            'donationStatus',
                            'donationType',
                            'grantPurposeType',
                            'purposeNote',
                            'dateCreated',
                            'scheduledGrantPayment',
                            'declinationTypeId',
                            'givingCardTypeId',
                            'givingCardType',
                            'checkDeclinationReason',
                            'charityId',
                            'grantAcknowledgmentTypeId',
                            'grantPurposeTypeId',
                            'charity.isAchAvailable'
                        ];
                        if(params.dateCreatedFrom){
                            let fromDate = params.dateCreatedFrom.replace(' 00:00:00','');
                            params.dateCreatedFrom = `${fromDate} 00:00:00`;
                        }
                        if(params.dateCreatedTo){
                            let toDate = params.dateCreatedTo.replace(' 23:59:59','');
                            params.dateCreatedTo = `${toDate} 23:59:59`;
                        }
                        params.isWithdraw = true;
                        return this.rootStore.application.administration.grantStore.findGrant(params);
                    }
                }
            },
            FormClass: GrantDeclineForm,
        });

        this.createTableStore();
        this.createSearchCharityDropdownStore();
        this.createDonationStatusDropdownStore();

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

    @action.bound
	setCharityId(id) {
		const charity = this.filteredCharities.find(x => x.value === id);
		this.charity = charity;
        this.queryUtility.filter.charityId = id;
		//this.setAddress(charity.item.charityAddresses[0]);
	} 
	@action.bound
	async filterCharities(inputValue, resolve) {
		const data = await this.rootStore.application.administration.grantStore.searchCharity({
			pageNumber: 1,
			pageSize: 10,
			search: inputValue,
			sort: 'name|asc',
			embed: ['charityAddresses'],
			fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary'],
		});
		const mapped = data.item.map(x => {
			return {
				id: x.id,
				name: charityFormatter.format(x, { value: 'charity-name-display' }),
				item: x,
			};
		});
		let options = [];
		mapped.forEach(item => {
			options.push({value: item.id, label:item.name, item: item.item});
		});
		this.filteredCharities = options;
		return resolve(options);
	};
	
	@action.bound
	async charityLoadOptions(inputValue) {
		await this.debounceCharitySearch(inputValue);
	};

    createTableStore() {
        const declinationReason = [{id: 1, name:'Legally binding pledge'},
                            {id: 2, name:'Charity failed to provide necessary documents'},
                            {id: 3, name:'Charity has seen its status revoked by the IRS'},
                            {id: 4, name:'This grant does not comply with the Donors Funds’ Policies and guidelines'},
                            {id: 5, name:'Earmarked grant'}];
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    onClick: (grant) => grant.donationStatus.abrv === 'pending' ?
                        this.routes.edit(grant.id, grant.donor.id) :
                        this.routes.preview(grant.id)
                },
                {
                    key: 'charity.name',
                    title: 'GRANT.LIST.COLUMNS.CHARITY_LABEL',
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
                    key: 'donationStatus.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_STATUS_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if(item.declinationTypeId != null && typeof item.declinationTypeId != 'undefined'){
                                return `Declined - ${(declinationReason.filter(x => x.id == item.declinationTypeId)).length > 0 ? declinationReason.filter(x => x.id == item.declinationTypeId)[0].name : 'other'}`;
                            } else {
                                return item.donationStatus.name;
                            }
                        }
                    }
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
                onRedirect: (grant) => this.routes.scheduledGrantsList(grant.scheduledGrantPayment.name),
                onPreview: (grant) => this.routes.preview(grant.id),
                onApprove: (grant) => this.approveGrant(grant),
                onCancel: (grant) => this.cancelGrant(grant),
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onDecline: (grant) => this.onDeclineClick(grant),
                onDonorDeclined: (grant) => this.onDonorDeclinedClick(grant),
                onDonorReview: (grant) => this.onDonorReviewClick(grant)
            },
            actionsRender: {
                onRedirectRender: (grant) => {
                    return isSome(grant.scheduledGrantPayment)
                },
                onApproveRender: (grant) => {
                    return grant.donationType.abrv !== 'session' && grant.donationStatus.abrv === 'pending';
                },
                onCancelRender: (grant) => {
                    return grant.donationType.abrv !== 'session' && (grant.donationStatus.abrv === 'pending' || grant.donationStatus.abrv === 'approved');
                },
                onDeclineRender: (grant) => {
                    return grant.donationStatus.abrv === 'pending' || grant.donationStatus.abrv === 'approved';
                },
                onDonorDeclinedRender: (grant) => {
                    return grant.donationStatus.abrv === 'donor-review-declined';
                },
                onDonorReviewRender: (grant) => {
                    return grant.donationStatus.abrv === 'donor-review-first' || grant.donationStatus.abrv === 'donor-review-second';
                }
            }
        }));
    }

    @action.bound
    async onDonorDeclinedClick(grant) {
        this.rootStore.modalStore.showConfirm(
            `Confirm check declination by donor (reason: '${grant.checkDeclinationReason}') for Grant #${grant.confirmationNumber}?`,
            async () => {
                const donationStatusLkp = await this.rootStore.application.lookup.donationStatusStore.find();
                grant.donationStatusId = (donationStatusLkp.find(x => x.abrv == 'declined')).id;
                await this.rootStore.application.administration.grantStore.updateGrant(grant);
                this.queryUtility.fetch();
            },
            async () => {
                const donationStatusLkp = await this.rootStore.application.lookup.donationStatusStore.find();
                grant.donationStatusId = (donationStatusLkp.find(x => x.abrv == 'approved')).id;
                await this.rootStore.application.administration.grantStore.updateGrant(grant);
                this.rootStore.modalStore.confirmParams.close();
                this.queryUtility.fetch();
            }
        );
    }

    @action.bound
    async onDonorReviewClick(grant) {
        this.rootStore.modalStore.showConfirm(
            `Approve check waiting for donor review, for Grant #${grant.confirmationNumber}?`,
            async () => {
                const donationStatusLkp = await this.rootStore.application.lookup.donationStatusStore.find();
                grant.donationStatusId = (donationStatusLkp.find(x => x.abrv == 'approved')).id;
                await this.rootStore.application.administration.grantStore.updateGrant(grant);
                this.queryUtility.fetch();
            },
            async () => {
                const donationStatusLkp = await this.rootStore.application.lookup.donationStatusStore.find();
                grant.donationStatusId = (donationStatusLkp.find(x => x.abrv == 'declined')).id;
                grant.checkDeclinationReason = '[Admin completed review for donor]';
                await this.rootStore.application.administration.grantStore.updateGrant(grant);
                this.rootStore.modalStore.confirmParams.close();
                this.queryUtility.fetch();
            }
        );
    }

    //#region MODAL
	@action.bound
	async onDeclineClick(grant) {
		this.declineModal.open({
            onCancel: () => {
                this.declineModal.close();
            },
            onDecline: async () => {
                    const declinationReason = document.getElementsByName('declinationReason');
                    let reasonId;
                    for(let i = 0; i < declinationReason.length; i++) {
                        if(declinationReason[i].checked)
                            reasonId = declinationReason[i].id;
                    }
                    try {
                        if(reasonId>5 || reasonId<1 || typeof reasonId === 'undefined') {
                            this.rootStore.notificationStore.error('Declination reason not selected!');
                            return;
                        }
                        await this.rootStore.application.administration.grantStore.declineGrant({ id: grant.id , declinationTypeId: reasonId});
                        this.queryUtility.fetch();
                        this.rootStore.notificationStore.success('Successfully declined grant.');
                        this.declineModal.close();
                    } catch ({ data }) {
                        if (data && data.message) {
                            this.rootStore.notificationStore.error(data.message);
                        }
                        else {
                            this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
                        }
                    }
            },
            declinationTypeId: this.declinationTypeId
        })
	}
	//#endregion

    @action.bound
    async cancelGrant(grant) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to cancel grant #${grant.confirmationNumber}?`,
            async () => {
                try {
                    await this.rootStore.application.administration.grantStore.cancelGrant({ id: grant.id });
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

    createSearchCharityDropdownStore() {
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.grantStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary']
                    });
                    return data.item.map(x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }), item: x } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter.charityId = charityId;
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

}

export default WithdrawFundViewStore;
