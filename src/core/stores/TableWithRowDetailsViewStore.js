import { action} from 'mobx';
import * as _ from 'lodash';
import {TableViewStore} from 'core/stores';

class TableWithRowDetailsViewStore extends TableViewStore {
    constructor(queryUtility, config = {}) {
        const cfg = _.assign({}, config, { expandField: 'expanded' });

        super(queryUtility, cfg);
    }

    @action.bound
    onExpand = event => {
        event.dataItem[this.config.expandField] = !event.dataItem[this.config.expandField];

        if(event.dataItem[this.config.expandField]){
            this.addToExpanded(event.dataItem.id);
        }else{
            this.removeFromExpanded(event.dataItem.id);
        }
        
        this.updateDataItems();
    };
}

export default TableWithRowDetailsViewStore;
