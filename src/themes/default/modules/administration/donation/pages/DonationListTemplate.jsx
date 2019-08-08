import React from 'react';
import { defaultTemplate } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, NumericRangeFilter, BaasicModal, DateRangeFilter, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { DonorAccountSearch } from 'modules/administration/donor-account/components';
import { GrantRegularDetails } from 'modules/common/grant/pages';
import { GrantReview } from 'modules/administration/grant/components';

function DonationListTemplate({ donationListViewStore }) {
    const {
        loaderStore: { loading },
        queryUtility,
        tableStore,
        donorAccountSearchDropdownStore,
        charitySearchDropdownStore,
        reviewModalParams,
        detailsModalParams,
        onAfterReview
    } = donationListViewStore;

    return (
        <ListLayout loading={loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="f-row">
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {donorAccountSearchDropdownStore &&
                                <DropdownAsyncFilter
                                    queryUtility={queryUtility}
                                    name="donorAccountId"
                                    store={donorAccountSearchDropdownStore}
                                />}
                        </div>
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {charitySearchDropdownStore &&

                                <DropdownAsyncFilter
                                    queryUtility={queryUtility}
                                    name="charityId"
                                    store={charitySearchDropdownStore}
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
                    </div>
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
            />
            <BaasicModal modalParams={reviewModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantReview onAfterReview={onAfterReview} id={reviewModalParams.data} />
                </div>
            </BaasicModal>
            <BaasicModal modalParams={detailsModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantRegularDetails id={detailsModalParams.data} />
                </div>
            </BaasicModal>
        </ListLayout >
    );
}

export default defaultTemplate(DonationListTemplate);
