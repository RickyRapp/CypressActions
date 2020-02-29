import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown,
    BaasicModal,
    BaasicFormControls
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { GrantCreateOverviewTemplate } from '../components';

const GrantRequestListTemplate = function ({ grantRequestViewStore, t }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        searchDonorAccountDropdownStore,
        grantCreateOVerviewModalParams,
        onConfirm,
        onEdit
    } = grantRequestViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={searchDonorAccountDropdownStore} />
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
            <BaasicModal modalParams={grantCreateOVerviewModalParams}>
                <GrantCreateOverviewTemplate >
                    <BaasicButton
                        type='button'
                        className="btn btn--base btn--primary u-mar--right--sml"
                        onClick={onConfirm}
                        label={t('FORM_CONTROLS.CONFIRM_BUTTON')}
                    />
                    <BaasicButton
                        className="btn btn--base btn--ghost u-mar--right--sml"
                        label={t('FORM_CONTROLS.EDIT_BUTTON')}
                        onClick={onEdit}
                    />
                </GrantCreateOverviewTemplate>
            </BaasicModal>
        </Content>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='GRANT_REQUEST.LIST.EMPTY_STATE.TITLE' actionLabel='GRANT_REQUEST.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

GrantRequestListTemplate.propTypes = {
    grantRequestViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onComplete, onDecline } = actions;
    if (!isSome(onComplete) && !isSome(onDecline)) return null;

    let completeRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCompleteRender) {
            completeRender = actionsRender.onCompleteRender(item);
        }
    }

    let declineRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onDeclineRender) {
            declineRender = actionsRender.onDeclineRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onComplete) && completeRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='GRANT_REQUEST.LIST.BUTTON.COMPLETE'
                        onlyIcon={true}
                        onClick={() => onComplete(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onDecline) && declineRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--unapproved u-icon--sml'
                        label='GRANT_REQUEST.LIST.BUTTON.DECLINE'
                        onlyIcon={true}
                        onClick={() => onDecline(item)}>
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

export default defaultTemplate(GrantRequestListTemplate);

