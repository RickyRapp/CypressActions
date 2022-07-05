import { action } from 'mobx';
import * as _ from 'lodash';
import { SelectTableWithRowDetailsViewStore } from 'core/stores';

class SelectTableWithLoadOnDemand extends SelectTableWithRowDetailsViewStore {
    constructor(queryUtility, config = {}, isBatchSelect = false, loadChildData) {
        const cfg = _.assign({}, config, { expandField: 'expanded' });

        super(queryUtility, cfg, isBatchSelect);
        this.loadChildData = loadChildData;
    }

    @action.bound
    onExpand = async event => {
        //TODO leave only generic code
        if (!event.dataItem.pendingDonations) {
            var data = await this.loadChildData(event.dataItem.charityId, event.dataItem.charityAddress, event.dataItem.isWithdraw);
            if (data) {
                var d = this.data.find(c => { return c.charityId === event.dataItem.charityId });
                event.dataItem.pendingDonations = data;
            }
        }
        event.dataItem[this.config.expandField] = !event.dataItem[this.config.expandField];
        this.updateDataItems();
    };
}

export default SelectTableWithLoadOnDemand;
