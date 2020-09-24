import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { DonorAccountInformation, DonorSecurityAndPreferencesData, DonorCommunicationPreference } from 'application/donor/components';
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
            <div className='u-mar--bottom--med'>
                <TabLayout store={donorTabViewStore}>
                    <div label={'DONOR.TAB.ACCOUNT_INFORMATION'}>
                        <DonorAccountInformation donorId={donorId} />
                    </div>
                    <div label={'DONOR.TAB.SECURITY_AND_PREFERENCES'}>
                        <DonorSecurityAndPreferencesData donorId={donorId} />
                    </div>
                    <div label={'DONOR.TAB.COMMUNICATION_PREFERENCE'}>
                        <DonorCommunicationPreference donorId={donorId} />
                    </div>

                    {permissionStore.hasPermission('theDonorsFundAdministrationSection.create') &&
                        <div label={'DONOR.TAB.EMAIL'}>
                            <EmailList donorId={donorId} />
                        </div>}

                </TabLayout>
            </div>

            <AuthDonorNote
                id={donorId}
                authorization='theDonorsFundAdministrationSection.create'
            />
        </Page>
    );
}

const AuthDonorNote = withAuth(DonorNoteList);

DonorTabTemplate.propTypes = {
    donorTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(DonorTabTemplate);