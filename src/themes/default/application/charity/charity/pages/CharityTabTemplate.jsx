import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityGeneralData, CharityPersonalData } from 'application/charity/charity/components';

function CharityTabTemplate({ charityTabViewStore }) {
    const {
        loaderStore,
        charityId
    } = charityTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={charityTabViewStore}>
                    <div label={'CHARITY.TAB.GENERAL_DATA'}>
                        <CharityGeneralData charityId={charityId} />
                    </div>
                    <div label={'CHARITY.TAB.PERSONAL_DATA'}>
                        <CharityPersonalData charityId={charityId} />
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