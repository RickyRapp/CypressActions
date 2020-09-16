import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, DateRangeQueryPicker, FormatterResolver, SimpleBaasicTable, TableFilter } from 'core/components';
import { TabLayout } from 'core/layouts';

const TransactionTemplate = function ({ transactionViewStore, t }) {
    const {
        tableStore,
        queryUtility,
        dateCreatedDateRangeQueryStore,
        donor,
        isPendingTransactionVisible,
        onExpandPendingTransactionClick,
        pendingTransactionTableStore
    } = transactionViewStore;

    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <div className="card--form card--primary card--med u-mar--bottom--sml">
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-6">
                            <h5>{t('DASHBOARD.AVAILABLE_BALANCE')}</h5>
                            <div>
                                <small>{t('DASHBOARD.AVAILABLE_BALANCE_DESCRIPTION')}</small>
                            </div>
                        </div>
                        <div className="col col-sml-12 col-lrg-6">
                            {donor &&
                                <FormatterResolver
                                    item={{ balance: donor.availableBalance }}
                                    field='balance'
                                    format={{ type: 'currency' }}
                                />}
                        </div>
                    </div>
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-6">
                            <h5>{t('DASHBOARD.PRESENT_BALANCE')}</h5>
                            <div>
                                <small>{t('DASHBOARD.PRESENT_BALANCE_DESCRIPTION')}</small>
                            </div>
                        </div>
                        <div className="col col-sml-12 col-lrg-6">
                            {donor &&
                                <FormatterResolver
                                    item={{ balance: donor.presentBalance }}
                                    field='balance'
                                    format={{ type: 'currency' }}
                                />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <div className="card--form card--primary card--med u-mar--bottom--sml">
                    <div className="row">
                        <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--med">
                            SHOW PENDING TRANSACTIONS
                            <BaasicButton
                                className="btn btn--icon"
                                icon={`u-icon ${isPendingTransactionVisible ? 'u-icon--close' : 'u-icon--arrow-down'} u-icon--sml`}
                                label='EXPAND'
                                onlyIcon={true}
                                onClick={() => onExpandPendingTransactionClick()}>
                            </BaasicButton>
                        </div>
                        {isPendingTransactionVisible &&
                            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--xlrg">
                                <SimpleBaasicTable tableStore={pendingTransactionTableStore} />
                            </div>}
                        <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                            Pending grants TODO
                        </div>
                        <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                            Checks on hold TODO
                        </div>
                    </div>
                </div>
            </div>
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--lrg">
                <TabLayout store={transactionViewStore}>
                    <div label={'ACTIVITY.TRANSACTION_TAB.ALL'}>
                        <div className="card--form card--secondary card--med u-mar--bottom--sml">
                            <TableFilter queryUtility={queryUtility} >
                                <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                    <DateRangeQueryPicker
                                        queryUtility={queryUtility}
                                        store={dateCreatedDateRangeQueryStore}
                                        fromPropertyName='dateCreatedFrom'
                                        toPropertyName='dateCreatedTo'
                                    />
                                </div>
                            </TableFilter>
                        </div>
                        <div className="card--form card--primary card--med">
                            <h3 className="u-mar--bottom--med"></h3>
                            <BaasicTable
                                tableStore={tableStore}
                            />
                        </div>
                    </div>
                    <div label={'ACTIVITY.TRANSACTION_TAB.STATEMENTS'}>
                        TODO
                    </div>
                </TabLayout>
            </div>
        </div>
    )
}

TransactionTemplate.propTypes = {
    transactionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(TransactionTemplate);