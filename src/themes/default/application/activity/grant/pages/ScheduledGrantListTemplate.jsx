import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const ScheduledGrantListTemplate = function ({ scheduledGrantViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = scheduledGrantViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="card--tertiary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
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
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SCHEDULED_GRANT.LIST.EMPTY_STATE.TITLE' actionLabel='SCHEDULED_GRANT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

ScheduledGrantListTemplate.propTypes = {
    scheduledGrantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onCancel } = actions;
    if (!isSome(onEdit) && !isSome(onCancel)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = actionsRender.onCancelRender(item);
        }
    }

    return (
        <td className="table__body--data ">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='SCHEDULED_GRANT.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--close u-icon--sml'
                        label='SCHEDULED_GRANT.LIST.BUTTON.CANCEL'
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

export default defaultTemplate(ScheduledGrantListTemplate);

