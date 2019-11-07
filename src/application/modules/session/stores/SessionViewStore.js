import { action, runInAction } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { SessionService } from 'application/session/services';
import { ScannerConnectionService } from 'application/scanner-connection/services';
import { applicationContext, isSome } from 'core/utils';
import { SessionListFilter } from 'application/session/models';
import { ModalParams } from 'core/models';
import { LookupService } from 'common/services';

@applicationContext
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
                    const response = await this.checkScannerConnection();
                    if (response) {
                        this.goToCreatePage();
                    }
                    else {
                        this.openSelectScanner();
                        // rootStore.notificationStore.error('SESSION.CREATE.STEP2.SCANNER_NOT_INITIALIZED_ERROR');
                    }
                },
                edit: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.session.edit',
                        {
                            id: id
                        });
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'sessionStatus',
                            'donation',
                            'donation.charity',
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
                            'donation',
                            'donation.charity',
                            'amount',
                            'sessionStatus',
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
                    title: 'SESSION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL'
                },
                {
                    key: 'donation.charity.name',
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
                    key: 'sessionStatus.name',
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
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (session) => {
                    return session.sessionStatus.abrv === 'pending';
                },
            }
        }));

        this.service = service;
        this.rootStore = rootStore;
        this.scannerConnectionService = new ScannerConnectionService(rootStore.application.baasic.apiClient);
        this.scannerDropdownStore = new BaasicDropdownStore(null, {
            onChange: async (scannerId) => {
                const scanner = this.scannerDropdownStore.value;
                await this.setScannerConnection(scanner.code);
            }
        })
        this.fetchScanners();

        this.selectScannerModal = new ModalParams({});
    }

    @action.bound
    async setScannerConnection(scannerCode) {
        const params = {
            code: scannerCode
        }
        await this.scannerConnectionService.create(params);
        this.goToCreatePage();
    }

    @action.bound
    async checkScannerConnection() {
        const params = {
            isActive: true,
            coreUserId: this.rootStore.userStore.user.id
        }
        const response = await this.scannerConnectionService.find(params);
        if (response.data.item.length === 1) {
            return isSome(response.data.item.scannerId);
        }
        return false;
    }

    @action.bound
    async fetchScanners() {
        this.scannerDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'scanner');
        const response = await service.getAll();
        runInAction(() => {
            this.scannerDropdownStore.setItems(response.data);
            this.scannerDropdownStore.setLoading(false);
        });
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
