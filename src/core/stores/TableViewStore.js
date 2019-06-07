import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { LoaderStore } from 'core/stores';

const DefaultConfig = {
  columns: [],
  actions: {},
  actionsRender: {},
  batchActions: {},
  onDataChange: data => { }
};

class TableViewStore {
  isBatchSelect = false;
  loaderStore = new LoaderStore();
  @observable dataInitialized = false;

  constructor(queryUtility, config = {}) {
    this.queryUtility = queryUtility;

    this.config = _.assign(DefaultConfig, config);
    if (!this.config.columns || this.config.columns.length === 0) {
      throw new Error('TableViewStore columns are not defined.');
    }
  }

  originalData = [];

  @observable data = [];

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

  @action.bound setData(data) {
    let items = data.item ? data.item : data;
    this.originalData = items;
    this.data = items;

    if (data.item) {
      this.queryUtility.handleResponse(data);
    }

    this.dataInitialized = true;
    this.config.onDataChange(data);
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

  @action.bound setPage = page => this.queryUtility.changePage(page);
  @action.bound setPageSize = pageSize => this.queryUtility.changePageSize(pageSize);
  @action.bound setSort = sort => this.queryUtility.changeOrder(sort);
  @action.bound onItemChange = event => event;
}

export default TableViewStore;
