import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver, SimpleBaasicTable } from 'core/components';

const TransactionDonorTemplate = function ({ transactionDonorViewStore, t }) {
    const {
        donor,
        isPendingTransactionVisible,
        pendingTransactionTableStore,
        onExpandPendingTransactionClick
    } = transactionDonorViewStore;

    return (
        <div className="row">
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--sml">
                <div className="card--form card--primary card--med">
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
            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--tny">
                <div className="card--form card--primary card--med">
                    <div className="row">
                        <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--sml">
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
                            <div className="col col-sml-12 col-med-12 col-lrg-12 u-mar--bottom--sml">
                                <SimpleBaasicTable tableStore={pendingTransactionTableStore} />
                            </div>}
                        <div className="col col-sml-12 col-med-12 col-lrg-12">
                            Pending grants: $123 (TODO)
            </div>
                        <div className="col col-sml-12 col-med-12 col-lrg-12">
                            Checks on hold: $123 (TODO)
            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

TransactionDonorTemplate.propTypes = {
    transactionDonorViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(TransactionDonorTemplate);