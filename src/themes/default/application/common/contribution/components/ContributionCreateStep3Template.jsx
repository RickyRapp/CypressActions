import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver, SimpleBaasicTable } from 'core/components';

const ContributionCreateStep3Template = function ({
    paymentType, routes, previousContributionsTableStore, bankAccount, form, t, clipboardText, downloadTxtFile, downloadStockTxtFile }) {
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
                    paymentType.abrv === 'wire-transfer' ? 
                    <div>
                        <a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(clipboardText)}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="btn btn--link btn--med" onClick={downloadTxtFile}>Download</a>
                        <div className="card--primary card--med u-mar--bottom--med" id="clipboard-info">
                            <br />
                            <h4>Please provide your bank or financial institution with the following information</h4>
                            <br />
                            <p><b>Beneficiary:</b></p>
                            <p> The Donors Fund</p>
                            <p>328 3rd Street, Lakewood NJ 08701</p>
                            <p><b>Beneficiary bank:</b></p>
                            <p>JP Morgan Chase</p>
                            <p>ABA (routing number): 021000021</p>
                            <p>Account number: 883220399</p>
                            <br />
                            <p><b>Wire Memo:</b></p>
                            <p> xxxx-xxxx-xxxx-{bankAccount.accountNumber} (your full account number goes here)</p>
                            <br />
                            <b className="type--color--note">Timeline: Funds will be made available to your account as soon as they are received!</b>
                            </div>
                    </div> : null
                }
                    {
                    paymentType.abrv === 'stock-and-securities' ? 
                    <div>
                        <a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(`
                        Beneficiary – Donors’ Fund Inc\n
                        Address - 328 3rd St Lakewood NJ 08701\n
                        EIN (tax ID) – 47-4844275\n
                        Brokerage Firm – Fidelity Investment\n
                        DTC – 0226\n
                        Brokerage Number - Z50762458`
                        )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="btn btn--link btn--med" onClick={downloadStockTxtFile}>Download</a>
                        <div className="card--primary card--med u-mar--bottom--med" id="clipboard-info">
                            <h4>Please provide your brokerage firm or financial advisor with the following information so they can initiate the transfer.</h4>
                            <br />
                            <p><b>Beneficiary</b> – Donors’ Fund Inc</p>
                            <p><b>Address</b> - 328 3rd St Lakewood NJ 08701</p>
                            <p><b>EIN (tax ID)</b> – 47-4844275</p>
                            <p><b>Brokerage Firm</b>– Fidelity Investment</p> 
                            <p><b>DTC</b> – 0226</p>
                            <p><b>Brokerage Number</b>- Z50762458</p> 
                            <br />
                            <b className="type--color--note">What happens next? Once we receive the security transfer we will initiate a selling order and then fund your account with the full selling price.</b>
                        </div>
                    </div> : null
                }
                {
                    paymentType.abrv !== 'wire-transfer' && paymentType.abrv !== 'stock-and-securities' ? 
                    <div className="type--color--note"> 
                        <b>Timeline: Funds will be made available within 3 - 5 business days.</b>
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
    t: PropTypes.func,
    clipboardText: PropTypes.string,
    downloadTxtFile: PropTypes.func
};

export default defaultTemplate(ContributionCreateStep3Template);
