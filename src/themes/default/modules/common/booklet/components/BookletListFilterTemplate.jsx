import React from 'react';
import { defaultTemplate } from 'core/utils';
import { InputFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter } from 'core/components';

function BookletListFilterTemplate({ queryUtility, bookletStatusDropdownStore, denominationTypeDropdownStore }) {
    return (
        <React.Fragment>
            <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
                <InputFilter
                    queryUtility={queryUtility}
                    name="codes"
                    placeholder="Codes (separate by ,)"
                    type="text"
                />
            </div>
            <div className="f-col f-col-lrg-3 input--multiselect">
                {bookletStatusDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="bookletStatusIds"
                        store={bookletStatusDropdownStore} />}
            </div>
            <div className="f-col f-col-lrg-3 input--multiselect">
                {denominationTypeDropdownStore &&
                    <DropdownFilter
                        queryUtility={queryUtility}
                        name="denominationTypeIds"
                        store={denominationTypeDropdownStore} />}
            </div>
            <div className="f-col f-col-lrg-3">
                <DateRangeFilter
                    queryUtility={queryUtility}
                    nameMin="dateCreatedStartDate"
                    nameMax="dateCreatedEndDate"
                />
            </div>
        </React.Fragment>
    );
}

export default defaultTemplate(BookletListFilterTemplate);


