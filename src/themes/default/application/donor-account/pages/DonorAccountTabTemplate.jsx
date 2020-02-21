import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { DonorAccountGeneralData, DonorAccountPersonalData, DonorAccountSettingData } from 'application/donor-account/components';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';
import { DonorNoteList } from 'application/donor-note/pages';

function DonorAccountTabTemplate({ donorAccountTabViewStore }) {
    const {
        donorAccountId,
        loaderStore
    } = donorAccountTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <AuthPageHeader
                donorAccountId={donorAccountId} type={0}
                authorization='theDonorsFundAdministrationSection.read' />

            <div className='u-mar--bottom--med'>
                <TabLayout store={donorAccountTabViewStore}>
                    <div label={'DONOR_ACCOUNT.TAB.GENERAL_DATA'}>
                        <DonorAccountGeneralData />
                    </div>
                    <div label={'DONOR_ACCOUNT.TAB.PERSONAL_DATA'}>
                        <DonorAccountPersonalData />
                    </div>
                    <div label={'DONOR_ACCOUNT.TAB.SETTING_DATA'}>
                        <DonorAccountSettingData />
                    </div>
                </TabLayout>
            </div>

            <AuthDonorNote
                id={donorAccountId}
                authorization='theDonorsFundAdministrationSection.update'
            />
        </Page>
    );
}

const AuthPageHeader = withAuth(DonorAccountPageHeaderOverview);
const AuthDonorNote = withAuth(DonorNoteList);

DonorAccountTabTemplate.propTypes = {
    donorAccountTabViewStore: PropTypes.object.isRequired,
};

export default defaultTemplate(DonorAccountTabTemplate);