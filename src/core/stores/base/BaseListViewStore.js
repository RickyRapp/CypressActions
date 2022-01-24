import _ from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import { QueryUtility, compileAuthorization } from 'core/utils';
import { BaseViewStore, TableViewStore } from 'core/stores';

class BaseListViewStore extends BaseViewStore {
    @observable isReady = observable.box(false);
    queryUtility = null;
    tableStore = null;
    name = null;
    routes = null;

    // actions should not be passed in view but only used within view store
    _actions = null;
    get actions() {
        return this._actions ? (typeof this._actions === 'function' ? this._actions() : this._actions) : {};
    }

    constructor(
        rootStore,
        { name, actions, routes, queryConfig, tableConfig, autoInit = true, title, authorization, hideNavigation = false }
    ) {
        super(rootStore);

        this.name = name;
        this.routes = routes;
        this.hideNavigation = hideNavigation;
        this.authorization = compileAuthorization(authorization || rootStore.routerStore.getCurrentRoute().authorization);

        const { navigationTitle } = this.rootStore.routerStore.transitionData;
        if (navigationTitle || title) {
            this.rootStore.viewStore.setNavigationOptions({
                title: navigationTitle || title,
            });
        }

        this._actions = actions;

        this.queryUtility = new QueryUtility(
            this.rootStore,
            async filter => {
                if (!this.actions.find) return;

                this.tableStore.suspend();

                let response;
                try {
                    response = await this.actions.find(filter);
                    if (!response) {
                        response = null;
                    }
                } catch (err) {
                    response = { item: [], totalRecords: 0 };
                    rootStore.notificationStore.error('ERROR_MESSAGES.FETCH');
                }

                runInAction(() => {
                    this.tableStore.setData(response);
                    this.tableStore.resume();
                });
            },
            queryConfig || {}
        );

        this.isReady.observe(({ newValue }) => {
            if (autoInit && newValue) {
                this.fetch([this.queryUtility.initialize()]);
            }
        });

        if (tableConfig) {
            const TableStore = tableConfig.TableStore ? tableConfig.TableStore : TableViewStore;
            this.setTableStore(new TableStore(this.queryUtility, tableConfig));
        }
    }

    hasEditPermissions() {
        let hasPermission = false;
        if (this.authorization && this.authorization.edit) {
            hasPermission = this.hasPermission(this.authorization.edit);
        } else {
            hasPermission = true;
        }

        return hasPermission;
    }

    hasPermission(authorization) {
        if (this.rootStore.permissionStore.hasPermission(authorization)) {
            return true;
        }

        return false;
    }

    @action.bound
    setTableStore(tableStore) {
        const primaryColumn = _.first(tableStore.config.columns);
        if (!primaryColumn.onClick && !primaryColumn.disableClick && this.routes.edit) {
            if (this.hasEditPermissions()) primaryColumn.onClick = item => this.routes.edit(item.id);
        } else if (primaryColumn.onClick && primaryColumn.authorization) {
            if (!this.hasPermission(primaryColumn.authorization)) {
                delete primaryColumn.onClick;
            }
        }

        const nonPrimaryColumns = _.slice(tableStore.config.columns, 1);
        _.map(nonPrimaryColumns, column => {
            if (column.onClick && column.authorization) {
                if (!this.hasPermission(column.authorization)) {
                    delete column.onClick;
                }
            }
        });

        tableStore.config.columns = [primaryColumn, ...nonPrimaryColumns];
        this.tableStore = tableStore;
        this.isReady.set(true);
    }

    @action.bound
    deleteResource(resource) {
        if (!this.actions.find || !this.actions.delete) return;

        const { modalStore, notificationStore } = this.rootStore;

        modalStore.showConfirm('LIST_LAYOUT.CONFIRM_DELETE', async () => {
            try {
                await this.actions.delete(resource);
                notificationStore.success('LIST_LAYOUT.SUCCESS_DELETE');
                await this.queryUtility.fetch();
            } catch (err) {
                notificationStore.error('LIST_LAYOUT.ERROR_DELETE', err);
            }
        });
    }

    @action.bound
    batchDeleteResources(resources) {
        if (!this.actions.find || !this.actions.batchDelete) return;

        const { modalStore, notificationStore } = this.rootStore;

        modalStore.showConfirm('LIST_LAYOUT.CONFIRM_BATCH_DELETE', async () => {
            try {
                await this.actions.batchDelete(resources);
                notificationStore.success('LIST_LAYOUT.SUCCESS_BATCH_DELETE');
                await this.queryUtility.fetch();
            } catch (err) {
                notificationStore.error('LIST_LAYOUT.ERROR_BATCH_DELETE', err);
            }
        });
    }

    @action.bound
    batchUpdateResources(resources) {
        if (!this.actions.find || !this.actions.batchUpdate) return;

        const { modalStore, notificationStore } = this.rootStore;

        modalStore.showConfirm('LIST_LAYOUT.CONFIRM_BATCH_UPDATE', async () => {
            try {
                await this.actions.batchUpdate(resources);
                notificationStore.success('LIST_LAYOUT.SUCCESS_BATCH_UPDATE');
                await this.queryUtility.fetch();
            } catch (err) {
                notificationStore.error('LIST_LAYOUT.ERROR_BATCH_UPDATE', err);
                this.tableStore.resetGridItems();
            }
        });
    }

    @action.bound
    addResourceToBatchUpdate(event) {
        let { dataItem, field, value } = event;

        dataItem[field] = value;

        var originalDataItem = this.tableStore.originalData.find(obj => {
            return obj.id == dataItem.id;
        });

        if (originalDataItem && originalDataItem[field] != dataItem[field]) dataItem['isDirty'] = true;
        else dataItem['isDirty'] = false;

        this.tableStore.updateDataItems();
    }

    getItem(predicate) {
        return this.tableStore.getItem(predicate);
    }

    @computed
    get tableLoading() {
        return this.tableStore && this.tableStore.loaderStore.loading;
    }

    setChildNavigationTitle(findPredicate, getProperty, additionalText = null) {
        const item = this.getItem(findPredicate);
        if (item) {
            this.rootStore.routerStore.setTransitionData({
                navigationTitle: getProperty(item) + (additionalText ? ` - ${additionalText}` : ''),
            });
        }
    }

    @action.bound
    truncateString(data, properties) {
        _.map(data, d => {
            _.each(properties, p => (d[p[0]] = _.truncate(d[p[0]], { length: p[1] })));
        });
    }
}

export default BaseListViewStore;
