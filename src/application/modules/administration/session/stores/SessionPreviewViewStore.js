import { BasePreviewViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import _ from 'lodash';

@applicationContext
class SessionPreviewViewStore extends BasePreviewViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'session',
            autoInit: true,
            id: rootStore.routerStore.routerState.params.id,
            routes: {},
            actions: () => {
                return {
                    get: async (id) => {
                        let params = {
                            embed: [
                                'charity',
                                'grants',
                                'grants.certificate',
                                'grant.donationStatus',
                                'grants.certificate.certificateStatus',
                                'grants.certificate.booklet',
                                'grants.certificate.booklet.denominationType',
                                'grants.certificate.booklet.bookletOrder',
                                'grants.certificate.booklet.bookletOrder.accountType',
                            ]
                        }
                        const data = await rootStore.application.administration.sessionStore.getSession(id, params);
                        this.session = data;
                        this.tableStore.setData(_.orderBy(data.sessionCertificates, sc => sc.certificate.booklet.denominationType.value, "asc"))
                        return data;
                    }
                }
            }
        });

        this.createTableStore();
    }

    createTableStore() {
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
