import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { ContributionList, ScheduledContributionList } from 'application/activity/deposit/pages';

const DepositTabTemplate = function ({ depositTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12">
                <TabLayout store={depositTabViewStore} activeClassName="tabs--filter__item">
                    <div label={'ACTIVITY.DEPOSIT_TAB.CONTRIBUTION'}>
                        <ContributionList />
                    </div>
                    <div label={'ACTIVITY.DEPOSIT_TAB.SCHEDULED_CONTRIBUTION'}>
                        <ScheduledContributionList />
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