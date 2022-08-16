import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { defaultRenderNoRecords, defaultRenderEmptyState } from 'core/components/table/utils';
import { BasicTableLoader } from 'themes/components';

const ContentWithEmptyStateTemplate = function(props) {
	const {
		loading,
		noRecordsComponent,
		noRecordsState,
		emptyStateComponent,
		emptyState,
		children,
		hasData,
		dataInitialized,
		tableItems,
	} = props;

	return loading ? (
		<BasicTableLoader tableItems={tableItems} />
	) : dataInitialized ? (
		hasData ? (
			<Fragment>{children}</Fragment>
		) : (
			defaultRenderNoRecords(noRecordsComponent, noRecordsState)
		)
	) : (
		defaultRenderEmptyState(emptyStateComponent, emptyState)
	);
};

ContentWithEmptyStateTemplate.propTypes = {
	loading: PropTypes.bool,
	noRecordsComponent: PropTypes.any,
	noRecordsState: PropTypes.object,
	emptyStateComponent: PropTypes.any,
	emptyState: PropTypes.object,
	hasData: PropTypes.bool,
	dataInitialized: PropTypes.bool,
	tableItems: PropTypes.number,
};

export default ContentWithEmptyStateTemplate;
