import _ from 'lodash';
import { action, observable } from 'mobx';
import { QueryUtility } from 'core/utils';
import { BaseViewStore, TableViewStore } from 'core/stores';

class BaseListViewStore extends BaseViewStore {
  @observable isReady = observable.box(false);
  rootStore = null;
  queryUtility = null;
  tableStore = null;
  name = null;
  routes = {};

  // actions should not be passed in view but only used within view store
  _actions = null;
  get actions() {
    return this._actions
      ? typeof this._actions === 'function'
        ? this._actions()
        : this._actions
      : {};
  }

  constructor(
    rootStore,
    { name, actions, routes, crumbs, queryConfig, tableConfig, autoInit = true }
  ) {
    super();

    this.rootStore = rootStore;
    this.name = name;
    this._actions = actions;
    _.merge(this.routes, routes);

    this.queryUtility = new QueryUtility(
      this.rootStore,
      async filter => {
        if (!this.actions.find) return;

        this.tableStore.suspend();

        const response = await this.actions.find(filter);
        this.tableStore.setData(response);

        this.tableStore.resume();
      },
      queryConfig || {}
    );

    this.isReady.observe(({ newValue }) => {
      if (autoInit && newValue) {
        this.fetch([this.queryUtility.initialize()]);
      }
    });

    if (tableConfig) {
      this.setTableStore(new TableViewStore(this.queryUtility, tableConfig));
    }
  }

  @action.bound
  setTableStore(tableStore) {
    const primaryColumn = _.first(tableStore.config.columns);
    if (!primaryColumn.onClick && this.routes.edit) {
      primaryColumn.onClick = item => this.routes.edit(item.id);
    }

    this.tableStore = tableStore;
    this.isReady.set(true);
  }

  @action.bound
  deleteResource(resource) {
    if (!this.actions.find || !this.actions.delete) return;

    const { modalStore, notificationStore } = this.rootStore;

    modalStore.showConfirm(
      'Are you sure you want to delete selected resource?',
      async () => {
        try {
          await this.actions.delete(resource);
          notificationStore.success('Successfully removed selected resource');
          await this.queryUtility.fetch();
        } catch ({ statusCode, data }) {
          notificationStore.error(
            data && data.message
              ? data.message
              : 'Error occurred while trying to remove selected resource'
          );
        }
      }
    );
  }

  @action.bound
  batchDeleteResources(resources) {
    if (!this.actions.find || !this.actions.batchDelete) return;

    const { modalStore, notificationStore } = this.rootStore;

    modalStore.showConfirm(
      'Are you sure you want to delete selected resources?',
      async () => {
        try {
          await this.actions.batchDelete(resources);
          notificationStore.success('Successfully removed selected resources');
          await this.queryUtility.fetch();
        } catch ({ statusCode, data }) {
          notificationStore.error(
            data && data.message
              ? data.message
              : 'Error occurred while trying to remove selected resources'
          );
        }
      }
    );
  }

  @action.bound
  batchUpdateResources(resources) {
    if (!this.actions.find || !this.actions.batchUpdate) return;

    const { modalStore, notificationStore } = this.rootStore;

    modalStore.showConfirm(
      'Are you sure you want to update selected resources?',
      async () => {
        try {
          await this.actions.batchUpdate(resources);
          notificationStore.success('Successfully updated selected resources');
          await this.queryUtility.fetch();
        } catch (err) {
          notificationStore.error(
            err.data && err.data.message
              ? err
              : 'Error occurred while trying to update selected resources'
          );
          this.tableStore.resetGridItems();
        }
      }
    );
  }
}

export default BaseListViewStore;
