import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';

const DonorToDonorConfirmationPageTemplate = function ({
     form, t }) {

    return (
        <div className="row">
            <div className="col col-sml-12 col-lrg-8">
                <div className="row">
                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--lrg">
                        <h3 className=" type--color--note">{t('CONTRIBUTION.CREATE.SUCCESS')}</h3>
                    </div>
                </div>
                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                            <h4 className="">{t('CONTRIBUTION.CREATE.SUMMARY')}</h4>
                        </div>
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">
                                    {t('CONTRIBUTION.CREATE.PAYMENT_TYPE')}
                                </span>
                                <span className="type--base type--wgt--bold u-push">
                                    {/* {paymentType.name} */}
                                    test
                                </span>
                            </div>
                        </div>

                        <React.Fragment>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">
                                        {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NAME')}
                                    </span>
                                    <span className="type--base type--wgt--bold u-push">
                                        {/* {bankAccount.name} */}
                                    </span>
                                </div>
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">
                                        {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NUMBER')}
                                    </span>
                                    <span className="type--base type--wgt--bold u-push">
                                        xxxx-xxxx-xxxx-123
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>

                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">
                                    {t('CONTRIBUTION.CREATE.CHECK_NUMBER')}
                                </span>
                                <span className="type--base type--wgt--bold u-push">
                                    test3
                                </span>
                            </div>
                        </div>

                        <React.Fragment>
                            <div className="col col-sml-12 col-lrg-12">
                                {t('CONTRIBUTION.CREATE.TRANSACTION_ID')}
                                {/* {form.$('tranasctionId').value} */}
                            </div>
                            <div className="col col-sml-12 col-lrg-12">
                                {t('CONTRIBUTION.CREATE.MEMO')}
                                {/* {form.$('memo').value} */}
                            </div>
                        </React.Fragment>

                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">
                                    {t('CONTRIBUTION.CREATE.AMOUNT')}
                                </span>
                                {/* <span className="type--base type--wgt--bold u-push">
                                    <FormatterResolver
                                        item={{ amount: form.$('amount').value }}
                                        field="amount"
                                        format={{ type: 'currency' }}
                                    />
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message message--success">
                    Timeline: Funds will be made available within 3 - 5 business days.
                </div>
            </div>
        </div>
    )
}

DonorToDonorConfirmationPageTemplate.propTypes = {
    paymentType: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    previousContributionsTableStore: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    bankAccount: PropTypes.object,
    t: PropTypes.func,
};

export default defaultTemplate(DonorToDonorConfirmationPageTemplate);