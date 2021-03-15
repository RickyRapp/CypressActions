import { action, observable } from 'mobx';
import { BaseEditViewStore, TableViewStore } from 'core/stores';
import { ReconcileEditForm } from 'application/administration/reconcile/forms';
import { applicationContext } from 'core/utils';
import _ from 'lodash';

@applicationContext
class ReconcileEditViewStore extends BaseEditViewStore {
    @observable cashedVariable = false;
    @observable voidVariable = false;

    constructor(rootStore, { onAfterEdit, reconcile }) {
        super(rootStore, {
            name: 'reconcile-edit',
            id: reconcile.id,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.reconcileStore.checkUpdate(resource);
                    },
                    get: async () => {
                        return reconcile;
                    }
                }
            },
            FormClass: ReconcileEditForm,
            onAfterAction: onAfterEdit
        });

        if (reconcile.json) {
            this.createTableStore();
            this.tableStore.setData(_.orderBy(JSON.parse(reconcile.json), ['dateChanged'], ['desc']));
            if (!this.tableStore.dataInitialized) {
                this.tableStore.dataInitialized = true;
            }
        }
    }

    @action.bound
    onChangeCashed(value) {
        this.cashedVariable = value;
        if (value) {
            this.form.$('isCashed').set(true);
            this.voidVariable = false;
        }
        else {
            this.form.$('isCashed').set('');
        }
    }

    @action.bound
    onChangeVoid(value) {
        this.voidVariable = value;
        if (value) {
            this.form.$('isCashed').set(false);
            this.cashedVariable = false;
        }
        else {
            this.form.$('isCashed').set('');
        }
    }

    createTableStore() {
        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_NUMBER_LABEL'

                },
                {
                    key: 'dateChanged',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                },
                {
                    key: 'description',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_DESCRIPTION_LABEL'
                }
            ]
        });
    }
}

export default ReconcileEditViewStore;
