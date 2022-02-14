import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { CharityGeneralData, CharityPersonalData, CharitySecurityAndPreferencesData } from 'application/charity/charity/components';
import renderTabsContent from 'core/utils/renderTabsContent';
import { TabsHeader } from 'core/components';

function CharityTabTemplate({ charityTabViewStore }) {
    const {
        loaderStore,
        activeIndex
    } = charityTabViewStore;

    const children = () => {
        return (
            <React.Fragment>
                <div label={'CHARITY.TAB.ACCOUNT_INFORMATION'}>
                    <CharityGeneralData />
                </div>
                <div label={'CHARITY.TAB.SECURITY_AND_PREFERENCES'}>
                    <CharitySecurityAndPreferencesData />
                </div>
                <div label={'CHARITY.TAB.COMMUNICATION_PREFERENCE'}>
                    <CharityPersonalData />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page loading={loaderStore.loading}>
            <PageHeader>
                <div className="col col-sml-12 header__tabs--lrg">
                <TabsHeader tabsStore={charityTabViewStore}>{children().props.children}</TabsHeader>
                </div>
            </PageHeader>

            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>
        </Page>
    );

}

CharityTabTemplate.propTypes = {
    charityTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityTabTemplate);