import React from 'react';
import { NumericRangeFilter, DateRangeFilter } from 'core/components';

function ActivityAndHistoryFilterBaseTemplate({ queryUtility }) {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default ActivityAndHistoryFilterBaseTemplate;


