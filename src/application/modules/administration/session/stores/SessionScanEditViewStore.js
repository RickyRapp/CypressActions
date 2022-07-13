import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import TableImageCell from 'core/components/table/TableImageCell';
import _ from 'lodash';
import { GridNumericCell } from 'core/components';

@applicationContext
class SessionScanEditViewStore extends BaseListViewStore {

    constructor(rootStore) {
        super(rootStore, {
            name: 'session-scan-edit',
            routes: {},
            actions: () => {
                return {
                    find: async () => {
                        const response = await rootStore.application.administration.sessionStore.getScannedSessionDetails(this.id);
                        return response;
                    }
                }
            },
        });

        this.id = rootStore.routerStore.routerState.params.id;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'barcode',
                    title: 'Barcode',
                    cell: GridNumericCell,
                    onChange: this.onTableItemChange
                },
                {
                    key: 'value',
                    title: 'Amount',
                    cell: GridNumericCell,
                    onChange: this.onTableItemChange
                },
                {
                    key: 'mediaGalleryReview.frontImage',
                    title: 'Front image',
                    cell: TableImageCell
                },
                {
                    key: 'mediaGalleryReview.backImage',
                    title: 'Back image',
                    cell: TableImageCell
                },
                {
                    key: 'dateCreated',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            batchActions: {
                onBatchUpdate: async (items) => {
                    console.log(items)
                    const dirtyItems = items.filter(i => i.isDirty);

                    debugger
                }
            },
            disablePaging: true,
            actionsRender: {}
        }));
    }

    @action.bound
    onTableItemChange({ dataItem, field, value }) {
        dataItem[field] = value;
        dataItem.isDirty = true;
        this.tableStore.updateDataItems();
    }
}

export default SessionScanEditViewStore;
