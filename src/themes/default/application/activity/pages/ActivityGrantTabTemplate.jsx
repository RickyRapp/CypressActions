import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { GrantRequestList, ScheduledGrantList } from 'application/grant/pages';
import { BookletList } from 'application/booklet/pages';
import { BookletOrderList } from 'application/booklet-order/pages';
import { PastGrantList } from 'application/donation/pages';

const ActivityGrantTabTemplate = function ({ activityGrantTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <TabLayout store={activityGrantTabViewStore}>
                    <div label={'ACTIVITY.GRANT_TAB.PAST_GRANT'}>
                        <PastGrantList />
                    </div>
                    <div label={'ACTIVITY.GRANT_TAB.SCHEDULED_LIST'}>
                        <ScheduledGrantList />
                    </div>
                    <div label={'ACTIVITY.GRANT_TAB.GRANT_REQUEST'}>
                        <GrantRequestList />
                    </div>
                    <div label={'ACTIVITY.GRANT_TAB.CERTIFICATE_LIST'}>
                        <BookletList />
                    </div>
                    <div label={'ACTIVITY.GRANT_TAB.BOOKLET_ORDER_LIST'}>
                        <BookletOrderList />
                    </div>
                </TabLayout>
            </div>
        </div>
    )
}

ActivityGrantTabTemplate.propTypes = {
    activityGrantTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ActivityGrantTabTemplate);