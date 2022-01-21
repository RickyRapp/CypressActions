import { action } from 'mobx';
import * as _ from 'lodash';
import { SelectTableViewStore } from 'core/stores';

class SelectTableWithRowDetailsViewStore extends SelectTableViewStore {
    constructor(queryUtility, config = {}, isBatchSelect = false) {
        const cfg = _.assign({}, config, { expandField: 'expanded' });

        super(queryUtility, cfg, isBatchSelect);
    }

    @action.bound
    onExpand = event => {
        console.log('base on Expand', event);
        event.dataItem[this.config.expandField] = !event.dataItem[this.config.expandField];
        this.updateDataItems();
    };
}

export default SelectTableWithRowDetailsViewStore;
