import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    ListContent,
    BaasicButton
} from 'core/components';
import { Content } from 'core/layouts';
import { isSome } from 'core/utils';

const EmailListTableTemplate = function ({ emailViewStore }) {
    const {
        tableStore,
        authorization
    } = emailViewStore;

    return (
        <ListContent>
            <div className="card--primary card--med u-mar--bottom--med">
                <Content >
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
                        icon='u-icon u-icon--preview u-icon--base'
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

