import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { SessionScanEditForm } from 'application/administration/session/forms';
import _ from 'lodash';

@applicationContext
class SessionScanEditViewStore extends BaseEditViewStore {

    constructor(rootStore) {
        super(rootStore, {
            name: 'session-scan-edit',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        // await rootStore.application.administration.sessionStore.updateSession({ isWithApproval: true, ...resource });
                    },
                    get: async (id) => {
                        const item = [];
                        for (let i = 0; i < 11; i ++) {
                            item.push({
                                barcode: Math.floor(Math.random() * 10000),
                                amount: Math.floor(Math.random() * 1000).toFixed(2),
                                frontImage: 1231231,
                                backImage: 1231231,
                                dateCreated: new Date(),
                            })
                        }

                        this.tableStore.setData(item);
                        
                        if (!this.tableStore.dataInitialized) {
                            this.tableStore.dataInitialized = true;
                        }

                        return item[0];
                    }
                }
            },
            FormClass: SessionScanEditForm,
        });

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'barcode',
                    title: 'Barcode',
                },
                {
                    key: 'amount',
                    title: 'Amount',
                },
                {
                    key: 'frontImage',
                    title: 'Front image',
                },
                {
                    key: 'backImage',
                    title: 'Back image',
                },
            ],
            actions: {
                onRemove: (grant) => {},
            },
            actionsRender: {}
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.id)
            ]);
        }
    }
}

export default SessionScanEditViewStore;
