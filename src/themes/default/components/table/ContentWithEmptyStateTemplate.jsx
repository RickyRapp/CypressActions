import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { defaultRenderNoRecords, defaultRenderEmptyState } from 'core/components/table/utils';

const ContentWithEmptyStateTemplate = function (props) {
	const {
		loading,
		noRecordsComponent,
		noRecordsState,
		emptyStateComponent,
		emptyState,
		children,
		hasData,
		dataInitialized,
	} = props;

	return dataInitialized ? (
		hasData ? (
			<Fragment>{children}</Fragment>
		) : (
				defaultRenderNoRecords(noRecordsComponent, noRecordsState)
			)
	) : (
			!loading && defaultRenderEmptyState(emptyStateComponent, emptyState)
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
};

export default ContentWithEmptyStateTemplate;
