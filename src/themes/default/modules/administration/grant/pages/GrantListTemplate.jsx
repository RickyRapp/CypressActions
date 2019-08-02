import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, BaasicModal, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { DonorAccountSearch } from 'modules/administration/donor-account/components';
import { GrantReview } from 'modules/administration/grant/components';
import { GrantRegularDetails } from 'modules/common/grant/pages';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore: { loading },
        queryUtility,
        tableStore,
        routes: { create },
        findDonorModalParams,
        onChangeSearchDonor,
        donorAccountSearchDropdownStore,
        charitySearchDropdownStore,
        reviewModalParams,
        detailsModalParams,
        onAfterReview
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loading}>
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
                        <ListFilterTemplate
                            queryUtility={queryUtility}
                            charitySearchDropdownStore={charitySearchDropdownStore} />
                    </div>
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
            />
            <BaasicModal modalParams={findDonorModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <span>Please select donor</span>
                            <DonorAccountSearch onChange={onChangeSearchDonor}>
                                {queryUtility.filter.donorAccountId &&
                                    <div>
                                        Use Donor From Filter, Click <strong><span onClick={() => onChangeSearchDonor({ id: queryUtility.filter.donorAccountId })}>Here</span></strong>
                                    </div>}
                            </DonorAccountSearch>
                        </div>
                    </div>
                </div>
            </BaasicModal>
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

export default defaultTemplate(GrantListTemplate);
