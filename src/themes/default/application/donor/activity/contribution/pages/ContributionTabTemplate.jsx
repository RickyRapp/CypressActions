import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { ContributionList } from 'application/donor/activity/contribution/pages';

const ContributionTabTemplate = function ({ contributionTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12">
                <TabLayout store={contributionTabViewStore} activeClassName="tabs--filter__item">
                    <div label={'ACTIVITY.DEPOSIT_TAB.CONTRIBUTION'}>
                        <ContributionList />
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