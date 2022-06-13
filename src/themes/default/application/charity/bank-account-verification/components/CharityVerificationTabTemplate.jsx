import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Content } from 'core/layouts';
import { CharityBankAccountList, CharityPlaid } from 'application/charity/charity/components';
import { CharityFileVerification } from 'application/charity/charity/pages';

function CharityVerificationTabTemplate({ charityVerificationTabViewStore }) {
    const {
        loaderStore
    } = charityVerificationTabViewStore;

    return (
        <Content loading={loaderStore.loading} >
            <div >
                <TabLayout store={charityVerificationTabViewStore}>
                    <div label={'CHARITY_VERIFICATION.TAB.PLAID'}>
                        <CharityPlaid
							entityType={"charity"}
							bankAccount={null}
						/>
                    </div>
                    <div label={'CHARITY_VERIFICATION.TAB.BANK_ACCOUNT'}>
                        <CharityBankAccountList />
                    </div>
                    <div label={'CHARITY_VERIFICATION.TAB.DOCUMENT'}>
                        <CharityFileVerification />
                    </div>
                </TabLayout>
            </div>
        </Content>
    );
}

CharityVerificationTabTemplate.propTypes = {
    charityVerificationTabViewStore: PropTypes.object.isRequired,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityVerificationTabTemplate);