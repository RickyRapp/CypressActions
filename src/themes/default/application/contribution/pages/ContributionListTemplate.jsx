import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    BaasicModal,
    BaasicDropdown,
    BaasicInput,
    DateRangeQueryPicker
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { ContributionReview } from 'application/contribution/components'
import { SelectDonor } from 'application/donor/components';

const ContributionListTemplate = function ({ contributionViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        selectDonorModal,
        searchDonorDropdownStore,
        paymentTypeDropdownStore,
        reviewModal,
        contributionStatusDropdownStore,
        dateCreatedDateRangeQueryStore
    } = contributionViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={contributionViewStore} authorization={authorization}>
                <Content>
                    <div className="card--form card--secondary card--med u-mar--bottom--sml">
                        <TableFilter searchClassName="w--300--px" queryUtility={queryUtility} >
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown store={searchDonorDropdownStore} />
                            </div>
                            <div className="u-mar--bottom--sml col col-sml-12 col-lrg-2">
                                <BaasicInput
                                    className='input input--med'
                                    value={queryUtility.filter.confirmationNumber}
                                    onChange={(event) => queryUtility.filter.confirmationNumber = event.target.value}
                                    placeholder='CONTRIBUTION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER' />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicInput
                                    className='input input--med'
                                    value={queryUtility.filter.paymentNumber || ""}
                                    onChange={(event) => queryUtility.filter.paymentNumber = event.target.value}
                                    placeholder='CONTRIBUTION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown
                                    store={paymentTypeDropdownStore}
                                    placeholder='CONTRIBUTION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown
                                    store={contributionStatusDropdownStore}
                                    placeholder='CONTRIBUTION.LIST.FILTER.CONTRIBUTION_STATUS_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicInput
                                    className='input input--med'
                                    value={queryUtility.filter.nameOnCheck || ""}
                                    onChange={(event) => queryUtility.filter.nameOnCheck = event.target.value}
                                    placeholder='CONTRIBUTION.LIST.FILTER.NAME_ON_CHECK_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <DateRangeQueryPicker
                                    queryUtility={queryUtility}
                                    store={dateCreatedDateRangeQueryStore}
                                    fromPropertyName='dateCreatedFrom'
                                    toPropertyName='dateCreatedTo'
                                />
                            </div>
                        </TableFilter>
                    </div>
                    <div className="card--form card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                        />
                    </div>
                </Content>
            </ApplicationListLayout>
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
            <BaasicModal modalParams={reviewModal}>
                <ContributionReview />
            </BaasicModal>
        </React.Fragment >
    )
};

ContributionListTemplate.propTypes = {
    contributionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview, onPreview, onCancel } = actions;
    if (!isSome(onEdit) && !isSome(onReview) && !isSome(onPreview) && !isSome(onCancel)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let reviewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onReviewRender) {
            reviewRender = actionsRender.onReviewRender(item);
        }
    }

    let previewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onPreviewRender) {
            previewRender = actionsRender.onPreviewRender(item);
        }
    }

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = actionsRender.onCancelRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) && reviewRender ? (
                    <BaasicButton
                        authorization='theDonorsFundAdministrationSection.update'
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.REVIEW'
                        onlyIcon={true}
                        onClick={() => onReview(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.PREVIEW'
                        onlyIcon={true}
                        onClick={() => onPreview(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--close u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.CANCEL'
                        onlyIcon={true}
                        onClick={() => onCancel(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(ContributionListTemplate);

