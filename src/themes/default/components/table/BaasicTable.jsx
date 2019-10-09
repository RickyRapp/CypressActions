import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { defaultTemplate } from 'core/hoc';
import { BaasicTableLoader } from 'core/components';
import { Grid, GridNoRecords } from '@progress/kendo-react-grid';
import {
    getSortingParams,
    getPagingProps,
    defaultRenderActions,
    defaultRenderColumns,
    defaultRenderNoRecords,
    defaultRenderBatchActionsToolbar
} from 'core/components/table/utils';

const BaasicTableTemplate = function({ tableStore, loading, actionsComponent, noRecordsComponent, authorization, t, ...otherProps }) {
    const { isBatchSelect, data, config: { columns, actions, ...otherStoreFields } } = tableStore;
    const isLoading = !_.isNil(loading) ? loading : tableStore.loading;
    return (
        <div>
            <Grid
                data={data.slice()}
                {...otherProps}
                {...otherStoreFields}
                {...getSortingParams(tableStore)}
                {...getPagingProps(tableStore)}
            >
                {
                    <GridNoRecords>
                        {isLoading ? 'Loading...' : defaultRenderNoRecords(noRecordsComponent)}
                    </GridNoRecords>
                }
                {isBatchSelect ? defaultRenderBatchActionsToolbar(tableStore, authorization) : null}
                {defaultRenderColumns({ t, columns})}
                {defaultRenderActions({ actions, actionsComponent, authorization, t })}
            </Grid>
            {isLoading ? <BaasicTableLoader /> : null}
        </div>
    )
};

BaasicTableTemplate.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    scrollable: PropTypes.string,
    editField: PropTypes.string,
    authorization: PropTypes.any,
    t: PropTypes.func
};

BaasicTableTemplate.defaultProps = {
    scrollable: 'none'
};

export default defaultTemplate(BaasicTableTemplate);
