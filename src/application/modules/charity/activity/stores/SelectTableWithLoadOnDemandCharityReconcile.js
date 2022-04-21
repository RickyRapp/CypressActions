import { action } from 'mobx';
import * as _ from 'lodash';
import { SelectTableWithRowDetailsViewStore } from 'core/stores';

class SelectTableWithLoadOnDemandCharityReconcile extends SelectTableWithRowDetailsViewStore {
    constructor(queryUtility, config = {}, isBatchSelect = false, loadChildData) {
        const cfg = _.assign({}, config, { expandField: 'expanded' });

        super(queryUtility, cfg, isBatchSelect);
        this.loadChildData = loadChildData;
    }

    @action.bound
    onExpand = async event => {
        //TODO leave only generic code
        if (!event.dataItem.allGrants) {
            var data = await this.loadChildData(event.dataItem.id);
            if (data) {
                var d = this.data.find(c => { return c.id === event.dataItem.id });
                event.dataItem.allGrants = data;
            }
        }
        event.dataItem[this.config.expandField] = !event.dataItem[this.config.expandField];
        this.updateDataItems();
    };
}

export default SelectTableWithLoadOnDemandCharityReconcile;
