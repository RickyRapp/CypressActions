import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from "core/stores";
import { remoteDepositService } from "application/charity/remote-deposit/services";
import React from "react";
import { FormatterResolver } from "core/components";
import { action, observable } from "mobx";
import { SessionListFilter } from "application/charity/remote-deposit/models";
import { donorFormatter } from "core/utils";
class RemoteDepositsViewStore extends BaseListViewStore {
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
                    this.rootStore.routerStore.goTo("master.app.session");
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
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async params => {
                        if (params && params.phoneNumber) {
                            params.phoneNumber = (params.phoneNumber.match(/\d/g)).join('');
                        }
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
                                        <span data-tip={`${item.json}`} data-type="info" style={{ cursor: 'pointer' }}>
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
                                    const isPending = (item.grants.filter(c => c.donationStatus.abrv == 'pending')).length > 0;
                                    const isDonorReview = (item.grants.filter(c => c.donationStatus.abrv == 'donor-review-first' || c.donationStatus.abrv == 'donor-review-second')).length > 0;
                                    const isApproved = (item.grants.filter(c => c.donationStatus.abrv == 'approved')).length > 0 && (item.grants.filter(c => c.donationStatus.abrv == 'pending')).length == 0 && !isDonorReview;
                                    const isCanceled = (item.grants.filter(c => c.donationStatus.abrv == 'canceled')).length == item.grants.length;
                                    const isPaymentSubmited = ((item.grants.filter(c => c.donationStatus.abrv == 'canceled')).length + (item.grants.filter(c => c.donationStatus.abrv == 'payment-submited')).length + (item.grants.filter(c => c.donationStatus.abrv == 'payment-received')).length) == item.grants.length;
                                    const isPaymentReceived = ((item.grants.filter(c => c.donationStatus.abrv == 'canceled')).length + (item.grants.filter(c => c.donationStatus.abrv == 'payment-received')).length) == item.grants.length;
                                    const isDonorDeclined = (item.grants.filter(c => c.donationStatus.abrv == 'donor-review-declined')).length > 0;
                                
                                    if(isPending) {
                                        return 'Pending';
                                    } else if (isApproved) {
                                        return 'Approved';
                                    } else if (isCanceled) {
                                        return 'Canceled';
                                    } else if (isPaymentSubmited) {
                                        return 'Payment Submitted';
                                    } else if (isPaymentReceived) {
                                        return 'Payment Received';
                                    } else if (isDonorDeclined) {
                                        return 'Declined by Donor';
                                    } else if(isDonorReview) {
                                        return 'Donor Review';
                                    }
                                    else {
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

export default RemoteDepositsViewStore;