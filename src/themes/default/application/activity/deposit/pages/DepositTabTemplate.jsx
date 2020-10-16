import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { ContributionList, FundTransferList, ScheduledContributionList } from 'application/activity/deposit/pages';

const DepositTabTemplate = function ({ depositTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <TabLayout store={depositTabViewStore}>
                    <div label={'ACTIVITY.DEPOSIT_TAB.CONTRIBUTION'}>
                        <ContributionList />
                    </div>
                    <div label={'ACTIVITY.DEPOSIT_TAB.SCHEDULED_CONTRIBUTION'}>
                        <ScheduledContributionList />
                    </div>
                    <div label={'ACTIVITY.DEPOSIT_TAB.FUND_TRANSFER'}>
                        <FundTransferList />
                    </div>
                </TabLayout>
            </div>
        </div>
    )
}

DepositTabTemplate.propTypes = {
    depositTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DepositTabTemplate);