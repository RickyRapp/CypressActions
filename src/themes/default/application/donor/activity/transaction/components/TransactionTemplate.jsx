import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, TableFilter } from 'core/components';

function TransactionTemplate({ transactionViewStore }) {
	const { tableStore, dateCreatedDateRangeQueryStore, queryUtility } = transactionViewStore;

	return (
		<div>
			<div className="card--tertiary card--med">
				<div className="u-mar--bottom--med">
					<TableFilter queryUtility={queryUtility}>
						<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
							<DateRangeQueryPicker queryUtility={queryUtility} store={dateCreatedDateRangeQueryStore} />
						</div>
					</TableFilter>
				</div>

				<BaasicTable tableStore={tableStore} />
			</div>
		</div>
	);
}

TransactionTemplate.propTypes = {
	transactionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(TransactionTemplate);
