import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityGeneralData, CharityPersonalData } from 'application/charity/components';
import { CharityPageHeaderOverview } from 'application/charity/components';
import { EmailList } from 'application/email/pages';

function CharityTabTemplate({ charityTabViewStore, rootStore }) {
    const {
        loaderStore,
        charityId
    } = charityTabViewStore;

    const {
        permissionStore
    } = rootStore;

    return (
        <Page loading={loaderStore.loading} >
            <AuthPageHeader
                type={0}
                authorization='theDonorsFundAdministrationSection.read' />

            <div className='u-mar--bottom--med'>
                <TabLayout store={charityTabViewStore}>
                    <div label={'CHARITY.TAB.GENERAL_DATA'}>
                        <CharityGeneralData />
                    </div>
                    <div label={'CHARITY.TAB.PERSONAL_DATA'}>
                        <CharityPersonalData />
                    </div>
                    {permissionStore.hasPermission('theDonorsFundAdministrationSection.update') &&
                        <div label={'CHARITY.TAB.EMAIL'}>
                            <EmailList charityId={charityId} />
                        </div>}
                </TabLayout>
            </div>
        </Page>
    );
}

const AuthPageHeader = withAuth(CharityPageHeaderOverview);

CharityTabTemplate.propTypes = {
    charityTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityTabTemplate);