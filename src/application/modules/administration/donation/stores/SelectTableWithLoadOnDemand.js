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
        console.log('charity expanded ', event);
        if (!event.dataItem.pendingDonations) {
            var data = await this.loadChildData(event.dataItem.charityId, event.dataItem.charityAddress);
            if (data) {
                var d = this.data.find(c => { return c.charityId === event.dataItem.charityId });
                d.pendingDonations = data;
                console.log("stwrdvs expand", event);
            }
        }
        event.dataItem[this.config.expandField] = !event.dataItem[this.config.expandField];
        this.updateDataItems();
    };
}

export default SelectTableWithLoadOnDemand;
