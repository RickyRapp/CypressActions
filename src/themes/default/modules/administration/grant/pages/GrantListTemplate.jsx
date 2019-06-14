import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, BaasicModal, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { DonorAccountSearch } from 'modules/administration/donor-account/components';
import { GrantReview } from 'modules/administration/grant/components';
import { GrantDetails } from 'modules/common/grant/pages';

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
        grantId,
        onAfterReview
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loading}>
            {tableStore &&
                <React.Fragment>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="f-row">
                                <div className="f-col f-col-lrg-4 input--multiselect">
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
                </React.Fragment>}
            <BaasicModal modalParams={findDonorModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <span>Please select donor</span>
                            <DonorAccountSearch
                                onChange={onChangeSearchDonor}
                            />
                        </div>
                    </div>
                </div>
            </BaasicModal>
            <BaasicModal modalParams={reviewModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantReview onAfterReview={onAfterReview} id={grantId} />
                </div>
            </BaasicModal>
            <BaasicModal modalParams={detailsModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantDetails id={grantId} />
                </div>
            </BaasicModal>
        </ListLayout>
    );
}

export default defaultTemplate(GrantListTemplate);
