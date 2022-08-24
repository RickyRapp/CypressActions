import React from 'react';

import { assign, some, map, forEach, get, set, remove, find, isArray, isEmpty, isNil } from 'lodash';
import { action, computed, observable, toJS } from "mobx";

import { LoaderStore } from 'core/stores';
import { QueryUtility } from 'core/utils';

import { GridEditCell } from '@progress/kendo-react-grid';

const DefaultConfig = {
    columns: [],
    actions: {},
    batchActions: {},
    hideHeader: false,
    onDataChange: () => { },
    onSelect: null,
    dataItemKey: null,
    isSelectable:false,
    onDataReset: null,
    rowCustomClassConfig: null,
    contextMenu: null,
    virtualScroll: false,
    virtualPageSize: 20,
    rootStore: null,
    customSaveTitle: null,
    hideReset: false,
    // used for optimization only - determines whether a given table row should rerender whenever dataItem changes
    // returns boolean, where true means that row should rerender
    comparerFunction: null,
    isDirtyPropertyCheck: 'isDirty',
    deleteRightBtnPos: false,
    handleBoolean: true
};

class TableViewStore {
    isBatchSelect = false;
    loaderStore = new LoaderStore();

    @observable selectedField = null;
    @observable dataInitialized = false;
    @observable rowCustomClassEnabled = true;
    @observable contextMenuPosition = null;
    @observable data = [];
    @observable disableCopyFunc = false;
    @observable disableDeleteFunc = false;

    @observable skip = 0; // when using virtual scrolling

    originalData = [];
    expandedRows = [];

    constructor(queryUtility, config = {}) {
        this.queryUtility = queryUtility || new QueryUtility(config.rootStore);
        this.config = assign({}, DefaultConfig, config);
        if (this.config.rowCustomClassConfig && !isArray(this.config.rowCustomClassConfig)) {
            this.config.rowCustomClassConfig = [this.config.rowCustomClassConfig];
        }

        if (!this.config.columns || this.config.columns.length === 0) {
            throw new Error('TableViewStore columns are not defined.');
        }

        // resolve cellProps if passed
        this.config.columns = resolveColumns(this.config.columns);
    }

    @computed get items() {
        if (this.config.virtualScroll) {
            return this.data.slice(this.skip, this.config.virtualPageSize + this.skip);
        } else {
            return this.data.slice();
        }
    }

    @computed get numberOfItems() {
        return this.data.length;
    }

    @computed get hasData() {
        return this.data.length > 0;
    }

    @computed get pageNumber() {
        return this.queryUtility.filter.pageNumber;
    }

    @computed get pageSize() {
        return this.queryUtility.filter.pageSize;
    }

    @computed get orderBy() {
        return this.queryUtility.filter.orderBy;
    }

    @computed get orderDirection() {
        return this.queryUtility.filter.orderDirection;
    }

    @computed get recordCount() {
        return this.queryUtility.recordCount;
    }

    @computed get hasItems() {
        return this.data && this.data.length > 0;
    }

    @computed get hasDirtyItems() {
        return some(this.data, item => {
            const isDirty = get(item, this.config.isDirtyPropertyCheck);
            const result = isArray(isDirty) ? !isEmpty(isDirty) : (isDirty === true);
            return result;
        });
    }

    @computed get hasErroredItems() {
        return some(this.data, item => item && item.errorField && item.errorField !== undefined && item.errorField.length > 0);
    }

    @action.bound async setData(data, mapper = (i) => i) {
        let keys = [];
        forEach(this.config.columns, function (item) {
            if (item.key) keys.push(item.key)
        });

        let items = data.item ? data.item : data;

        forEach(items, item => {
            forEach(keys, key => {
                if (isNil(get(item, key))) {
                    set(item, key, "");
                }
            });
        });

        items = map(items, mapper);

        const booleanItems = [];
        forEach(this.config.columns, function (item) {
            if (item.editor === 'boolean') {
                booleanItems.push(item.key);
            }
        });

        booleanItems.forEach(booleanItem=>{
            items.forEach(item=> {
                if (get(item, booleanItem) !== true) {
                    this.config.handleBoolean && set(item, booleanItem, false);
                } else if (get(item, booleanItem) === true) {
                    set(item, booleanItem, true);
                }
            })
        });

        this.data = items;
        this.originalData = toJS(this.data);

        this.expandRows();

        if (data.item && this.queryUtility) {
            await this.queryUtility.handleResponse(data);
        }

        this.dataInitialized = true;

        this.config.onDataChange(data);
    }

    @action.bound onPageChange(e) {
        this.skip = e.page.skip; // when using virtual scrolling
    }

    @computed get loading() {
        return this.loaderStore.loading;
    }

    @action.bound suspend() {
        if (this.loaderStore.loading) return;
        this.loaderStore.suspend();
    }

    @action.bound resume() {
        this.loaderStore.resume();
    }

    @action.bound setPage = (page) => {
        return this.queryUtility.changePage(page);
    }

    @action.bound setPageSize = (pageSize) => this.queryUtility.changePageSize(pageSize);
    @action.bound setSort = (sort) => this.queryUtility.changeOrder(sort);
    @action.bound onItemChange = (event) => event;

    @action.bound updateDataItems() {
        this.data = [...this.data]; // force rerender
    }

    @action.bound resetGridItems() {
        this.data.replace(this.originalData); // replace is an Observable object method

        this.expandRows();

        if (this.config.onDataReset) {
            this.config.onDataReset();
        }
    }

    @action.bound addToExpanded(id) {
        remove(this.expandedRows, (function (n) {
            return n == id;
        }));
        this.expandedRows.push(id);
    }

    @action.bound removeFromExpanded(id) {
        remove(this.expandedRows, (function (n) {
            return n == id;
        }));
    }

    @action.bound expandRows() {
        if (this.expandedRows.length === 0) {
            return;
        }

        this.data.forEach((item) => {
            item[this.config.expandField] = this.expandedRows.find(function (element) {
                return element == item.id;
            });
        });
    }

    getItem(predicate) {
        return find(this.data, predicate);
    }
}

export default TableViewStore;


function resolveColumns(columns) {
    columns.forEach(col=>{
        if(col.cell && col.cell !== GridEditCell){
            const CustomCell = col.cell; // you cannot use col.cell as component name
            const cell = (props)=><CustomCell {...col.cellProps} onClick={col.onClick || null} onDoubleClick={col.onDoubleClick || null} {...col} {...props} />
            col.cell = cell;
        }
    });

    return columns;
}
