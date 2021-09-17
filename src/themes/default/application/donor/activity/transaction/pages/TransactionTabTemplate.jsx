import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { Transaction } from 'application/donor/activity/transaction/components';
import { TransactionDonor } from 'application/donor/activity/transaction/components';

const TransactionTabTemplate = function ({ transactionTabViewStore }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-xxxlrg-9 u-mar--bottom--tny">
                <TransactionDonor />
            </div>
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <TabLayout store={transactionTabViewStore} activeClassName="tabs--filter__item">
                    <div label={'ACTIVITY.TRANSACTION_TAB.ALL'}>
                        <Transaction />
                    </div>
                    <div label={'ACTIVITY.TRANSACTION_TAB.STATEMENTS'}>
                        <Transaction />
                    </div>
                </TabLayout>
            </div>
        </div>
    )
}

TransactionTabTemplate.propTypes = {
    transactionTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(TransactionTabTemplate);