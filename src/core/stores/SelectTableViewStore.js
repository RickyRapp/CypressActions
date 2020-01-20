import React from 'react';
import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { TableViewStore } from 'core/stores';
import { TableSelectColumnCell, TableSelectColumnHeader } from 'core/components';

class SelectTableViewStore extends TableViewStore {
    isBatchSelect = true;

    constructor(queryUtility, config = {}) {
        super(queryUtility, getSelectConfiguration(() => this, config));
    }

    @computed get hasSelectedItems() {
        return this.selectedItems.length > 0;
    }

    @observable globalCheck = false;
    @observable selectedItems = [];

    @action setGlobalCheck = (value) => this.globalCheck = value;
    @action setSelectedItems = (value) => {
        this.selectedItems = value;
    };
}

/* eslint-disable */
function getSelectConfiguration(getStore, config) {
    const columnOverride = _.assign(config, {
        columns: [{
            width: '50px',
            headerCell: function () {
                return <TableSelectColumnHeader tableStore={getStore()} />
            },
            cell: function ({ dataItem, dataIndex, ...props }) {
                return <TableSelectColumnCell tableStore={getStore()} dataItem={dataItem} dataIndex={dataIndex} {...props} />
            }
        }, ...config.columns],
    });

    return _.assign({
        onDataChange: () => {
            // Reset selected items when data change occurs
            const store = getStore();
            store.setSelectedItems([]);
            store.setGlobalCheck(false);
        }
    }, columnOverride);
}
/* eslint-enable */

export default SelectTableViewStore;
