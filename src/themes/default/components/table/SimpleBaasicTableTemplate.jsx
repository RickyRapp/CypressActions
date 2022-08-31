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
import { BasicTableLoader } from 'themes/components';

const SimpleBaasicTableTemplate = function({
	tableStore,
	loading,
	authorization,
	actionsComponent,
	noRecordsComponent,
	noRecordsState = {},
	emptyStateComponent,
	emptyState = {},
    onItemChange,
    tableItems,
	t,
	...otherProps
}) {
	const {
		isBatchSelect,
		data,
		config: { columns, actions, actionsRender, actionsWidth, ...otherStoreFields },
		hasData,
		dataInitialized,
	} = tableStore;

	const isLoading = !_.isNil(loading) ? loading : tableStore.loading;
	return (
		<Fragment>
			{isLoading ? (
				<BasicTableLoader tableItems={tableItems} />
			) : (
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
						{defaultRenderActions({ actions, actionsComponent, actionsWidth, authorization, t, actionsRender })}
					</Grid>
				</ContentWithEmptyState>
			)}
			{/* {isLoading ? <BaasicTableLoader /> : null} */}
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
	tableItems: PropTypes.number,
	t: PropTypes.func,
};

SimpleBaasicTableTemplate.defaultProps = {
	scrollable: 'none',
};

export default defaultTemplate(SimpleBaasicTableTemplate);
