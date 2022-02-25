import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityGeneralData, CharityPersonalData } from 'application/charity/charity/components';

function CharityTabTemplate({ charityTabViewStore }) {
    const {
        loaderStore
    } = charityTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={charityTabViewStore}>
                    <div label={'CHARITY.TAB.ACCOUNT_INFORMATION'}>
                        <CharityGeneralData />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

CharityTabTemplate.propTypes = {
    charityTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityTabTemplate);