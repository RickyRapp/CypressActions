import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTableWithRowDetails,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const DonationReviewTemplate = function ({ donationReviewViewStore }) {
    const {
        authorization,
        tableStore,
    } = donationReviewViewStore;

    const DetailComponent = () => {
        return "TODO"
    }

    DetailComponent.propTypes = {
        dataItem: PropTypes.object.isRequired
    };

    return (
        <ApplicationListLayout store={donationReviewViewStore} authorization={authorization}>
            <Content>
                <div className="card--form card--primary card--med">
                    <div className="table--dragrow--expandable-row">
                        <BaasicTableWithRowDetails
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                            detailComponent={DetailComponent}
                            loading={tableStore.loading}
                            className="k-grid--actions"
                        />
                    </div>
                </div>
            </Content>
        </ApplicationListLayout>
    )
};

DonationReviewTemplate.propTypes = {
    donationReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview } = actions;
    if (!isSome(onEdit, onReview)) return null;

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

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONATION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) && reviewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='DONATION.LIST.BUTTON.REVIEW'
                        onlyIcon={true}
                        onClick={() => onReview(item)}>
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

export default defaultTemplate(DonationReviewTemplate);

