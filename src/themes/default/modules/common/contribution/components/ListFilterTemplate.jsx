import React from 'react';
import { InputFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter } from 'core/components';

function ListFilterTemplate({ queryUtility, contributionStatusDropdownStore, paymentTypeDropdownStore }) {
    return (
        <React.Fragment>
            <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
                <InputFilter
                    queryUtility={queryUtility}
                    name="confirmationNumber"
                    placeholder="Confirmation Number"
                    type="number"
                />
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
            <div className="f-col f-col-lrg-3 input--multiselect">
                {contributionStatusDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="contributionStatusIds"
                        store={contributionStatusDropdownStore}
                    />}
            </div>
            <div className="f-col f-col-lrg-3 input--multiselect">
                {paymentTypeDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="paymentTypeIds"
                        store={paymentTypeDropdownStore}
                    />}
            </div>
        </React.Fragment>
    );
}

export default ListFilterTemplate;


