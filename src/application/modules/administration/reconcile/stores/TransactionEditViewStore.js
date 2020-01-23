import { action, observable } from 'mobx';
import { BaseEditViewStore, TableViewStore } from 'core/stores';
import { TransactionEditForm } from 'application/administration/reconcile/forms';
import { ReconcileService } from 'application/administration/reconcile/services';
import { applicationContext } from 'core/utils';
import _ from 'lodash';

@applicationContext
class TransactionEditViewStore extends BaseEditViewStore {
    @observable cashedVariable = false;
    @observable voidVariable = false;

    constructor(rootStore, { onAfterEdit, transaction }) {
        const service = new ReconcileService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'transaction-edit',
            id: transaction.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.checkUpdate({ id: transaction.id, ...resource });
                    },
                    get: async () => {
                        if (transaction.json) {
                            const oldPaymentNumbers = JSON.parse(transaction.json)
                            this.tableStore.setData(_.orderBy(oldPaymentNumbers, ['dateChanged'], ['desc']))
                        }
                        return transaction;
                    }
                }
            },
            FormClass: TransactionEditForm,
            onAfterAction: onAfterEdit
        });

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

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.getResource()
        }
    }

    @action.bound
    onChangeCashed(value) {
        this.cashedVariable = value;
        if (value) {
            this.form.$('checkCashed').set(true);
            this.voidVariable = false;
        }
        else {
            this.form.$('checkCashed').set('');
        }
    }

    @action.bound
    onChangeVoid(value) {
        this.voidVariable = value;
        if (value) {
            this.form.$('checkCashed').set(false);
            this.cashedVariable = false;
        }
        else {
            this.form.$('checkCashed').set('');
        }
    }
}

export default TransactionEditViewStore;
