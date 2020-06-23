import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicButton,
    BaasicModal
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';
import { InvestmentPoolChange } from 'application/investment/components';
import { InvestmentPoolHistory } from 'application/investment/pages';
import { isSome } from 'core/utils';

const InvestmentPoolListTemplate = function ({ investmentPoolViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        investmentPoolChangeModal,
        openInvestmentPoolChange,
        investmentPoolDetailsId
    } = investmentPoolViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={investmentPoolViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card--form card--secondary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} >
                        </TableFilter>
                        <BaasicButton
                            className="btn btn--base btn--secondary"
                            icon={`u-icon u-icon--unlocked u-icon--sml`}
                            label='Enter change'
                            onClick={openInvestmentPoolChange}>
                        </BaasicButton>
                    </div>
                    <div className="card--form card--primary card--med">
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
            </ApplicationListLayout>
            <BaasicModal modalParams={investmentPoolChangeModal}>
                <InvestmentPoolChange />
            </BaasicModal>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='FUND_TRANSFER.LIST.EMPTY_STATE.TITLE' actionLabel='FUND_TRANSFER.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

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
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onSelect) && selectRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
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

