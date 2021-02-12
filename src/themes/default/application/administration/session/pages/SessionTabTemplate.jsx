import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { SessionList, SessionInProgressList, SessionPendingCertificateList } from 'application/administration/session/pages';

function SessionTabTemplate({ sessionTabViewStore }) {
    const {
        loaderStore
    } = sessionTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={sessionTabViewStore}>
                    <div label={'SESSION.TAB.LIST'} className="u-mar--top--sml">
                        <SessionList />
                    </div>
                    {/* <div label={'SESSION.TAB.IN_PROGRESS'} className="u-mar--top--sml">
                        <SessionInProgressList />
                    </div> */}
                    <div label={'SESSION.TAB.PENDING_CERTIFICATE'} className="u-mar--top--sml">
                        <SessionPendingCertificateList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

SessionTabTemplate.propTypes = {
    sessionTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(SessionTabTemplate);