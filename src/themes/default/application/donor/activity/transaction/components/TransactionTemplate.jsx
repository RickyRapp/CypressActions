import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, DateRangeQueryPicker, BaasicDropdown, TableFilter, BaasicTableWithRowDetails, FormatterResolver } from 'core/components';

function TransactionTemplate({ transactionViewStore, hideSearch, hidePager }) {
	const { tableStore, dateCreatedDateRangeQueryStore, transactionTypeStore, transactionPeriod, queryUtility } = transactionViewStore;

	const DetailComponent = ({ dataItem }) => {
		{
			return (
				<div>
					<p><b>Payment Transaction Type:</b> {dataItem.paymentTransaction.paymentTransactionType.description}&emsp;&emsp;<b>Description:</b> {dataItem.description}</p>
					<p><b>Transaction Type:</b> {dataItem.type}</p>
					<p><b>Present Balance:</b><FormatterResolver
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
			<div className="card--tertiary card--med">
				<div className="row u-mar--bottom--base">
					<div className="col col-sml-12 col-lrg-6 col-xxlrg-9">
						{hideSearch ? null :
							<div>
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
					<div className="col col-sml-12 col-lrg-6 col-xxlrg-3">
						<BaasicDropdown store={transactionPeriod} queryUtility={queryUtility} />
					</div>
				</div>
				{/* <BaasicTable tableStore={tableStore} hidePager={hidePager} /> */}
				<div className="card--primary card--med u-mar--bottom--med">
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
};

export default defaultTemplate(TransactionTemplate);
