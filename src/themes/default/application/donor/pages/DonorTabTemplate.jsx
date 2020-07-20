import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { DonorGeneralData, DonorPersonalData, DonorSettingData, DonorInvestmentData } from 'application/donor/components';
import { DonorPageHeaderOverview } from 'application/donor/components';
import { DonorNoteList } from 'application/donor-note/pages';
import { EmailList } from 'application/email/pages';

function DonorTabTemplate({ donorTabViewStore, rootStore }) {
    const {
        donorId,
        loaderStore
    } = donorTabViewStore;

    const {
        permissionStore
    } = rootStore;

    return (
        <Page loading={loaderStore.loading} >
            <AuthPageHeader
                donorId={donorId}
                type={0}
                authorization='theDonorsFundAdministrationSection.read' />

            <div className='u-mar--bottom--med'>
                <TabLayout store={donorTabViewStore}>
                    <div label={'DONOR.TAB.GENERAL_DATA'}>
                        <DonorGeneralData />
                    </div>
                    <div label={'DONOR.TAB.PERSONAL_DATA'}>
                        <DonorPersonalData />
                    </div>
                    <div label={'DONOR.TAB.SETTING_DATA'}>
                        <DonorSettingData />
                    </div>
                    <div label={'DONOR.TAB.INVESTMENT_DATA'}>
                        <DonorInvestmentData />
                    </div>

                    {permissionStore.hasPermission('theDonorsFundAdministrationSection.update') &&
                        <div label={'DONOR.TAB.EMAIL'}>
                            <EmailList donorId={donorId} />
                        </div>}

                </TabLayout>
            </div>

            <AuthDonorNote
                id={donorId}
                authorization='theDonorsFundAdministrationSection.update'
            />
        </Page>
    );
}

const AuthPageHeader = withAuth(DonorPageHeaderOverview);
const AuthDonorNote = withAuth(DonorNoteList);

DonorTabTemplate.propTypes = {
    donorTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(DonorTabTemplate);