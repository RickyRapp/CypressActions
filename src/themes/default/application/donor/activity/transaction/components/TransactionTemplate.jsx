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
				{/* <div className="row">
                    <div className="col col-sml-6 u-display--flex">
                        <div className="cursor--pointer type--sml type--wgt--medium type--color--note u-mar--right--med u-mar--bottom--sml">
                            <span className="u-icon u-icon--base u-icon--download u-mar--right--tny"></span>
                            Export
                        </div>
                        <div className="cursor--pointer type--sml type--wgt--medium type--color--note u-mar--right--med u-mar--bottom--sml">
                            <span className="u-icon u-icon--base u-icon--document u-mar--right--tny"></span>
                            Print
                        </div>
                        <div className="cursor--pointer type--sml type--wgt--medium type--color--note u-mar--right--med u-mar--bottom--sml">
                            <span className="u-icon u-icon--base u-icon--upload u-mar--right--tny"></span>
                            Send
                        </div>
                    </div>

                    <div className="col col-sml-6 u-display--flex u-display--flex--justify--flex-end"> 
                        <div className="cursor--pointer u-mar--right--sml u-mar--bottom--sml">
                            <span className="card--form card--tny u-icon u-icon--base u-icon--download u-mar--right--tny"></span>
                        </div>
                        <div className="cursor--pointer u-mar--right--sml u-mar--bottom--sml">
                            <span className="card--form card--tny u-icon u-icon--base u-icon--document u-mar--right--tny"></span>
                        </div>
                        <div className="cursor--pointer u-mar--right--sml u-mar--bottom--sml">
                            <span className="card--form card--tny u-icon u-icon--base u-icon--upload u-mar--right--tny"></span>
                        </div>
                        <div className="cursor--pointer u-mar--right--sml u-mar--bottom--sml">
                            <span className="card--form card--tny u-icon u-icon--base u-icon--edit u-mar--right--tny"></span>
                        </div>
                    </div>
                    <div className="col col-sml-6"></div>
                </div> */}

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
