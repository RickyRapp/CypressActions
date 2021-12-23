import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, BaasicDropdown, TableFilter, BaasicTableWithRowDetails, FormatterResolver, BaasicButton } from 'core/components';

function StatementsReportsTemplate({ statementsReportsViewStore, hideSearch, hidePager, hidePeriod, noBackground }) {
	const { tableStore, dateCreatedDateRangeQueryStore, transactionTypeStore, transactionPeriod, queryUtility, yearDropdownStore } = statementsReportsViewStore;

	
	return (
		<div>
			<div className={`${noBackground ? "" : "card--tertiary card--med"}`}>
				{/* <div className="row u-mar--bottom--base">
					<div className="col col-sml-12 col-lrg-6 col-xxlrg-9">
						{hideSearch ? null :
							<div>
								<TableFilter queryUtility={queryUtility}>
									<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
										<DateRangeQueryPicker queryUtility={queryUtility} store={dateCreatedDateRangeQueryStore} />
									</div>
									<div className="col col-sml-12 col-lrg-6 col-xxlrg-6">
										<BaasicDropdown store={transactionTypeStore} className="input--dropdown--secondary" />
									</div>
								</TableFilter>
							</div>
						}
					</div>
					{
						hidePeriod ? null :
							<div className="col col-sml-12 col-lrg-6 col-xxlrg-3">
								<BaasicDropdown store={transactionPeriod} queryUtility={queryUtility} className="input--dropdown--secondary" />
							</div>
					}

				</div> */}
				{/* <BaasicTable tableStore={tableStore} hidePager={hidePager} /> */}
				{/* <div className="card--primary u-mar--bottom--med">
					{
						window.innerWidth > 750 ? <div>
							<BaasicTable tableStore={tableStore} hidePager={hidePager} />
						</div> :
							<div className="table--dragrow--expandable-row">
								<BaasicTableWithRowDetails
									tableStore={tableStore}
									detailComponent={DetailComponent}
									loading={tableStore.loading}
									className="k-grid--actions"
								/>
							</div>
					}
				</div> */}
				<div className="card--primary">
				<BaasicDropdown className="form-field--sml" store={yearDropdownStore} />
					<h3>Annual receipts</h3>
					<br />
					<BaasicButton
						className="btn btn--med btn--tertiary u-mar--btm--sml"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--print u-icon--base"
						label="Generate report for 2021"
						onClick={() => onPrintReport(item)}
					></BaasicButton>
					<BaasicButton
						className="btn btn--med btn--tertiary u-mar--btm--sml"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--print u-icon--base"
						label="Generate report for 2020"
						onClick={() => onPrintReport(item)}
					></BaasicButton>
					<BaasicButton
						className="btn btn--med btn--tertiary u-mar--btm--sml"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--print u-icon--base"
						label="Generate report for 2019"
						onClick={() => onPrintReport(item)}
					></BaasicButton>
				</div>
			</div>
		</div>
	);
}

StatementsReportsTemplate.propTypes = {
	statementsReportsViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	hideSearch: PropTypes.bool,
	hidePager: PropTypes.bool,
	hidePeriod: PropTypes.bool,
	noBackground: PropTypes.bool,
};

export default defaultTemplate(StatementsReportsTemplate);
