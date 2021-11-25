import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { ContributionList } from 'application/donor/activity/contribution/pages';
import { TransactionDonor } from 'application/donor/activity/transaction/components';

const ContributionTabTemplate = function ({ contributionTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12 col-xxxlrg-10 u-mar--bottom--tny u-mar--top--sml">
                <TransactionDonor />
            </div>
            <div className="col col-sml-12 col-med-12 col-lrg-12">
                <TabLayout store={contributionTabViewStore} activeClassName="tabs--filter__item">
                    <div label={'ACTIVITY.DEPOSIT_TAB.CONTRIBUTION'}>
                        <ContributionList />
                    </div>
                    <div label={'ACTIVITY.DEPOSIT_TAB.SCHEDULED_CONTRIBUTION'}>
                        {/* <ScheduledContributionList /> */}
                        <div className="card--primary card--med type--center">
                            <i className="u-icon u-icon--rounded u-icon--rounded--coming-soon"></i>
                            <p className="type--lrg type--wgt--medium type--color--opaque u-mar--top--sml">Coming Soon</p>
                        </div>

                    </div>
                </TabLayout>
            </div>
        </div>
    )
}

ContributionTabTemplate.propTypes = {
    contributionTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ContributionTabTemplate);