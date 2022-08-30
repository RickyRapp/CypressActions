import { action } from 'mobx';
import * as _ from 'lodash';
import { SelectTableWithRowDetailsViewStore } from 'core/stores';

class ReconcileSelectTableWithLoadOnDemand extends SelectTableWithRowDetailsViewStore {
    constructor(queryUtility, config = {}, isBatchSelect = false, loadChildData) {
        const cfg = _.assign({}, config, { expandField: 'expanded' });

        super(queryUtility, cfg, isBatchSelect);
        this.loadChildData = loadChildData;
    }

    @action.bound
    onExpand = async event => {
        //TODO leave only generic code
        if (!event.dataItem.details) {
            var data = await this.loadChildData(event.dataItem.id);
            if (data) {
                event.dataItem.grants = data;
            }
        }
        event.dataItem[this.config.expandField] = !event.dataItem[this.config.expandField];
        this.updateDataItems();
    };
}

export default ReconcileSelectTableWithLoadOnDemand;
