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
import { TransactionEdit } from 'application/administration/reconcile/components';
import { TransactionPreviewTemplate } from 'themes/application/administration/reconcile/components';

const ReconcileListTemplate = function ({ reconcileViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        editModal,
        previewModal
    } = reconcileViewStore;

    return (
        <ApplicationListLayout store={reconcileViewStore} authorization={authorization}>
            <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
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
            <BaasicModal modalParams={editModal}>
                <TransactionEdit />
            </BaasicModal>
            <BaasicModal modalParams={previewModal}>
                <TransactionPreviewTemplate />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

ReconcileListTemplate.propTypes = {
    reconcileViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onPreview, onCash } = actions;
    if (!isSome(onEdit) && !isSome(onPreview) && !isSome(onCash)) return null;

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

    let cashRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCashRender) {
            cashRender = actionsRender.onCashRender(item);
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='RECONCILE.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='RECONCILE.LIST.BUTTON.PREVIEW'
                        onlyIcon={true}
                        onClick={() => onPreview(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCash) && cashRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--sml'
                        label='RECONCILE.LIST.BUTTON.CASH'
                        onlyIcon={true}
                        onClick={() => onCash(item)}>
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

export default defaultTemplate(ReconcileListTemplate);

