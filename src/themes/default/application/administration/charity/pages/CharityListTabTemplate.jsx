import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { CharityInvalidBankAccountList, CharityList, CharityPendingList } from 'application/administration/charity/pages';

function CharityListTabTemplate({ charityListTabViewStore, rootStore }) {
    const {
        loaderStore
    } = charityListTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={charityListTabViewStore}>
                    <div label={'CHARITY.LIST.TAB.ALL_CHARITY'} className="u-mar--top--sml layout--nested">
                        <CharityList />
                    </div>
                    <div label={'CHARITY.LIST.TAB.PENDING_CHARITY'} className="u-mar--top--sml layout--nested">
                        <CharityPendingList />
                    </div>
                    <div label={'CHARITY.LIST.TAB.PENDING_BANK_ACCOUNT'} className="u-mar--top--sml layout--nested">
                        <CharityInvalidBankAccountList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

CharityListTabTemplate.propTypes = {
    charityListTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityListTabTemplate);