import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/administration/grant/models';
import GrantDeclineForm from 'application/common/grant/forms';
import _ from 'lodash';
class GrantViewStore extends BaseListViewStore {
    @observable declinationTypeId;

    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                scheduledGrantsList: () => {
                },
                preview: () => {
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
                        params.embed = [
                            'grantPurposeType',
                            'createdByCoreUser',
                            'donationStatus',
                            'donationType',
                            'scheduledGrantPayment',
                            'givingCardType',
                            'certificate',
                            'certificate.booklet'
                        ];
                        params.fields = [
                            'id',
                            'donor',
                            'donor.id',
                            'donor.donorName',
                            'amount',
                            'confirmationNumber',
                            'bookletCertificateCode',
                            'donationStatus',
                            'donationType',
                            'grantPurposeType',
                            'purposeNote',
                            'dateCreated',
                            'scheduledGrantPayment',
                            'declinationTypeId',
                            'givingCardTypeId',
                            'givingCardType',
                            'url',
                            'certificate'
                        ];
                        if(params.dateCreatedFrom){
                            let fromDate = params.dateCreatedFrom.replace(' 00:00:00','');
                            params.dateCreatedFrom = `${fromDate} 00:00:00`;
                        }
                        if(params.dateCreatedTo){
                            let toDate = params.dateCreatedTo.replace(' 23:59:59','');
                            params.dateCreatedTo = `${toDate} 23:59:59`;
                        }
                        params.charityId = this.charityId;
                        return this.rootStore.application.administration.grantStore.findGrant(params);
                    }
                }
            },
            FormClass: GrantDeclineForm,
        });

        this.charityId = rootStore.userStore.applicationUser.id;

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
        const declinationReason = [{id: 1, name:'Legally binding pledge'},
                            {id: 2, name:'Charity failed to provide necessary documents'},
                            {id: 3, name:'Charity has seen its status revoked by the IRS'},
                            {id: 4, name:'This grant does not comply with the Donors Funds’ Policies and guidelines'},
                            {id: 5, name:'Earmarked grant'}];
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
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
                    key: 'donationType.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_TYPE_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if(item.donationType.abrv === 'online' || item.donationType.abrv === 'giving-card' || item.donationType.abrv === 'grant-request'){
                                return `${item.donationType.name} - ${item.confirmationNumber}`;
                            } else if(item.donationType.abrv === 'session') {
                                return `Check ${item.certificate.booklet.code}-${item.certificate.code} `;
                            } else if(item.donationType.abrv === 'charity-website') {
                                return `${item.url ? item.url : 'Charity website'} - ${item.confirmationNumber}`;
                            } else{
                                return item.donationType.name;
                            }
                        }
                    }
                },
                {
                    key: 'grantPurposeType.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_PURPOSE_TYPE_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderGrantPurposeType
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
            ]
        }));
    }


    renderGrantPurposeType(item) {
        if (item.grantPurposeType.abrv === 'other' || item.grantPurposeType.abrv === 'in-honor-of' || item.grantPurposeType.abrv === 'solicited-by' || item.grantPurposeType.abrv === 'in-memory-of') {
            return `${item.grantPurposeType.name} - ${item.purposeNote}`
        }
        return item.grantPurposeType.name;
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

}

export default GrantViewStore;
