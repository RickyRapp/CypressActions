import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { SimpleBaasicTable, BaasicButton, BaasicModal } from 'core/components';
import { Content } from 'core/layouts';
import { TestReportCreate } from 'application/administration/test/components';

function TestReportListTemplate({ testReportViewStore }) {
    const {
        tableStore,
        reportModal
    } = testReportViewStore;

    return (
        <Content>
            <div className="card--primary card--med">
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                />
            </div>
            <BaasicModal modalParams={reportModal}>
                <TestReportCreate />
            </BaasicModal>
        </Content>
    )
}

TestReportListTemplate.propTypes = {
    testReportViewStore: PropTypes.object
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onGenerate } = actions;
    if (!isSome(onGenerate)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onGenerate) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base'
                        label='TEST.TEST_REPORT.LIST.BUTTON.GENERATE'
                        onlyIcon={true}
                        onClick={() => onGenerate(item)}>
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

export default defaultTemplate(TestReportListTemplate);
