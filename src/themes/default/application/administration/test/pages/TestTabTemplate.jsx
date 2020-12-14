import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { TestEmailList, TestReportList, ScheduledSettingList } from 'application/administration/test/pages';

function TestTabTemplate({ testTabViewStore }) {
    const {
        loaderStore
    } = testTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={testTabViewStore}>
                    <div label={'TEST.TAB.EMAIL'} className="u-mar--top--sml">
                        <TestEmailList />
                    </div>
                    <div label={'TEST.TAB.REPORT'} className="u-mar--top--sml">
                        <TestReportList />
                    </div>
                    <div label={'TEST.TAB.SCHEDULED_TASK'} className="u-mar--top--sml">
                        <ScheduledSettingList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

TestTabTemplate.propTypes = {
    testTabViewStore: PropTypes.object.isRequired,
};

export default defaultTemplate(TestTabTemplate);