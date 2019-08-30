import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, NumericRangeFilter, BaasicModal, DateRangeFilter, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { GrantRegularDetails } from 'modules/common/grant/pages';

function DonationListTemplate({ donationListViewStore }) {
    const {
        loaderStore: { loading },
        queryUtility,
        tableStore,
    } = donationListViewStore;

    return (
        <ListLayout loading={loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="f-row">
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
                    </div>
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
            />
        </ListLayout >
    );
}

export default defaultTemplate(DonationListTemplate);
