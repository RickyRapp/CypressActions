import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, EmptyState, BaasicButton, BaasicModal } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { TestEmailCreate } from 'application/administration/test/components';

function TestEmailListTemplate({ testEmailViewStore }) {
    const {
        tableStore,
        emailModal
    } = testEmailViewStore;

    return (
        <Content emptyRenderer={renderEmpty()} >
            <div className="u-clearfix u-mar--bottom--sml">
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                />
            </div>
            <BaasicModal modalParams={emailModal}>
                <TestEmailCreate />
            </BaasicModal>
        </Content>
    )
}

function renderEmpty() {
    return <EmptyState image={EmptyIcon} title='TEST.TEST_EMAIL.LIST.EMPTY_STATE.TITLE' description='TEST.TEST_EMAIL.LIST.EMPTY_STATE.DESCRIPTION' />
}

TestEmailListTemplate.propTypes = {
    testEmailViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onSend } = actions;
    if (!isSome(onSend)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onSend) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='TEST.TEST_EMAIL.LIST.BUTTON.SEND'
                        onlyIcon={true}
                        onClick={() => onSend(item)}>
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

export default defaultTemplate(TestEmailListTemplate);
