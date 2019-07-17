import React from 'react';
import { InputFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter } from 'core/components';

function BookletOrderListTableFilter({ queryUtility, bookletOrderStatusDropdownStore, deliveryMethodTypeDropdownStore }) {
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
                {bookletOrderStatusDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="bookletOrderStatusIds"
                        store={bookletOrderStatusDropdownStore}
                    />}
            </div>
            <div className="f-col f-col-lrg-3 input--multiselect">
                {deliveryMethodTypeDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="deliveryMethodTypeIds"
                        store={deliveryMethodTypeDropdownStore}
                    />}
            </div>
        </React.Fragment>
    );
}

export default BookletOrderListTableFilter;


