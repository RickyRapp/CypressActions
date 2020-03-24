import { action, observable } from 'mobx';
import { BasePreviewViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { SessionService } from 'application/session/services';
import moment from 'moment';

@applicationContext
class SessionPreviewViewStore extends BasePreviewViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'session',
            autoInit: true,
            id: id,
            routes: {},
            actions: () => {
                const service = new SessionService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id) => {
                        let params = {
                            embed: [
                                'donationStatus',
                                'charity',
                                'sessionCertificates',
                                'sessionCertificates.certificate',
                                'sessionCertificates.certificate.certificateStatus',
                                'sessionCertificates.certificate.booklet',
                                'sessionCertificates.certificate.booklet.denominationType',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder',
                                'sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder.accountType',
                            ]
                        }
                        let response = await service.get(id, params);
                        this.session = response.data;
                        this.tableStore.setData(_.orderBy(response.data.sessionCertificates, sc => sc.certificate.booklet.denominationType.value, "asc"))
                        return response.data;
                    }
                }
            }
        });

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'code',
                    title: 'SESSION.EDIT.LIST.COLUMNS.CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => { return `${item.certificate.booklet.code}-${item.certificate.code}`; }
                    }
                },
                {
                    key: 'certificate.barcode',
                    title: 'SESSION.EDIT.LIST.COLUMNS.BARCODE_LABEL',
                },
                {
                    key: 'certificate.booklet.denominationType',
                    title: 'SESSION.EDIT.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'denomination',
                        value: 'short',
                        additionalField: 'blankCertificateValue'
                    }
                },
                {
                    key: 'amountAfterDeduction',
                    title: 'SESSION.EDIT.LIST.COLUMNS.VALUE_LABEL',
                    format: {
                        type: 'currency'
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        });
    }
}

export default SessionPreviewViewStore;
