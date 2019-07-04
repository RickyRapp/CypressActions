import React from 'react';
import { NumericRangeFilter, DateRangeFilter, DropdownFilter, ThreeStateToggleFilter } from 'core/components';

function ActivityAndHistoryFilterBaseTemplate({ queryUtility, paymentTransactionStatusDropdownStore }) {
    return (
        <React.Fragment>
            <div className="f-col f-col-lrg-3 input--multiselect">
                {paymentTransactionStatusDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="paymentTransactionStatusIds"
                        store={paymentTransactionStatusDropdownStore}
                    />}
            </div>
            <div className="f-col f-col-lrg-4 pos--rel spc--right--sml">
                <NumericRangeFilter
                    queryUtility={queryUtility}
                    nameMin="amountRangeMin"
                    nameMax="amountRangeMax"
                    minPlaceholder="Min"
                    maxPlaceholder="Max"
                />
            </div>
            <div className="f-col f-col-lrg-3">
                <DateRangeFilter
                    queryUtility={queryUtility}
                    nameMin="dateCreatedStartDate"
                    nameMax="dateCreatedEndDate"
                />
            </div>
            <div className="f-col f-col-lrg-3">
                <ThreeStateToggleFilter
                    queryUtility={queryUtility}
                    name="done"
                    title="Done Transaction"
                />
            </div>
        </React.Fragment>
    );
}

export default ActivityAndHistoryFilterBaseTemplate;


