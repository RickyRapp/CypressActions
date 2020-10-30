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
            <div className="col col-sml-12 u-mar--top--med u-mar--bottom--sml">
                <div className="card--secondary card--med u-mar--bottom--sml">
                    <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.YOUR_FUNDS')}</h3>
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-3">
                            <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.AVAILABLE_BALANCE')}</h5 >
                            <div>
                                <p className="type--base type--wgt--medium type--color--opaque">{t('DASHBOARD.AVAILABLE_BALANCE_DESCRIPTION')}</p >
                            </div>
                        </div>
                        <div className="col col-sml-12 col-lrg-3 type--base type--wgt--bold type--color--note">
                            {donor &&
                                <FormatterResolver
                                    item={{ balance: donor.availableBalance }}
                                    field='balance'
                                    format={{ type: 'currency' }}
                                />}
                        </div>
                    </div>
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-3">
                            <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.PRESENT_BALANCE')}</h5>
                            <div>
                                <p className="type--base type--wgt--medium type--color--opaque">{t('DASHBOARD.PRESENT_BALANCE_DESCRIPTION')}</p >
                            </div>
                        </div>
                        <div className="col col-sml-12 col-lrg-3 type--base type--wgt--bold type--color--note">
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
            <div className="col col-sml-12 u-mar--bottom--tny">
                <div className="card--primary card--med u-mar--bottom--sml">
                    <div className="row">
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <span className="type--base type--wgt--bold type--color--note">SHOW PENDING TRANSACTIONS</span>
                            <BaasicButton
                                className="btn btn--icon"
                                icon={`u-icon ${isPendingTransactionVisible ? 'u-icon--close' : 'u-icon--arrow-down'} u-icon--sml`}
                                label='EXPAND'
                                onlyIcon={true}
                                onClick={() => onExpandPendingTransactionClick()}>
                            </BaasicButton>
                        </div>
                        {isPendingTransactionVisible &&
                            <div className="col col-sml-12 u-mar--bottom--sml">
                                <SimpleBaasicTable tableStore={pendingTransactionTableStore} />
                            </div>}
                        <div className="col col-sml-12 type--base type--wgt--medium type--color--opaque">
                            <div className="row u-mar--bottom--tny">
                                <div className="col col-sml-12 col-lrg-3">
                                    Pending grants: 
                                </div>
                                <div className="col col-sml-12 col-lrg-3">
                                    $123 (TODO)
                                </div>
                            </div>
                            <div className="row u-mar--bottom--tny">
                                <div className="col col-sml-12 col-lrg-3">
                                    Checks on hold: 
                                </div>
                                <div className="col col-sml-12 col-lrg-3">
                                    $123 (TODO) 
                                </div>
                            </div>
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