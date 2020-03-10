import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { TestEmailList, ScheduledSettingList } from 'application/administration/test/pages';

function TestTabTemplate({ testTabViewStore }) {
    const {
        loaderStore
    } = testTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={testTabViewStore}>
                    <div label={'TEST.TAB.EMAIL'}>
                        <TestEmailList />
                    </div>
                    <div label={'TEST.TAB.SCHEDULED_TASK'}>
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