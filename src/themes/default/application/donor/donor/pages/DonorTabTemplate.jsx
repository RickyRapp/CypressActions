import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { DonorAccountInformation, DonorSecurityAndPreferencesData, DonorCommunicationPreference } from 'application/donor/donor/components';
import renderTabsContent from 'core/utils/renderTabsContent';
import { TabsHeader } from 'core/components';

function DonorTabTemplate({ donorTabViewStore }) {
    const {
        loaderStore,
        activeIndex
    } = donorTabViewStore;

    const children = () => {
        return (
            <React.Fragment>
                <div label={'DONOR.TAB.ACCOUNT_INFORMATION'}>
                    <DonorAccountInformation />
                </div>
                <div label={'DONOR.TAB.SECURITY_AND_PREFERENCES'}>
                    <DonorSecurityAndPreferencesData />
                </div>
                <div label={'DONOR.TAB.COMMUNICATION_PREFERENCE'}>
                    <DonorCommunicationPreference />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page loading={loaderStore.loading}>
            <PageHeader>
                <div className="col col-sml-12 header__tabs--lrg">
                <TabsHeader tabsStore={donorTabViewStore}>{children().props.children}</TabsHeader>
                </div>
            </PageHeader>

            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>
        </Page>
    );
}

DonorTabTemplate.propTypes = {
    donorTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(DonorTabTemplate);