import React from 'react';
import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionListFilter } from 'application/administration/session/models';
import { applicationContext, donorFormatter } from 'core/utils';
import { FormatterResolver } from 'core/components';
import { charityFormatter } from 'core/utils';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash'

@applicationContext
class SessionViewStore extends BaseListViewStore {
    charities = [];
	@observable charity = null;
    @observable charityInputValue = null;
	@observable filteredCharities = [];
    debouncedSearchCharities =  _.debounce(this.filterCharities, 500);
    constructor(rootStore) {
        super(rootStore, {
            name: 'session',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                create: async () => {
                    this.rootStore.routerStore.goTo('master.app.session');
                },
                edit: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.administration.session.edit', { id: id });
                },
                preview: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.administration.session.preview', { id: id });
                }
            },
            queryConfig: {
                filter: new SessionListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.paymentTypeDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                    this.searchCharityDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        if(params && params.phoneNumber) {
							params.phoneNumber = (params.phoneNumber.match(/\d/g)).join('');
						}
                        params.embed = [
                            'charity',
                            'grants',
                            'grants.certificate',
                            'grants.donationStatus',
                            'grants.certificate.denominationType'
                        ];
                        return this.rootStore.application.administration.sessionStore.findSession(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createSearchCharityDropdownStore();
        this.createPaymentTypeDropdownStore();
        this.createDonationStatusDropdownStore();
        this.createDateCreatedDateRangeQueryStore();
        this.createDonorSearchDropdownStore();
    }

    createDonorSearchDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: true,
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
                        const data = await this.rootStore.application.administration.donorStore.getDonor(id, params);
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

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'confirmationNumber',
                    title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
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
                            if(item.grants && item.grants.length > 0) {
                                if((item.grants.filter(c => c.donationStatus.abrv == 'pending')).length > 0) {
                                    return 'Pending';
                                } else if((item.grants.filter(c => c.donationStatus.abrv == 'declined')).length == item.grants.length) {
                                    return 'Declined';
                                } else if ((item.grants.filter(c => c.donationStatus.abrv == 'canceled')).length == item.grants.length) {
                                    return 'Canceled';
                                } else if ((item.grants.filter(c => c.donationStatus.abrv == 'admin-review')).length > 0) {
                                    return 'Admin Review';
                                } else if ((item.grants.filter(c => c.donationStatus.abrv == 'donor-review-first' || c.donationStatus.abrv == 'donor-review-second')).length > 0) {
                                    return 'Donor review';
                                } else if ((item.grants.filter(c => c.donationStatus.abrv == 'approved')).length > 0) {
                                    return 'Approved';
                                } else if ((item.grants.filter(c => c.donationStatus.abrv == 'payment-submited')).length > 0) {
                                    return 'Payment Submitted';
                                } else if ((item.grants.filter(c => c.donationStatus.abrv == 'payment-received')).length == item.grants.length) {
                                    return 'Payment Received';
                                } else {
                                    return 'Pending';
                                }
                            }
                            return '';
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
                onEdit: (session) => this.routes.edit(session.id),
                onPreview: (session) => this.routes.preview(session.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    if(item.grants && item.grants.length > 0) {
                        const isPending = (item.grants.filter(c => c.donationStatus.abrv == 'pending')).length > 0;
                        const isApproved = (item.grants.filter(c => c.donationStatus.abrv == 'approved')).length > 0 && (item.grants.filter(c => c.donationStatus.abrv == 'pending')).length == 0;
                        const isDonorReview = (item.grants.filter(c => c.donationStatus.abrv == 'donor-review-first' || c.donationStatus.abrv == 'donor-review-second')).length > 0;
                                
                        return isPending || isApproved || isDonorReview;
                    }
                    return false;
                }
            }
        }));

    }

    @action.bound
	setCharityId(id) {
		//this.form.$('charityId').set(id);
		const charity = this.filteredCharities.find(x => x.value === id);
        this.queryUtility.filter.charityId = id;
        this.charity = charity;
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
		await this.filterCharities(inputValue);
	};

    createSearchCharityDropdownStore() {
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.charityStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary']
                    });
                    return data.item.map(x => { return { id: x.id, name: x.name } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter.charityId = charityId;
                }
            });
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

    @action.bound
    goToCreatePage() {
        this.rootStore.routerStore.goTo('master.app.main.administration.session.create');
    }
}

export default SessionViewStore;
