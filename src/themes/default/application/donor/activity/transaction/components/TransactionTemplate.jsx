import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, BaasicDropdown, TableFilter } from 'core/components';

function TransactionTemplate({ transactionViewStore, hideSearch, hidePager }) {
	const { tableStore, dateCreatedDateRangeQueryStore, transactionTypeStore, transactionPeriod, queryUtility } = transactionViewStore;
	return (
		<div>
			<div className="card--tertiary card--med">
				<div className="row u-mar--bottom--base">
					<div className="col col-sml-12 col-lrg-6 col-xxlrg-9 u-mar--top--sml">
						{hideSearch ? null :
							<div className="u-mar--bottom--med">
								<TableFilter queryUtility={queryUtility}>
									<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
										<DateRangeQueryPicker queryUtility={queryUtility} store={dateCreatedDateRangeQueryStore} />
									</div>
									<div className="col col-sml-12 col-lrg-6 col-xxlrg-6">
										<BaasicDropdown store={transactionTypeStore} />
									</div>
								</TableFilter>
							</div>
						}
					</div>
					<div className="col col-sml-12 col-lrg-6 col-xxlrg-3 u-mar--top--sml">
						<BaasicDropdown store={transactionPeriod} queryUtility={queryUtility} />
					</div>
				</div>
				<BaasicTable tableStore={tableStore} hidePager={hidePager} />
			</div>
		</div>
	);
}

TransactionTemplate.propTypes = {
	transactionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	hideSearch: PropTypes.bool,
	hidePager: PropTypes.bool,
};

export default defaultTemplate(TransactionTemplate);
