import _ from 'lodash';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Grid } from '@progress/kendo-react-grid';
import { BaasicTableLoader, ContentWithEmptyState } from 'core/components';
import {
    defaultRenderActions,
    defaultRenderColumns,
    defaultRenderBatchActionsToolbar,
} from 'core/components/table/utils';

const SimpleBaasicTableTemplate = function ({
    tableStore,
    loading,
    authorization,
    actionsComponent,
    noRecordsComponent,
    noRecordsState = {},
    emptyStateComponent,
    emptyState = {},
    onItemChange,
    t,
    ...otherProps
}) {
    const {
        isBatchSelect,
        data,
        config: { columns, actions, actionsWidth, ...otherStoreFields },
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
                <Grid data={data.slice()} onItemChange={onItemChange} {...otherProps} {...otherStoreFields}>
                    {/* {<GridNoRecords>{loading ? 'Loading...' : defaultRenderNoRecords(noRecordsComponent)}</GridNoRecords>} */}
                    {/*{children ? children(tableStore) : defaultRenderColumns(columns)}*/}
                    {isBatchSelect ? defaultRenderBatchActionsToolbar(tableStore, authorization) : null}
                    {defaultRenderColumns({ columns, t })}
                    {defaultRenderActions({ actions, actionsComponent, actionsWidth, authorization, t })}
                </Grid>
            </ContentWithEmptyState>
            {isLoading ? <BaasicTableLoader /> : null}
        </Fragment>
    );
};

SimpleBaasicTableTemplate.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    authorization: PropTypes.object,
    actionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    noRecordsState: PropTypes.object,
    emptyStateComponent: PropTypes.any,
    emptyState: PropTypes.object,
    onItemChange: PropTypes.func,
    editField: PropTypes.string,
    t: PropTypes.func,
};

SimpleBaasicTableTemplate.defaultProps = {
    scrollable: 'none',
};

export default defaultTemplate(SimpleBaasicTableTemplate);
