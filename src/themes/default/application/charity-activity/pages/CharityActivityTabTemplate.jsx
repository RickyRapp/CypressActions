import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { AllTransactionList } from 'application/charity-activity/pages';
import { TabsHeader } from 'core/components';
import renderTabsContent from 'core/utils/renderTabsContent';

const CharityActivityTabTemplate = function ({ charityActivityTabViewStore }) {
    const { activeIndex } = charityActivityTabViewStore;

    const children = () => {
        return (
            <React.Fragment>
                <div label={'CHARITY_ACTIVITY.ALL_TRANSACTIONS'}>
                    <AllTransactionList />
                </div>
                <div label={'CHARITY_ACTIVITY.GRANTS'}>
                    Testing
                    </div>
            </React.Fragment>
        )
    }

    return (
        <Page>
            <PageHeader hideTitle={true}>
                <TabsHeader tabsStore={charityActivityTabViewStore}>{children().props.children}</TabsHeader>
            </PageHeader>

            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>
        </Page>
    );
}

CharityActivityTabTemplate.propTypes = {
    charityActivityTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityActivityTabTemplate);