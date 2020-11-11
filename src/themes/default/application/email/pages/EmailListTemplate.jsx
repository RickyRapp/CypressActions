import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    EmptyState,
    ListContent,
    BaasicButton
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { isSome } from 'core/utils';

const EmailListTableTemplate = function ({ emailViewStore }) {
    const {
        tableStore,
        routes,
        authorization } = emailViewStore;

    return (
        <ListContent>
            <div className="card--primary card--med">
                <Content emptyRenderer={renderEmpty(routes)} >
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </div>
        </ListContent>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='EMAIL.LIST.EMPTY_STATE.TITLE' actionLabel='EMAIL.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

EmailListTableTemplate.propTypes = {
    emailViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onPreview } = actions;
    if (!isSome(onPreview)) return null;

    let previewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onPreviewRender) {
            previewRender = actionsRender.onPreviewRender(item);
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='DONOR_NOTE.LIST.BUTTON.EDIT'
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

export default defaultTemplate(EmailListTableTemplate);

