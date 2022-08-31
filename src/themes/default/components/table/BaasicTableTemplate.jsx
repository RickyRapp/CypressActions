import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { defaultTemplate } from 'core/hoc';
import { BaasicTableLoader, GridRow, ContentWithEmptyState } from 'core/components';
import { Grid } from '@progress/kendo-react-grid';
import {
    getSortingParams,
    getPagingProps,
    defaultRenderActions,
    defaultRenderColumns,
} from 'core/components/table/utils';

// eslint-disable-next-line
const BaasicTableTemplate = function ({ rootStore, tableItems, tableStore, loading, actionsComponent, noRecordsComponent, emptyStateComponent, noRecordsState = {}, emptyState = {}, queryUtility, children, t, hasCreatePermission, addClassName, ...otherProps }) { // eslint-disable-next-line
    const { items, hasData, selectedField, dataInitialized, config: { isSelectable, columns, dataItemKey, actions, contextMenu, authorization, ...otherStoreFields} } = tableStore;
    const isLoading = !isNil(loading) ? loading : tableStore.loading;
    const SELECTED_FIELD = "selected";
    const renderSelectableItems = () => items.map(item =>({...item, [SELECTED_FIELD]: selectedField === item[dataItemKey]}))
    let itemsToRender = items;
    
    if(isSelectable && selectedField){
       itemsToRender = renderSelectableItems();
    }

    return (
        <Fragment>
            <ContentWithEmptyState
                tableItems={tableItems}
                loading={isLoading}
                hasData={hasData}
                dataInitialized={dataInitialized}
                noRecordsComponent={noRecordsComponent}
                noRecordsState={noRecordsState}
                emptyStateComponent={emptyStateComponent}
                emptyState={emptyState}
            >
                <Grid
                    className={(addClassName ? addClassName : "")}
                    data={itemsToRender}
                    {...otherProps}
                    {...otherStoreFields}
                    rowRender={(trElement, props) => <GridRow trElement={trElement} {...props} tableStore={tableStore} />}
                    selectable={isSelectable}
                    dataItemKey={dataItemKey}
                    selectedField={SELECTED_FIELD}
                    {...getSortingParams(tableStore)}
                    {...getPagingProps(tableStore)}
                    pageable={otherProps.pageable !== undefined ? otherProps.pageable : getPagingProps(tableStore).pageable}
                >
                    {defaultRenderColumns({ tableStore, t, columns })}
                    {defaultRenderActions({ actions, actionsComponent, authorization, t })}
                </Grid>
            </ContentWithEmptyState>
            {isLoading ? <BaasicTableLoader /> : null}
        </Fragment>
    )
};


BaasicTableTemplate.propTypes = {
    tableStore: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    scrollable: PropTypes.string,
    editField: PropTypes.string,
    queryUtility: PropTypes.any,
    children: PropTypes.any,
    authorization: PropTypes.any,
    t: PropTypes.func,
    hasCreatePermission: PropTypes.any,
    addClassName: PropTypes.string
};

BaasicTableTemplate.defaultProps = {
    scrollable: 'none'
};

export default defaultTemplate(BaasicTableTemplate);