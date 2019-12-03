import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicModal
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';
import { isSome } from 'core/utils';
import { TransactionEdit } from 'application/reconcile/components';
import { TransactionPreviewTemplate } from 'themes/application/reconcile/components';

const CheckListTemplate = function ({ checkViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        editModal,
        previewModal
    } = checkViewStore;

    return (
        <ApplicationListLayout store={checkViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
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
            <BaasicModal modalParams={editModal}>
                <TransactionEdit />
            </BaasicModal>
            <BaasicModal modalParams={previewModal}>
                <TransactionPreviewTemplate />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='CHECK.LIST.EMPTY_STATE.TITLE' actionLabel='CHECK.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CheckListTemplate.propTypes = {
    checkViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onPreview } = actions;
    if (!isSome(onEdit) && !isSome(onPreview)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let previewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onPreviewRender) {
            previewRender = actionsRender.onPreviewRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='SESSION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='SESSION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onPreview(item)}>
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

export default defaultTemplate(CheckListTemplate);

