import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    BaasicButton,
    BaasicModal
} from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { InvestmentPoolChange } from 'application/administration/investment/components';
import { InvestmentPoolHistory } from 'application/administration/investment/pages';
import { isSome } from 'core/utils';

const InvestmentPoolListTemplate = function ({ investmentPoolViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        investmentPoolChangeModal,
        openInvestmentPoolChange,
        investmentPoolDetailsId
    } = investmentPoolViewStore;

    return (
        <ApplicationListLayout store={investmentPoolViewStore} authorization={authorization}>
            <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter colClassName={"col col-sml-12 col-lrg-6"} queryUtility={queryUtility} >
                    </TableFilter>
                    <BaasicButton
                        className="btn btn--med btn--med--wide btn--ghost"
                        onlyIconClassName="u-mar--right--tny"
                        icon={`u-icon u-icon--unlock u-icon--sml`}
                        label='Enter change'
                        onClick={openInvestmentPoolChange}>
                    </BaasicButton>
                </div>
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
            {investmentPoolDetailsId &&
                <div
                    key={investmentPoolDetailsId}
                    className="u-mar--top--sml">
                    <InvestmentPoolHistory
                        investmentPoolId={investmentPoolDetailsId}
                    />
                </div>}
            <BaasicModal modalParams={investmentPoolChangeModal}>
                <InvestmentPoolChange />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

InvestmentPoolListTemplate.propTypes = {
    investmentPoolViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onSelect } = actions;
    if (!isSome(onSelect)) return null;

    let selectRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onSelectRender) {
            selectRender = actionsRender.onSelectRender(item);
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onSelect) && selectRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='DONOR_NOTE.LIST.BUTTON.SELECT'
                        onlyIcon={true}
                        onClick={() => onSelect(item)}>
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

export default defaultTemplate(InvestmentPoolListTemplate);

