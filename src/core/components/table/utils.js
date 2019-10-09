import _ from 'lodash';
import {
    defaultRenderColumnsTemplate,
    defaultRenderActionsTemplate,
    defaultRenderBatchActionsToolbarTemplate,
    defaultRenderNoRecordsTemplate
} from 'themes/components/table/utils';

function getPagingProps(tableStore) {
    if (_.isUndefined(tableStore) || _.isNull(tableStore)) return {};
    if (tableStore.config.disablePaging === true) return {};

    return {
        skip: (tableStore.pageNumber - 1) * tableStore.pageSize,
        total: tableStore.recordCount,
        pageSize: tableStore.pageSize,
        onPageChange: (event) => {
            const newPage = event.page.skip === 0 ? 1 : (event.page.skip / tableStore.pageSize + 1);
            if (event.page.take !== tableStore.pageSize) {
                tableStore.setPageSize(event.page.take);
            } else if (tableStore.pageNumber !== newPage) {
                tableStore.setPage(newPage);
            }
        },
        pageable: {
            buttonCount: 10,
            info: true,
            type: 'numeric',
            pageSizes: [10, 20, 50],
            previousNext: true
        }
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
            dir: tableStore.orderDirection || 'asc'
        });
    }
    
    return {
        sortable: true,
        sort: sort,
        onSortChange: (e) => {
            if(e.sort.length > 0 && !isSortable(e.sort[0].field)){
                return;
            }
            tableStore.setSort(e.sort.length > 0 ? e.sort[0].field : null);
        }
    }

    // will return false only if [sort: false] property specified in column configuration
    function isSortable(columnKey){
        const allColumns = tableStore.config.columns;
        const col = allColumns.find(column => {
            return column.key === columnKey
        })

        return (col && col.sort !== undefined && col.sort === false) ? false : true;
    }
}

function defaultRenderColumns({ t, columns}) {
    return defaultRenderColumnsTemplate({ t, columns});
}

function defaultRenderActions({ actions, actionsComponent, authorization, t }) {
    return defaultRenderActionsTemplate({ actions, actionsComponent, authorization, t });
}

function defaultRenderBatchActionsToolbar(tableStore, authorization) {
    return defaultRenderBatchActionsToolbarTemplate(tableStore, authorization);
}

function defaultRenderNoRecords(noRecordsComponent) {
    return defaultRenderNoRecordsTemplate(noRecordsComponent);
}

export {
    getSortingParams,
    getPagingProps,
    defaultRenderActions,
    defaultRenderColumns,
    defaultRenderBatchActionsToolbar,
    defaultRenderNoRecords
}
