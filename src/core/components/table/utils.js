import _ from 'lodash';
import {
    defaultRenderColumnsTemplate,
    defaultRenderActionsTemplate,
    defaultRenderEmptyStateTemplate,
    defaultRenderBatchActionsToolbarTemplate,
    defaultRenderSelectableColumnTemplate,
    defaultRenderNoRecordsTemplate,
} from 'themes/components/table/utils';
import { isSome } from 'core/utils';

function getPagingPropsForPager(tableStore) {
    if (_.isUndefined(tableStore) || _.isNull(tableStore)) return {};
    if (tableStore.config.disablePaging === true) return {};

    const { info, buttonCount, type, previousNext } = tableStore.config;
    return {
        skip: (tableStore.pageNumber - 1) * tableStore.pageSize,
        take: tableStore.pageSize,
        total: tableStore.recordCount,
        pageSize: tableStore.pageSize,
        pageSizes: [20, 50, 100],
        onPageChange: event => {
            const newPage = event.skip === 0 ? 1 : event.skip / tableStore.pageSize + 1;
            if (event.take !== tableStore.pageSize) {
                tableStore.setPageSize(event.take);
            } else if (tableStore.pageNumber !== newPage) {
                tableStore.setPage(newPage);
            }
        },
        info: isSome(info) ? info : true,
        buttonCount: isSome(buttonCount) ? buttonCount : 10,
        type: isSome(type) ? type : 'numeric',
        previousNext: isSome(previousNext) ? previousNext : true,
        // needs a newer version of Kendo to work
        // messagesMap: key => {
        // 	if (key === 'pager.info')
        // 		return {
        // 			messageKey: 'pager.info',
        // 			defaultMessage: '{2} items',
        // 		};
        // },
    };
}

function getPagingProps(tableStore) {
    if (_.isUndefined(tableStore) || _.isNull(tableStore)) return {};
    if (tableStore.config.disablePaging === true) return {};

    return {
        skip: (tableStore.pageNumber - 1) * tableStore.pageSize,
        total: tableStore.recordCount,
        pageSize: tableStore.pageSize,
        onPageChange: event => {
            const newPage = event.page.skip === 0 ? 1 : event.page.skip / tableStore.pageSize + 1;
            if (event.page.take !== tableStore.pageSize) {
                tableStore.setPageSize(event.page.take);
            } else if (tableStore.pageNumber !== newPage) {
                tableStore.setPage(newPage);
            }
        },
        pageable: {
            buttonCount: tableStore.config.buttonCount || 5,
            info: tableStore.recordCount > tableStore.pageSize,
            type: 'numeric',
            pageSizes: [20, 50, 100],
            previousNext: tableStore.config.previousNext || true,
        },
    };
}

function getSortingParams(tableStore) {
    if (_.isUndefined(tableStore) || _.isNull(tableStore)) return {};
    if (tableStore.config.disableSorting === true) return {};

    let sort = [];
    const orderBy = tableStore.orderBy;

    if (orderBy && orderBy !== '' && isSortable(orderBy)) {
        sort.push({
            field: tableStore.orderBy,
            dir: tableStore.orderDirection || 'asc',
        });
    }

    return {
        sortable: { allowUnsort: false },
        sort: sort,
        onSortChange: e => {
            if (e.sort.length > 0 && !isSortable(e.sort[0].field)) {
                return;
            }
            tableStore.setSort(e.sort.length > 0 ? e.sort[0].field : null);
        },
    };

    // will return false only if [sort: false] property specified in column configuration
    function isSortable(columnKey) {
        const allColumns = tableStore.config.columns;
        const col = allColumns.find(column => {
            return column.key === columnKey;
        });

        return col && col.sort !== undefined && col.sort === false ? false : true;
    }
}

function defaultRenderColumns({ t, columns }) {
    return defaultRenderColumnsTemplate({ t, columns });
}

function defaultRenderActions({ actions, actionsComponent, actionsWidth, authorization, t, actionsRender }) {
    return defaultRenderActionsTemplate({ actions, actionsComponent, actionsWidth, authorization, t, actionsRender });
}

function defaultRenderBatchActionsToolbar(tableStore, authorization, batchActionsComponent) {
    return defaultRenderBatchActionsToolbarTemplate(tableStore, authorization, batchActionsComponent);
}

function defaultRenderSelectableColumn(data) {
    return defaultRenderSelectableColumnTemplate(data);
}

function defaultRenderNoRecords(noRecordsComponent, noRecordsState) {
    return defaultRenderNoRecordsTemplate(noRecordsComponent, noRecordsState);
}

function defaultRenderEmptyState(emptyStateComponent, emptyState) {
    return defaultRenderEmptyStateTemplate(emptyStateComponent, emptyState);
}

export {
    getSortingParams,
    getPagingProps,
    defaultRenderActions,
    defaultRenderColumns,
    defaultRenderEmptyState,
    defaultRenderBatchActionsToolbar,
    defaultRenderSelectableColumn,
    defaultRenderNoRecords,
    getPagingPropsForPager,
};
