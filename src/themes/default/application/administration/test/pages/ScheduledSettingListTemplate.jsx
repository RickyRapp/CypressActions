import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, BaasicButton } from 'core/components';
import { Content } from 'core/layouts';

function ScheduledSettingListTemplate({ scheduledSettingViewStore }) {
    const {
        tableStore
    } = scheduledSettingViewStore;

    return (
        <Content>
            <div className="card--primary card--med">
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                    loading={tableStore.loading}
                />
            </div>
        </Content>
    )
}

ScheduledSettingListTemplate.propTypes = {
    scheduledSettingViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onRun } = actions;
    if (!isSome(onRun)) return null;

    return (
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onRun) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--sml'
                        label='TEST.SCHEDULED_SETTING.LIST.BUTTON.RUN'
                        onlyIcon={true}
                        onClick={() => onRun(item.abrv)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
};

export default defaultTemplate(ScheduledSettingListTemplate);
