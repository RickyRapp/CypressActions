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
            <div className="tabs__verify__body">
                <TabLayout store={charityVerificationTabViewStore}>
                    <div label={'CHARITY_VERIFICATION.TAB.PLAID'}>
                    <div className="row row--form u-mar--top--med">
                        <div className='col col-sml-12 col-lrg-3'></div>
                            <CharityPlaid
                                entityType={"charity"}
                                bankAccount={null}
                            />
                        </div>
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