import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, BaasicModal, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { DonorAccountSearch } from 'modules/administration/donor-account/components';
import { GrantReview } from 'modules/administration/grant/components';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        routes: { create },
        findDonorModalParams,
        onChangeSearchDonor,
        donorAccountSearchDropdownStore,
        charitySearchDropdownStore,
        reviewGrantModalParams,
        reviewId,
        onAfterReviewGrant
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
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
                        loading={loaderStore.loading}
                        actionsComponent={renderActions}
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
            <BaasicModal modalParams={reviewGrantModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantReview onAfterReview={onAfterReviewGrant} id={reviewId} />
                </div>
            </BaasicModal>
        </ListLayout>
    );
}

function renderActions({ item, actions, actionsConfig }) {
    if (!isSome(actions))
        return null;

    let { onReview, onEdit } = actions;
    if (!isSome(onReview) && !isSome(onEdit))
        return null;

    const { onReviewConfig, onEditConfig } = actionsConfig;

    //review config
    let reviewTitle = 'review' // default
    if (isSome(onReviewConfig)) {
        if (onReviewConfig.title) {
            reviewTitle = onReviewConfig.title;
        }

        if (onReviewConfig.statuses) {
            if (!_.includes(onReviewConfig.statuses, item.donationStatusId)) {
                onReview = null
            }
        }
    }

    //edit config
    let editTitle = 'edit' // default
    if (isSome(onEditConfig)) {
        if (onEditConfig.title) {
            editTitle = onEditConfig.title;
        }

        if (onEditConfig.statuses) {
            if (!_.includes(onEditConfig.statuses, item.donationStatusId)) {
                onEdit = null
            }
        }
    }

    return (
        <td className="table__body--data right">
            {isSome(onReview) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onReview(item)}
                >
                    {reviewTitle}
                </i>
            ) : null}
            {isSome(onEdit) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onEdit(item)}
                >
                    {editTitle}
                </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(GrantListTemplate);
