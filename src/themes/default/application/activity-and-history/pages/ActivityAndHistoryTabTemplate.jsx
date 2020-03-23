import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { DonorActivityAndHistoryList, CharityActivityAndHistoryList } from 'application/activity-and-history/components';

function ActivityAndHistoryTabTemplate({ activityAndHistoryTabViewStore }) {
    const {
        loaderStore
    } = activityAndHistoryTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={activityAndHistoryTabViewStore}>
                    <div label={'ACTIVITY_AND_HISTORY.TAB.DONOR'}>
                        <DonorActivityAndHistoryList />
                    </div>
                    <div label={'ACTIVITY_AND_HISTORY.TAB.CHARITY'}>
                        <CharityActivityAndHistoryList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

ActivityAndHistoryTabTemplate.propTypes = {
    activityAndHistoryTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(ActivityAndHistoryTabTemplate);