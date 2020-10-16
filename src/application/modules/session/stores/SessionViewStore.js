import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionService, SessionScanService } from 'application/session/services';
import { CharityService } from 'application/charity/services';
import { SessionListFilter } from 'application/session/models';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class SessionViewStore extends BaseListViewStore {
    scanners = null;

    constructor(rootStore) {
        let filter = new SessionListFilter('dateCreated', 'desc')
        const service = new SessionService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'session',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                create: async () => {
                    this.openSelectScanner();
                },
                edit: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.session.edit',
                        {
                            id: id
                        });
                },
                preview: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.session.preview',
                        {
                            id: id
                        });
                }
            },
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.paymentTypeDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                    this.searchCharityDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'donationStatus',
                            'charity',
                            'sessionCertificates',
                            'sessionCertificates.certificate',
                            'sessionCertificates.certificate.booklet',
                            'sessionCertificates.certificate.booklet.denominationType',
                            'sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                            'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                            'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
                        ];
                        params.fields = [
                            'id',
                            'confirmationNumber',
                            'charity',
                            'amount',
                            'donationStatus',
                            'dateCreated',
                        ]
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'confirmationNumber',
                    title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                    disableClick: true,
                },
                {
                    key: 'charity.name',
                    title: 'SESSION.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'amount',
                    title: 'SESSION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'donationStatus.name',
                    title: 'SESSION.LIST.COLUMNS.STATUS_LABEL'
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
                onEditRender: (session) => {
                    return session.donationStatus.abrv === 'pending';
                }
            }
        }));

        this.selectScannerModal = new ModalParams({});

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter['charityId'] = charityId;
                }
            });

        this.scannerDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.scannerStore.find();
            },
            onChange: async () => {
                await this.setScannerConnection(this.scannerDropdownStore.value.code);
            }
        })

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
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    @action.bound
    async setScannerConnection(scannerCode) {
        const params = {
            code: scannerCode
        }
        const service = new SessionScanService(this.rootStore.application.baasic.apiClient)
        await service.setUserScannerConnection(params);
        this.goToCreatePage();
    }

    @action.bound
    goToCreatePage() {
        this.rootStore.routerStore.goTo('master.app.main.session.create');
    }

    @action.bound
    openSelectScanner() {
        this.selectScannerModal.open();
    }
}

export default SessionViewStore;
