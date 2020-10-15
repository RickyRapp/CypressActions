import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { Transaction } from 'application/activity/components';
import { ActivityTransactionDonor } from 'application/activity/components';

const ActivityTransactionTabTemplate = function ({ activityTransactionTabViewStore }) {
    const {
        donorId,
        onDonorChange
    } = activityTransactionTabViewStore;

    return (
        <div className="row">
            {donorId &&
                <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                    <ActivityTransactionDonor donorId={donorId} />
                </div>}
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <TabLayout store={activityTransactionTabViewStore}>
                    <div label={'ACTIVITY.TRANSACTION_TAB.ALL'}>
                        <Transaction onDonorChange={onDonorChange} />
                    </div>
                    <div label={'ACTIVITY.TRANSACTION_TAB.STATEMENTS'}>
                        TODO
                    </div>
                </TabLayout>
            </div>
        </div>
    )
}

ActivityTransactionTabTemplate.propTypes = {
    activityTransactionTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ActivityTransactionTabTemplate);