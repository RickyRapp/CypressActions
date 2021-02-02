import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, BaasicButton, BaasicModal } from 'core/components';
import { Content } from 'core/layouts';
import { TestEmailCreate } from 'application/administration/test/components';

function TestEmailListTemplate({ testEmailViewStore }) {
    const {
        tableStore,
        emailModal
    } = testEmailViewStore;

    return (
        <Content>
            <div className="card--primary card--med">
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

TestEmailListTemplate.propTypes = {
    testEmailViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onSend } = actions;
    if (!isSome(onSend)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onSend) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base'
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
