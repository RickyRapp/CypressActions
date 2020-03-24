import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { SessionList, SessionInProgressList } from 'application/session/pages';
import { ScannerConnectionList } from 'application/scanner-connection/pages';

function SessionTabTemplate({ sessionTabViewStore, rootStore }) {
    const {
        loaderStore
    } = sessionTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={sessionTabViewStore}>
                    <div label={'SESSION.TAB.LIST'}>
                        <SessionList />
                    </div>
                    <div label={'SESSION.TAB.IN_PROGRESS'}>
                        <SessionInProgressList />
                    </div>
                    <div label={'SESSION.TAB.CONNECTIONS'}>
                        <ScannerConnectionList />
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