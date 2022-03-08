import { BasePreviewViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import _ from 'lodash';

@applicationContext
class remoteDepositPreviewViewStore extends BasePreviewViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'remote-deposit',
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
                                'grants.donor',
                                'grants.certificate',
                                'grants.charityVirtualTransaction',
                                'grants.charityVirtualTransaction.paymentTransaction',
                                'grant.donationStatus',
                                'grants.certificate.certificateStatus',
                                'grants.certificate.denominationType',
                                'grants.certificate.booklet'
                            ]
                        }
                        const data = await rootStore.application.administration.sessionStore.getSession(id, params);
                        this.session = data;
                        this.tableStore.setData(_.orderBy(this.session.grants, g => g.certificate.denominationType.value, "asc"));
                        if (!this.tableStore.dataInitialized) {
                            this.tableStore.dataInitialized = true;
                        }
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
                    key: 'donor.donorName',
                    title: 'SESSION.EDIT.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'certificate.barcode',
                    title: 'SESSION.EDIT.LIST.COLUMNS.BARCODE_LABEL',
                },
                {
                    key: 'amount',
                    title: 'SESSION.EDIT.LIST.COLUMNS.VALUE_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'charityVirtualTransaction.paymentTransaction.amount',
                    title: 'SESSION.EDIT.LIST.COLUMNS.AMOUNT_AFTER_FEE_LABEL',
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

export default remoteDepositPreviewViewStore;
