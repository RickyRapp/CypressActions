import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout, Page } from 'core/layouts';
import { BankList, RoutingNumberList } from 'application/administration/bank/components';

function BankTabTemplate({ bankTabViewStore }) {
    const {
        loaderStore
    } = bankTabViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className='u-mar--bottom--med'>
                <TabLayout store={bankTabViewStore}>
                    <div label={'BANK.TAB.LIST'} className="u-mar--top--sml">
                        <BankList />
                    </div>
                    <div label={'BANK.TAB.ROUTING_NUMBER'} className="u-mar--top--sml">
                        <RoutingNumberList />
                    </div>
                </TabLayout>
            </div>
        </Page>
    );
}

BankTabTemplate.propTypes = {
    bankTabViewStore: PropTypes.object.isRequired,
};

export default defaultTemplate(BankTabTemplate);