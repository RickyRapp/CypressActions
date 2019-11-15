import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, EmptyState, BaasicButton } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content } from 'core/layouts';

function ScheduledSettingListTemplate({ scheduledSettingViewStore }) {
    const {
        tableStore
    } = scheduledSettingViewStore;

    return (
        <ApplicationListLayout store={scheduledSettingViewStore}>
            <Content emptyRenderer={renderEmpty()} >
                <div className="card--form card--primary card--med">
                    <SimpleBaasicTable
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
    )
}

function renderEmpty() {
    return <EmptyState image={EmptyIcon} title='ROLE.LIST.EMPTY_STATE.TITLE' description='ROLE.LIST.EMPTY_STATE.DESCRIPTION' />
}

ScheduledSettingListTemplate.propTypes = {
    scheduledSettingViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onRun } = actions;
    if (!isSome(onRun)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onRun) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='SCHEDULED_SETTING.LIST.BUTTON.RUN'
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
