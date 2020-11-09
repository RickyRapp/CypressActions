import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, EmptyState, BaasicButton } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';

function ScheduledSettingListTemplate({ scheduledSettingViewStore }) {
    const {
        tableStore
    } = scheduledSettingViewStore;

    return (
        <Content emptyRenderer={renderEmpty()} >
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

function renderEmpty() {
    return <EmptyState image={EmptyIcon} title='TEST.SCHEDULED_SETTING.LIST.EMPTY_STATE.TITLE' description='TEST.SCHEDULED_SETTING.LIST.EMPTY_STATE.DESCRIPTION' />
}

ScheduledSettingListTemplate.propTypes = {
    scheduledSettingViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onRun } = actions;
    if (!isSome(onRun)) return null;

    return (
        <td className="table__body--data ">
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
