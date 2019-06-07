import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { BaasicTable, TableFilter, Export, DropdownAsyncFilter, BaasicModal } from 'core/components';
import { DonorAccountSearch, DonorAccountHeaderDetails } from 'modules/administration/donor-account/components';
import { ContributionDetails } from 'modules/common/contribution/pages';
import { ContributionReview } from 'modules/administration/contribution/components';
import { ListFilterTemplate } from 'themes/modules/common/contribution/components';
import _ from 'lodash';

function ContributionListTemplate({ contributionListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        loaded,
        routes: { create },
        contributionStatusDropdownStore,
        paymentTypeDropdownStore,
        donorAccountSearchDropdownStore,
        contributionService,
        selectedExportColumnsName,
        additionalExportColumnsName,
        findDonorModalParams,
        onChangeSearchDonor,
        reviewContributionModalParams,
        detailsContributionModalParams,
        onAfterReviewContribution,
        contributionId
    } = contributionListViewStore;

    return (
        <React.Fragment>
            {loaded &&
                <React.Fragment>
                    <ListLayout onCreate={create} loading={loaderStore.loading}>
                        {queryUtility.filter.donorAccountId &&
                            <PageContentHeader><DonorAccountHeaderDetails userId={queryUtility.filter.donorAccountId} type='contribution' /></PageContentHeader>}
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
                                        paymentTypeDropdownStore={paymentTypeDropdownStore}
                                        contributionStatusDropdownStore={contributionStatusDropdownStore} />
                                </div>
                            </TableFilter>
                            <Export
                                queryUtility={queryUtility}
                                selectedExportColumnsName={selectedExportColumnsName}
                                additionalExportColumnsName={additionalExportColumnsName}
                                service={contributionService}
                            />
                        </div>
                        <BaasicTable
                            tableStore={tableStore}
                            loading={loaderStore.loading}
                        />
                    </ListLayout>
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
                    <BaasicModal modalParams={reviewContributionModalParams} >
                        <div className="col col-sml-12 card card--form card--primary card--lrg">
                            <ContributionReview onAfterReview={onAfterReviewContribution} id={contributionId} />
                        </div>
                    </BaasicModal>
                    <BaasicModal modalParams={detailsContributionModalParams} >
                        <div className="col col-sml-12 card card--form card--primary card--lrg">
                            <ContributionDetails id={contributionId} />
                        </div>
                    </BaasicModal>
                </React.Fragment>}
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionListTemplate);
