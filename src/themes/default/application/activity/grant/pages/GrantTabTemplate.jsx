import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { BookletList } from 'application/booklet/pages';
import { BookletOrderList } from 'application/booklet-order/pages';
import { PastGrantList, GrantRequestList, ScheduledGrantList } from 'application/activity/grant/pages';

const GrantTabTemplate = function ({ grantTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <TabLayout store={grantTabViewStore}>
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

GrantTabTemplate.propTypes = {
    grantTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GrantTabTemplate);