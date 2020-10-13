import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageNavigation, TabLayout } from 'core/layouts';
import { GrantTab } from 'application/grant/pages';
import { ActivityTransaction } from 'application/activity/pages';

function ActivityTransactionTabTemplate({ activityTransactionTabViewStore, t }) {

    return (
        <TabLayout store={activityTransactionTabViewStore}>
            <div label={'ACTIVITY.TRANSACTION_TAB.ALL'}>
                <Transaction />
            </div>
            <div label={'ACTIVITY.TRANSACTION_TAB.STATEMENTS'}>
                TODO
                    </div>
        </TabLayout>
    );
}

ActivityTransactionTabTemplate.propTypes = {
    activityTransactionTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ActivityTransactionTabTemplate);