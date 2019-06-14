import { action } from 'mobx';
import { BaseListViewStore, TableViewStore } from 'core/stores'
import _ from 'lodash';

class BaseFundTransferListViewStore extends BaseListViewStore {
    setColumns = null;
    setActions = null;
    setRenderActions = null;
    setSelectedExportColumnsName = null;
    setAdditionalExportColumnsName = null;

    constructor(rootStore, config) {
        super(rootStore, config.listViewStore);

        this.setColumns = config.setColumns;
        this.selectedExportColumnsName = _.union([], config.setSelectedExportColumnsName);
        this.additionalExportColumnsName = _.union([], config.setAdditionalExportColumnsName);
        this.defaultActions = {};
        this.defaultRenderActions = {};

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: this.setColumns,
                actions: _.merge(this.defaultActions, this.setActions),
                actionsRender: _.merge(this.defaultRenderActions, this.setRenderActions)
            })
        );
    }
}


export default BaseFundTransferListViewStore;