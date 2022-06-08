import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { ContributionAchReviewList, ContributionList } from 'application/administration/contribution/pages';

function ContributionTabTemplate({ contributionTabViewStore }) {
    const {
        loaderStore
    } = contributionTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={contributionTabViewStore}>
                    <div label={'CONTRIBUTION.LIST.TAB.ALL_DEPOSITS'} className="u-mar--top--sml layout--nested">
                        <ContributionList />
                    </div>
                    <div label={'CONTRIBUTION.LIST.TAB.REVIEW_DEPOSITS'} className="u-mar--top--sml layout--nested">
                        <ContributionAchReviewList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

ContributionTabTemplate.propTypes = {
    contributionTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionTabTemplate);