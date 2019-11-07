import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Grid, GridNoRecords } from '@progress/kendo-react-grid';
import { BaasicTableLoader } from 'core/components';
import {
    defaultRenderActions,
    defaultRenderColumns,
    defaultRenderNoRecords,
    defaultRenderBatchActionsToolbar
} from 'core/components/table/utils';

const SimpleBaasicTableTemplate = function ({ tableStore, loading, actionsComponent, noRecordsComponent, t, ...otherProps }) {
    const { isBatchSelect, data, config: { columns, actions, actionsRender, ...otherStoreFields } } = tableStore;
    return (
        <div>
            <Grid
                data={data.slice()}
                {...otherProps}
                {...otherStoreFields}
            >
                {
                    <GridNoRecords>
                        {loading ? 'Loading...' : defaultRenderNoRecords(noRecordsComponent)}
                    </GridNoRecords>
                }
                {/*{children ? children(tableStore) : defaultRenderColumns(columns)}*/}
                {isBatchSelect ? defaultRenderBatchActionsToolbar(tableStore) : null}
                {defaultRenderColumns({ columns, t })}
                {defaultRenderActions({ actions, actionsRender, actionsComponent, t })}
            </Grid>
            {loading ? <BaasicTableLoader /> : null}
        </div>
    )
};

SimpleBaasicTableTemplate.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    editField: PropTypes.string,
    t: PropTypes.func
};

SimpleBaasicTableTemplate.defaultProps = {
    scrollable: 'none'
};

export default defaultTemplate(SimpleBaasicTableTemplate);
