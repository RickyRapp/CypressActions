import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { TestEmailList, TestReportList, ScheduledSettingList, WelcomeExistingAccountsEmails, APITesting } from 'application/administration/test/pages';

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
                    <div label={'TEST.TAB.WELCOME_EMAILS'} className="u-mar--top--sml">
                        <WelcomeExistingAccountsEmails />
                    </div>
                    <div label={'TEST.TAB.API_TESTING'} className="u-mar--top--sml">
                        <APITesting />
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