import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BaasicTable, TableFilter, InputFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter, Export, DropdownAsyncFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { DonorAccountSearch } from 'modules/donor-account/components';
import { ContributionReview } from 'modules/contribution/components';
import { BaasicModal } from 'core/components';
import moment from 'moment';
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
        contributionEmployeeRead,
        reviewContributionModalParams,
        onAfterReviewContribution,
        reviewId
    } = contributionListViewStore;

    return (
        <React.Fragment>
            {loaded &&
                <React.Fragment>
                    <ListLayout onCreate={create} loading={loaderStore.loading}>
                        <div className="spc--bottom--sml">
                            <TableFilter queryUtility={queryUtility}>
                                <div className="f-row">
                                    {contributionEmployeeRead &&
                                        <div className="f-col f-col-lrg-3 input--multiselect">
                                            {donorAccountSearchDropdownStore &&
                                                <DropdownAsyncFilter
                                                    queryUtility={queryUtility}
                                                    name="donorAccountId"
                                                    store={donorAccountSearchDropdownStore}
                                                />}
                                        </div>}
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
                                        {contributionStatusDropdownStore &&
                                            <DropdownFilter
                                                queryUtility={queryUtility}
                                                name="contributionStatusIds"
                                                store={contributionStatusDropdownStore}
                                            />}
                                    </div>
                                    <div className="f-col f-col-lrg-3 input--multiselect">
                                        {paymentTypeDropdownStore &&
                                            <DropdownFilter
                                                queryUtility={queryUtility}
                                                name="paymentTypeIds"
                                                store={paymentTypeDropdownStore}
                                            />}
                                    </div>
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
                            <ContributionReview onAfterReview={onAfterReviewContribution} id={reviewId} />
                        </div>
                    </BaasicModal>
                </React.Fragment>}
        </React.Fragment>
    );
}

function renderActions({ item, actions, actionsConfig }) {
    if (!isSome(actions))
        return null;

    let { onEdit, onDetails, onReview } = actions;
    if (!isSome(onEdit) && !isSome(onReview) && !isSome(onDetails))
        return null;

    const { onEditConfig, onReviewConfig } = actionsConfig;

    //edit config
    let editTitle = 'edit' // default
    let reviewTitle = 'review' // default
    if (isSome(onEditConfig)) {
        if (onEditConfig.editTitle) {
            editTitle = onEditConfig.editTitle;
        }

        if (onEditConfig.permissions) {
            if (onEditConfig.permissions.update) {
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
        }
    }

    if (isSome(onReviewConfig)) {
        if (onReviewConfig.reviewTitle) {
            reviewTitle = onReviewConfig.reviewTitle;
        }

        if (onReviewConfig.permissions) {
            if (onReviewConfig.permissions.update) {
                if (onReviewConfig.statuses) {
                    if (!_.includes(onReviewConfig.statuses, item.contributionStatusId)) {
                        onReview = null
                    }
                }
            }
            else {
                onReview = null;
            }
        }
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
