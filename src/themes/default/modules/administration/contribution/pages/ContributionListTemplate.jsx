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
                            actionsComponent={renderActions}
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

function renderActions({ item, actions, actionsConfig }) {
    if (!isSome(actions))
        return null;

    let { onEdit, onReview, onDetails } = actions;
    if (!isSome(onEdit) && !isSome(onReview) && !isSome(onDetails))
        return null;

    const { onEditConfig, onReviewConfig } = actionsConfig;

    //edit config
    let editTitle = 'edit' // default
    if (isSome(onEditConfig)) {
        if (onEditConfig.title) {
            editTitle = onEditConfig.title;
        }

        if (onEditConfig.minutes) {
            if (moment().local().isAfter(moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.minutes, 'minutes'))) {
                onEdit = null;
            }
            else {
                editTitle += ' until ' + moment.utc(item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(onEditConfig.minutes, 'minutes').format('HH:mm:ss');
            }
        }
        if (onEditConfig.statuses) {
            if (!_.includes(onEditConfig.statuses, item.contributionStatusId)) {
                onEdit = null
            }
        }
    }
    else {
        onEdit = null;
    }

    //review config
    let reviewTitle = 'review' // default
    if (isSome(onReviewConfig)) {
        if (onReviewConfig.title) {
            reviewTitle = onEditConfig.title;
        }

        if (onReviewConfig.statuses) {
            if (!_.includes(onReviewConfig.statuses, item.contributionStatusId)) {
                onReview = null
            }
        }
    }
    else {
        onReview = null;
    }

    return (
        <td className="table__body--data right">
            {isSome(onEdit) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onEdit(item)}
                >
                    {editTitle}
                </i>
            ) : null}
            {isSome(onReview) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onReview(item)}
                >
                    {reviewTitle}
                </i>
            ) : null}
            {isSome(onDetails) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onDetails(item)}
                >
                    details
                </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(ContributionListTemplate);
