import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityGeneralData, CharityPersonalData } from 'application/charity/components';
import { CharityPageHeaderOverview } from 'application/charity/components';

function CharityTabTemplate({ charityTabViewStore }) {
    const {
        loaderStore
    } = charityTabViewStore;

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
                </TabLayout>
            </div>
        </Page>
    );
}

const AuthPageHeader = withAuth(CharityPageHeaderOverview);

CharityTabTemplate.propTypes = {
    charityTabViewStore: PropTypes.object.isRequired,
};

export default defaultTemplate(CharityTabTemplate);