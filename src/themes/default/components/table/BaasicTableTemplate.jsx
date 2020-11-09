import _ from 'lodash';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTableLoader, ContentWithEmptyState } from 'core/components';
import { Grid } from '@progress/kendo-react-grid';
import {
    getSortingParams,
    getPagingProps,
    defaultRenderActions,
    defaultRenderColumns,
    defaultRenderBatchActionsToolbar,
    rowRender,
} from 'core/components/table/utils';

const BaasicTableTemplate = function ({
    tableStore,
    loading,
    actionsComponent,
    batchActionsComponent,
    noRecordsComponent,
    noRecordsState = {},
    emptyStateComponent,
    emptyState = {},
    authorization,
    t,
    onScroll,
    infiniteScrollCallback,
    ...otherProps
}) {
    const {
        isBatchSelect,
        data,
        config: { columns, actions, actionsRender, actionsWidth, onRowClick, customRowRender, ...otherStoreFields },
        onInfiniteScroll,
        hasData,
        dataInitialized,
    } = tableStore;

    const isLoading = !_.isNil(loading) ? loading : tableStore.loading;
    return (
        <Fragment>
            <ContentWithEmptyState
                loading={isLoading}
                hasData={hasData}
                dataInitialized={dataInitialized}
                noRecordsComponent={noRecordsComponent}
                noRecordsState={noRecordsState}
                emptyStateComponent={emptyStateComponent}
                emptyState={emptyState}
            >
                <Grid
                    data={data.slice()}
                    onScroll={infiniteScrollCallback ? event => onInfiniteScroll(event, infiniteScrollCallback) : onScroll}
                    {...otherProps}
                    {...otherStoreFields}
                    {...getSortingParams(tableStore)}
                    {...getPagingProps(tableStore)}
                    onRowClick={event => onRowClick(event.dataItem)}
                    rowRender={customRowRender ? customRowRender : onRowClick ? rowRender : null}
                >
                    {isBatchSelect ? defaultRenderBatchActionsToolbar(tableStore, authorization, batchActionsComponent) : null}
                    {defaultRenderColumns({ t, columns })}
                    {defaultRenderActions({ actions, actionsComponent, actionsWidth, authorization, t, actionsRender })}
                </Grid>
            </ContentWithEmptyState>
            {isLoading ? <BaasicTableLoader /> : null}
        </Fragment>
    );
};

BaasicTableTemplate.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    batchActionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    noRecordsState: PropTypes.object,
    emptyStateComponent: PropTypes.any,
    emptyState: PropTypes.object,
    scrollable: PropTypes.string,
    editField: PropTypes.string,
    authorization: PropTypes.any,
    t: PropTypes.func,
    onScroll: PropTypes.func,
    infiniteScrollCallback: PropTypes.func,
};

BaasicTableTemplate.defaultProps = {
    scrollable: 'none',
};

export default defaultTemplate(BaasicTableTemplate);
