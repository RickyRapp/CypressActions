import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, BaasicDropdown, TableFilter, BaasicTableWithRowDetails, FormatterResolver } from 'core/components';

function TransactionTemplate({ transactionViewStore, hideSearch, hidePager, hidePeriod, noBackground }) {
	const { tableStore, dateCreatedDateRangeQueryStore, transactionTypeStore, transactionPeriod, queryUtility } = transactionViewStore;

	const DetailComponent = ({ dataItem }) => {
		{
			return (
				<div>
					<p className="type--sml u-mar--bottom--sml">
						<p className="type--base type--wgt--bold">Payment Transaction Type:</p>
						{dataItem.paymentTransaction.paymentTransactionType.description}&emsp;&emsp;
					</p>
					<p className="type--sml u-mar--bottom--sml">
						<p className="type--base type--wgt--bold">Description:</p>
						{dataItem.description}
					</p>
					<p className="type--sml u-mar--bottom--sml">
						<p className="type--base type--wgt--bold">Transaction Type:</p>
						{dataItem.type}
					</p>
					<p className="type--sml u-mar--bottom--sml">
						<p className="type--base type--wgt--bold">Present Balance:</p>
						<FormatterResolver
							item={{ amount: dataItem.paymentTransaction.presentBalance }}
							field='amount'
							format={{ type: 'currency' }}
						/></p>
				</div>
			)
		}
	}
	DetailComponent.propTypes = {
		dataItem: PropTypes.object.isRequired
	};

	return (
		<div>
			<div className={`${noBackground ? "" : "card--tertiary card--med"}`}>
				<div className="row row--form u-mar--bottom--base">
					<div className="col col-sml-12 col-lrg-8 col-xxlrg-9">
						{hideSearch ? null :
							<div>
								<TableFilter queryUtility={queryUtility}>
									<div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
										<DateRangeQueryPicker queryUtility={queryUtility} store={dateCreatedDateRangeQueryStore} />
									</div>
									<div className="col col-sml-12 col-xxlrg-6">
										<BaasicDropdown store={transactionTypeStore} className="input--dropdown--secondary" />
									</div>
								</TableFilter>
							</div>
						}
					</div>
					{
						hidePeriod ? null :
							<div className="col col-sml-12 col-lrg-4 col-xxlrg-3">
								<BaasicDropdown store={transactionPeriod} queryUtility={queryUtility} className="input--dropdown--secondary" />
							</div>
					}
				</div>

				<div>
					{window.innerWidth > 750 ? <div>
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
				</div>
			</div>
		</div>
	);
}

TransactionTemplate.propTypes = {
	transactionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	hideSearch: PropTypes.bool,
	hidePager: PropTypes.bool,
	hidePeriod: PropTypes.bool,
	noBackground: PropTypes.bool,
};

export default defaultTemplate(TransactionTemplate);
