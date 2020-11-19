import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    EmptyState,
    TableFilter
} from 'core/components';
import { isSome } from 'core/utils';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';

const FidelityRecommendationCardListTemplate = function ({ fidelityRecommendationCardViewStore }) {
    const {
        tableStore,
        authorization,
        routes,
        queryUtility
    } = fidelityRecommendationCardViewStore;

    return (
        <ApplicationListLayout store={fidelityRecommendationCardViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} >
                    </TableFilter>
                </div>
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='FIDELITY_RECOMMENDATION_CARD.LIST.EMPTY_STATE.TITLE' actionLabel='FIDELITY_RECOMMENDATION_CARD.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

FidelityRecommendationCardListTemplate.propTypes = {
    fidelityRecommendationCardViewStore: PropTypes.object.isRequired
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onToggleLock } = actions;
    if (!isSome(onToggleLock)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onToggleLock) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon={`u-icon u-icon--${item.isLockedOut ? 'unlock' : 'lock'} u-icon--sml`}
                        label={`FIDELITY_RECOMMENDATION_CARD.LIST.BUTTON.${item.isLockedOut ? 'UNLOCK' : 'LOCK'}`}
                        onlyIcon={true}
                        onClick={() => onToggleLock(item)}>
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

export default defaultTemplate(FidelityRecommendationCardListTemplate);

