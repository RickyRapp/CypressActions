import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver, SimpleBaasicTable } from 'core/components';

const ContributionCreateStep3Template = function ({
    paymentType, routes, previousContributionsTableStore, bankAccount, form, t, downloadZelleTxtFile }) {
        
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
                            <p><b>Step 2</b></p>
                            <h4 className="">{t('CONTRIBUTION.CREATE.SUMMARY')}</h4>
                        </div>
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">
                                    {t('CONTRIBUTION.CREATE.PAYMENT_TYPE')}
                                </span>
                                <span className="type--base type--wgt--bold u-push">
                                    {paymentType.name}
                                </span>
                            </div>
                        </div>
                        {(paymentType.abrv === 'ach' || (paymentType.abrv === 'wire-transfer' && form.$('bankAccountId').value)) && (
                            <React.Fragment>
                                <div className="col col-sml-12 col-lrg-12">
                                    <div className="card--tny card--secondary u-mar--bottom--sml">
                                        <span className="type--base type--wgt--medium type--color--opaque">
                                            {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NAME')}
                                        </span>
                                        <span className="type--base type--wgt--bold u-push">
                                            {bankAccount.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-lrg-12">
                                    <div className="card--tny card--secondary u-mar--bottom--sml">
                                        <span className="type--base type--wgt--medium type--color--opaque">
                                            {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NUMBER')}
                                        </span>
                                        <span className="type--base type--wgt--bold u-push">
                                            xxxx-xxxx-xxxx-{bankAccount.accountNumber}
                                        </span>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        {paymentType.abrv === 'check' && (
                            <div className="col col-sml-12 col-lrg-12">
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">
                                        {t('CONTRIBUTION.CREATE.CHECK_NUMBER')}
                                    </span>
                                    <span className="type--base type--wgt--bold u-push">
                                        {form.$('checkNumber').value}
                                    </span>
                                </div>
                            </div>
                        )}

                        {paymentType.abrv === 'chase-quickpay' && (
                            <React.Fragment>
                                <div className="col col-sml-12 col-lrg-12">
                                    {t('CONTRIBUTION.CREATE.TRANSACTION_ID')}
                                    {form.$('tranasctionId').value}
                                </div>
                                <div className="col col-sml-12 col-lrg-12">
                                    {t('CONTRIBUTION.CREATE.MEMO')}
                                    {form.$('memo').value}
                                </div>
                            </React.Fragment>
                        )}
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">
                                    {t('CONTRIBUTION.CREATE.AMOUNT')}
                                </span>
                                <span className="type--base type--wgt--bold u-push">
                                    <FormatterResolver
                                        item={{ amount: form.$('amount').value }}
                                        field="amount"
                                        format={{ type: 'currency' }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    paymentType.abrv === 'zelle' ? <div><a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(`
                    Our Zelle email address - QP@TheDonorsFund.org\n
                    Zelle Memo: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                    Amount: $${form.$('amount').value.toFixed(2)}`
                    )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="btn btn--link btn--med" onClick={downloadZelleTxtFile}>Download</a></div> : null

                }

                {paymentType.abrv === 'zelle' ? 
                    <div className="card--primary card--med u-mar--bottom--med" id="clipboard-info">
                        <h4>Please use the below email address to initiate your Zelle or QuickPay payment.</h4>
                        <br />
                        <p><b>Our Zelle email address:</b> QP@TheDonorsFund.org</p>
                        <p><b>Zelle Memo:</b> xxxx-xxxx-xxxx-{bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)</p>
                        <p><b>Amount:</b> <FormatterResolver
                                        item={{ amount: form.$('amount').value }}
                                        field="amount"
                                        format={{ type: 'currency' }}
                                    /></p>
                    </div> : null
                }
                
            </div>
            <div className="col col-sml-12 col-lrg-4">
                <div className="card--primary card--med u-mar--bottom--med">
                    <h5 className="type--med type--wgt--medium u-mar--bottom--sml">
                        {t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}
                    </h5>
                    <SimpleBaasicTable tableStore={previousContributionsTableStore} />
                    <BaasicButton
                        className="btn btn--100 btn--primary u-mar--top--med"
                        label="CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS"
                        onClick={routes.allContributions}
                    ></BaasicButton>
                </div>
            </div>
        </div>
    )
}

ContributionCreateStep3Template.propTypes = {
    paymentType: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    previousContributionsTableStore: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    bankAccount: PropTypes.object,
    downloadZelleTxtFile: PropTypes.func,
    t: PropTypes.func,
    clipboardText: PropTypes.string,
    downloadTxtFile: PropTypes.func
};

export default defaultTemplate(ContributionCreateStep3Template);
