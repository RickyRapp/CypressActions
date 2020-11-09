import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable
} from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const ScheduledContributionListTemplate = function ({ scheduledContributionViewStore }) {
    const {
        tableStore,
        authorization
    } = scheduledContributionViewStore;

    return (
        <Content>
            <BaasicTable
                authorization={authorization}
                tableStore={tableStore}
                actionsComponent={renderActions}
            />
        </Content>
    )
};

ScheduledContributionListTemplate.propTypes = {
    scheduledContributionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    return (
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONOR_CONTRIBUTION_SETTING.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
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

export default defaultTemplate(ScheduledContributionListTemplate);

