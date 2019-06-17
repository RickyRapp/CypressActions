import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, Export, InputFilter, DateRangeFilter, DropdownFilter, BaasicModal } from 'core/components';
import { isSome } from 'core/utils';
import { CharityReview } from 'modules/administration/charity/components';
import { ListLayout } from 'core/layouts';

function CharityListTemplate({ charityListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        charityStatusDropdownStore,
        charityTypeDropdownStore,
        routes: { create },
        selectedExportColumnsName,
        additionalExportColumnsName,
        charityService,
        reviewCharityModalParams,
        onAfterReviewCharity,
        reviewId
    } = charityListViewStore;

    return (
        <React.Fragment>
            <ListLayout onCreate={create} loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
                            <InputFilter
                                queryUtility={queryUtility}
                                name="nameOrTaxId"
                                placeholder="Name Or Tax ID"
                            />
                        </div>
                        <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
                            <InputFilter
                                queryUtility={queryUtility}
                                name="address"
                                placeholder="Address"
                            />
                        </div>
                        <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
                            <InputFilter
                                queryUtility={queryUtility}
                                name="emails"
                                placeholder="Emails (separate by ,)"
                            />
                        </div>
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {charityStatusDropdownStore &&
                                <DropdownFilter
                                    queryUtility={queryUtility}
                                    name="charityStatusIds"
                                    store={charityStatusDropdownStore}
                                />}
                        </div>
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {charityTypeDropdownStore &&
                                <DropdownFilter
                                    queryUtility={queryUtility}
                                    name="charityTypeIds"
                                    store={charityTypeDropdownStore}
                                />}
                        </div>
                        <div className="f-col f-col-lrg-3">
                            <DateRangeFilter
                                queryUtility={queryUtility}
                                nameMin="dateCreatedStartDate"
                                nameMax="dateCreatedEndDate"
                            />
                        </div>
                    </TableFilter>
                    <Export
                        queryUtility={queryUtility}
                        selectedExportColumnsName={selectedExportColumnsName}
                        additionalExportColumnsName={additionalExportColumnsName}
                        service={charityService}
                    />
                </div>
                {tableStore &&
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loaderStore.loading}
                    />}
            </ListLayout>
            <BaasicModal modalParams={reviewCharityModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <CharityReview onAfterReview={onAfterReviewCharity} id={reviewId} />
                </div>
            </BaasicModal>
        </React.Fragment>
    );
}

export default defaultTemplate(CharityListTemplate);