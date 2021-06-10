import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, TableFilter } from 'core/components';

function DonorRecordActivityListTemplate({ donorRecordActivityViewStore }) {
	const { tableStore, dateCreatedDateRangeQueryStore, queryUtility } = donorRecordActivityViewStore;
	return (
		<div>
			<div className="card--tertiary card--med">
				<div className="u-mar--bottom--med">
					<TableFilter queryUtility={queryUtility}>
						<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
							<DateRangeQueryPicker queryUtility={queryUtility} 
							store={dateCreatedDateRangeQueryStore} 
							fromPropertyName='dateCreatedFrom'
							toPropertyName='dateCreatedTo'
							/>
						</div>
					</TableFilter>
				</div>
				<BaasicTable tableStore={tableStore} />
			</div>
		</div>
	);
}

DonorRecordActivityListTemplate.propTypes = {
	donorRecordActivityViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorRecordActivityListTemplate);
