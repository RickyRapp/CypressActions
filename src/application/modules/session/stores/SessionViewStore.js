import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { SessionService } from 'application/session/services';
import { ScannerConnectionService } from 'application/scanner-connection/services';
import { applicationContext } from 'core/utils';
import { SessionListFilter } from 'application/session/models';

@applicationContext
class SessionViewStore extends BaseListViewStore {
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
                        this.rootStore.routerStore.goTo('master.app.main.session.create');
                    }
                    else {
                        rootStore.notificationStore.error('SESSION.CREATE.STEP2.SCANNER_NOT_INITIALIZED_ERROR');
                    }
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
                            'sessionCertificates',
                            'sessionCertificates.certificate',
                            'sessionCertificates.certificate.booklet',
                            'sessionCertificates.certificate.booklet.denominationType',
                            'sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                            'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                            'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
                        ];
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
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
            }
        }));

        this.service = service;
        this.rootStore = rootStore;
        this.scannerConnectionService = new ScannerConnectionService(rootStore.application.baasic.apiClient);
    }

    @action.bound
    async checkScannerConnection() {
        const params = {
            isActive: true,
            coreUserId: this.rootStore.userStore.user.id
        }
        const response = await this.scannerConnectionService.find(params);
        return response.data.item.length === 1;
    }
}

export default SessionViewStore;
