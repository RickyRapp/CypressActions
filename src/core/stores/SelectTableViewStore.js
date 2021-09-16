import _ from 'lodash';
import React from 'react';
import { action, computed, observable } from 'mobx';
import { isSome } from 'core/utils';
import { TableViewStore } from 'core/stores';
import { TableSelectColumnCell, TableSelectColumnHeader } from 'core/components';

class SelectTableViewStore extends TableViewStore {
    constructor(queryUtility, config = {}, isBatchSelect = true) {
        super(queryUtility, !isBatchSelect ? config : getSelectConfiguration(() => this, config), isBatchSelect);

        this._init(config);
    }

    _init(config) {
        if (config.onSelect) {
            this.onSelect = config.onSelect;
        }
        if (config.onSelectAll) {
            this.onSelectAll = config.onSelectAll;
        }
    }

    @computed get hasSelectedItems() {
        return this.selectedItems.length > 0;
    }

    @computed get hasSelectableItems() {
        return _.some(this.data, i => !isSome(i.disabled) || !i.disabled);
    }

    @computed get allChecked() {
        let allChecked = true;
        if (!this.hasSelectableItems) {
            allChecked = false;
        }
        _.each(this.data, item => {
            if (_.findIndex(this.selectedItems, e => e.id === item.id) === -1 && !item.disabled) {
                allChecked = false;
            }
        });

        return allChecked;
    }

    @observable selectedItems = [];

    @action setSelectedItems = value => {
        this.selectedItems = value;
    };

    @action selectItem(dataItem) {
        const item = _.find(this.selectedItems, e => e.id === dataItem.id);
        if (this.onSelect) {
            this.onSelect(dataItem, !!item);
        }
        if (item) {
            _.remove(this.selectedItems, item);
        } else {
            this.selectedItems.push(dataItem);
        }
    }

    @action selectAllItems = e => {
        if (this.onSelectAll) {
            this.onSelectAll(e);
        }

        if (e.target.checked) {
            const items = _.filter(this.data, i => !i.disabled);
            return this.setSelectedItems(items);
        }

        this.setSelectedItems([]);
    };

    @action.bound clearSelected() {
        this.selectedItems = [];
    }
}

/* eslint-disable */
function getSelectConfiguration(getStore, config) {
    const columnOverride = _.assign(config, {
        columns: [
            {
                width: '50px',
                headerCell: function () {
                    return <TableSelectColumnHeader tableStore={getStore()} />;
                },
                cell: function ({ dataItem, dataIndex, ...props }) {
                    return <TableSelectColumnCell tableStore={getStore()} dataItem={dataItem} dataIndex={dataIndex} {...props} />;
                },
            },
            ...config.columns,
        ],
    });

    return _.assign(
        {
            onDataChange: () => {
                // Reset selected items when data change occurs
                const store = getStore();
                store.setSelectedItems([]);
            },
        },
        columnOverride
    );
}
/* eslint-enable */

export default SelectTableViewStore;
