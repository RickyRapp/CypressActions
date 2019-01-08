import _ from "lodash";
import {action, observable} from "mobx";
import {QueryUtility} from "core/utils";
import {BaseViewStore, TableViewStore} from "core/stores";

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
        return this._actions ? (typeof this._actions === 'function' ? this._actions() : this._actions) : {};
    }

    constructor(rootStore, { name, actions, routes, crumbs, queryConfig, tableConfig, autoInit = true }) {
        super();

        this.rootStore = rootStore;
        this.name = name;        
        this._actions = actions;
        _.merge(this.routes, routes);

        this.queryUtility = new QueryUtility(this.rootStore, async filter => {
            if (!this.actions.find) return;

            this.tableStore.suspend();

            const response = await this.actions.find(filter);            
            this.tableStore.setData(response);

            this.tableStore.resume();
        }, queryConfig || {});

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
            primaryColumn.onClick = (item) => this.routes.edit(item.id)
        }

        this.tableStore = tableStore;
        this.isReady.set(true);
    }

    @action.bound
    deleteResource(resource) {        
        if (!this.actions.find || !this.actions.delete) return;

        const { modalStore, notificationStore } = this.rootStore;

        modalStore.showConfirm(
            'LIST_LAYOUT.CONFIRM_DELETE',
            async () => {
                try {
                    await this.actions.delete(resource);
                    notificationStore.success('LIST_LAYOUT.SUCCESS_DELETE');
                    await this.queryUtility.fetch();
                } catch ({ statusCode, data }) {
                    notificationStore.error(
                        data && data.message
                            ? data.message
                            : 'LIST_LAYOUT.ERROR_DELETE'
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
            'LIST_LAYOUT.CONFIRM_BATCH_DELETE',
            async () => {
                try {
                    await this.actions.batchDelete(resources);
                    notificationStore.success('LIST_LAYOUT.SUCCESS_BATCH_DELETE');
                    await this.queryUtility.fetch();
                } catch ({ statusCode, data }) {
                    notificationStore.error(
                        data && data.message
                            ? data.message
                            : 'LIST_LAYOUT.ERROR_BATCH_DELETE'
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
            'LIST_LAYOUT.CONFIRM_BATCH_UPDATE',
            async () => {
                try {
                    await this.actions.batchUpdate(resources);
                    notificationStore.success('LIST_LAYOUT.SUCCESS_BATCH_UPDATE');
                    await this.queryUtility.fetch();
                }
                catch (err) {
                    notificationStore.error(
                        err.data && err.data.message
                            ? err
                            : 'LIST_LAYOUT.ERROR_BATCH_UPDATE'
                    );
                    this.tableStore.resetGridItems();
                }
            }
        )
    }
}

export default BaseListViewStore;
