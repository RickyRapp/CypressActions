import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { DonorAccountInformation, DonorSecurityAndPreferencesData, DonorCommunicationPreference } from 'application/administration/donor/components';
import renderTabsContent from 'core/utils/renderTabsContent';
import { TabsHeader } from 'core/components';
import { DonorNoteList } from 'application/administration/donor-note/pages';
import { EmailList } from 'application/administration/email/pages';

function DonorTabTemplate({ donorTabViewStore, rootStore }) {
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
                <div label={'DONOR.TAB.EMAIL'}>
                    <EmailList donorId={rootStore.routerStore.routerState.params.id} />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page loading={loaderStore.loading}>
            <PageHeader>
                <div className="col col-sml-12">
                    <TabsHeader tabsStore={donorTabViewStore}>{children().props.children}</TabsHeader>
                </div>
            </PageHeader>

            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>

            <DonorNoteList />
        </Page>
    );
}

DonorTabTemplate.propTypes = {
    donorTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object
};

export default defaultTemplate(DonorTabTemplate);