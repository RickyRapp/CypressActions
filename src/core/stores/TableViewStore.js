import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { LoaderStore } from 'core/stores';

const DefaultConfig = {
    columns: [],
    actions: {},
    actionsRender: {},
    batchActions: {},
    onRowClick: () => { },
    // eslint-disable-next-line
    onDataChange: () => { },
    selectedItemKey: 'id',
};

class TableViewStore {
    fetchInProgress = false;
    loaderStore = new LoaderStore();
    @observable dataInitialized = false;
    @observable selectedItem = null;
    @observable hasRemainingData = true;

    constructor(queryUtility, config = {}, isBatchSelect = false) {
        this.queryUtility = queryUtility;
        this.isBatchSelect = isBatchSelect;
        this.config = _.assign({}, DefaultConfig, config);
        if (!this.config.columns || this.config.columns.length === 0) {
            throw new Error('TableViewStore columns are not defined.');
        }

        this.scrollTableToTop = this.scrollTableToTop.bind(this);
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

    @computed get hasSelectedItems() {
        return _.some(this.data, item => item.selected === true);
    }

    @computed get selectedItems() {
        return _.filter(this.data, ['selected', true]);
    }

    scrollTableToTop() {
        // Prevent throwing errors if no data has been initialized on load
        if (!this.dataInitialized) return;

        // When Kendo Grid is in the scrollable mode with lazy data fetch from the REST API, Grid forces the latest scroll position even
        // if the collection size has changed. That behavior triggers the onScroll function multiple times which results in sequential uncontrolled
        // fetch calls. To avoid this, scroll content back to the top.
        const table = document.getElementsByClassName('k-grid-content k-virtual-content')[0];
        if (!table) {
            return;
        }
        table.scrollTop = 0;
        // set back to true, otherwise infinite scroll doesn't work when only changing filters
        this.hasRemainingData = true;
    }

    @action.bound
    async onInfiniteScroll(event, infiniteScrollCallback) {
        if (this.fetchInProgress || !this.dataInitialized) return;

        const e = event.nativeEvent;
        if (e.target.scrollTop + 50 >= e.target.scrollHeight - e.target.clientHeight && this.hasRemainingData) {
            if (infiniteScrollCallback) {
                this.suspend();

                this.fetchInProgress = true;
                await this.fetchMore(infiniteScrollCallback);
                if (this.data.length < this.pageSize * this.pageNumber) {
                    this.hasRemainingData = false;
                }

                this.resume();
            }

            this.fetchInProgress = false;
        }
    }

    @action.bound
    async fetchMore(infiniteScrollCallback) {
        this.queryUtility.filter.pageNumber++;
        const data = await infiniteScrollCallback(this.queryUtility.filter);
        this.setData(this.data.concat(data.item));
    }

    @action.bound
    setData(data, mapper = i => i) {
        let items = data ? (data.item ? data.item : data) : [];
        const setFilter = !!items.length;
        this.setItems(items, mapper);
        this.setExpandedRows();

        if (data && data.item) {
            this.queryUtility.handleResponse(data, false, setFilter);

            if (!this.dataInitialized) {
                this.dataInitialized = true;
            }
        }

        this.config.onDataChange();
    }

    @action.bound
    setItems(items, mapper = i => i) {
        const newItems = _.map(items ? items : this.data, mapper);
        this.originalData = newItems;
        this.data = newItems;
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

    @action.bound
    setPage(page) {
        this.queryUtility.changePage(page);
    }

    @action.bound
    setPageSize(pageSize) {
        this.queryUtility.changePageSize(pageSize);
    }

    @action.bound
    setSort(sort) {
        this.queryUtility.changeOrder(sort);
    }

    @action.bound
    onItemChange(event) {
        return event;
    }

    @action.bound
    updateDataItems(data) {
        this.data = data && data.length ? data : [...this.data];
    }

    @action.bound
    resetGridItems() {
        this.data = this.originalData;
        this.setExpandedRows();
    }

    @action.bound
    setSelectedItem(item) {
        this.selectedItem = item;
        this.data = _.map(this.data, row => {
            return {
                ...row,
                selected: row[this.config.selectedItemKey] === this.selectedItem[this.config.selectedItemKey],
            };
        });
    }

    @action.bound
    addToExpanded(id) {
        this.expandedRows.push(id);
    }

    @action.bound
    removeFromExpanded(id) {
        _.remove(this.expandedRows, function (n) {
            return n == id;
        });
    }

    @action.bound
    setExpandedRows() {
        if (this.expandedRows.length < 1) {
            return;
        }

        this.data.forEach(item => {
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
