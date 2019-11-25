import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { LoaderStore } from 'core/stores';

const DefaultConfig = {
    columns: [],
    actions: {},
    batchActions: {},
    // eslint-disable-next-line
    onDataChange: () => {
    }
};

class TableViewStore {
    isBatchSelect = false;
    loaderStore = new LoaderStore();
    @observable dataInitialized = false;

    constructor(queryUtility, config = {}) {
        this.queryUtility = queryUtility;

        this.config = _.assign({}, DefaultConfig, config);
        if (!this.config.columns || this.config.columns.length === 0) {
            throw new Error('TableViewStore columns are not defined.');
        }
    }

    originalData = [];
    expandedRows = [];

    @observable data = [];

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
        return _.some(this.data, item => item.isDirty === true);
    }

    @computed get hasErroredItems() {
        return _.some(this.data, item => item.errorField && item.errorField.length > 0);
    }

    @action.bound setData(data, mapper = (i) => i) {
        let items = data.item ? data.item : data;
        items = _.map(items, mapper);
        this.originalData = items;
        this.data = items;

        this.setExpandedRows();

        if (data.item) {
            this.queryUtility.handleResponse(data);
        }

        this.dataInitialized = true;
        this.config.onDataChange();
    }

    @computed get loading() {
        return this.loaderStore.loading;
    }

    @action.bound suspend() {
        this.loaderStore.suspend();
    }

    @action.bound resume() {
        this.loaderStore.resume();
    }

    @action.bound setPage = (page) => this.queryUtility.changePage(page);
    @action.bound setPageSize = (pageSize) => this.queryUtility.changePageSize(pageSize);
    @action.bound setSort = (sort) => this.queryUtility.changeOrder(sort);
    @action.bound onItemChange = (event) => event;

    @action.bound updateDataItems() {
        this.data = [...this.data];
    }

    @action.bound resetGridItems() {
        this.data = this.originalData;
        this.setExpandedRows();
    }

    @action.bound addToExpanded(id) {
        this.expandedRows.push(id);
    }

    @action.bound removeFromExpanded(id) {
        _.remove(this.expandedRows, (function (n) {
            return n == id;
        }));
    }

    @action.bound setExpandedRows() {
        if (this.expandedRows.length < 1) {
            return;
        }

        this.data.forEach((item) => {
            item[this.config.expandField] = this.expandedRows.find(function (element) {
                return element == item.id;
            });
        });
    }

    getItem(predicate) {
        return _.find(this.data, predicate);
    }
}

export default TableViewStore;
