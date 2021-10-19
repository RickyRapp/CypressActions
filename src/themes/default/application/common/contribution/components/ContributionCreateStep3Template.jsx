import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, FormatterResolver, SimpleBaasicTable } from 'core/components';

const ContributionCreateStep3Template = function ({
    paymentType, routes, previousContributionsTableStore, bankAccount, form, t, clipboardText, downloadTxtFile, downloadStockTxtFile, downloadThirdPartyTxtFile, downloadZelleTxtFile, downloadCheckTxtFile, downloadPayrollDirectTxtFile }) {
    return (
        <div className="row">
            <div className="col col-sml-12 col-lrg-8">
                <h3 className="type--color--note u-mar--bottom--sml">Step 2 - {t('CONTRIBUTION.CREATE.SUCCESS')}</h3>

                <div className="card--primary card--med u-mar--bottom--med">

                    <p><b>Step 2</b></p>
                    <h4 className="u-mar--bottom--sml">{t('CONTRIBUTION.CREATE.SUMMARY')}</h4>

                    <div className="card--tny card--secondary u-mar--bottom--sml">
                        <span className="type--base type--wgt--medium type--color--opaque">
                            {t('CONTRIBUTION.CREATE.PAYMENT_TYPE')}
                        </span>
                        <span className="type--base type--wgt--bold u-push">
                            {paymentType.name}
                        </span>
                    </div>

                    {(paymentType.abrv === 'ach' || (paymentType.abrv === 'wire-transfer' && form.$('bankAccountId').value)) && (
                        <React.Fragment>

                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">
                                    {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NAME')}
                                </span>
                                <span className="type--base type--wgt--bold u-push">
                                    {bankAccount.name}
                                </span>
                            </div>

                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <div className="row">
                                    <div className="col col-sml-6">
                                        <span className="type--base type--wgt--medium type--color--opaque">
                                            {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NUMBER')}
                                        </span>
                                    </div>
                                    <div className="col col-sml-6 type--right">
                                        <span className="type--base type--wgt--bold u-push">
                                            xxxx-xxxx-xxxx-{bankAccount.accountNumber}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </React.Fragment>
                    )}
                    {paymentType.abrv === 'check' && (

                        <div className="card--tny card--secondary u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-6">
                                    <span className="type--base type--wgt--medium type--color--opaque">
                                        {t('CONTRIBUTION.CREATE.CHECK_NUMBER')}
                                    </span>
                                </div>
                                <div className="col col-sml-6">
                                    <span className="type--base type--wgt--bold u-push">
                                        {form.$('checkNumber').value}
                                    </span>
                                </div>
                            </div>
                        </div>

                    )}

                    {paymentType.abrv === 'chase-quickpay' && (
                        <React.Fragment>
                            <div className="row">
                                <div className="col col-sml-6">
                                    {t('CONTRIBUTION.CREATE.TRANSACTION_ID')}
                                    {form.$('tranasctionId').value}
                                </div>
                                <div className="col col-sml-6">
                                    {t('CONTRIBUTION.CREATE.MEMO')}
                                    {form.$('memo').value}
                                </div>
                            </div>
                        </React.Fragment>
                    )}

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

                {
                    paymentType.abrv === 'wire-transfer' ?
                        <div>
                            <h3 className="type--color--note u-mar--bottom--sml">Please provide your bank or financial institution with the following information</h3>
                            <div className="card--primary card--med u-mar--bottom--med" id="clipboard-info">
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Beneficiary</span>
                                    <span className="type--base type--wgt--bold u-push">Donors’ Fund Inc</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Address</span>
                                    <span className="type--base type--wgt--bold u-push">328 3rd Street, Lakewood NJ 08701</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Beneficiary bank</span>
                                    <span className="type--base type--wgt--bold u-push">JP Morgan Chase</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">ABA (routing number)</span>
                                    <span className="type--base type--wgt--bold u-push">021000021</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Account number</span>
                                    <span className="type--base type--wgt--bold u-push">883220399</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--med">
                                    <span className="type--base type--wgt--medium type--color--opaque">Wire Memo</span>
                                    <span className="type--base type--wgt--bold u-push">xxxx-xxxx-xxxx-{bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number goes here)</span>
                                </div>

                                <p className="type--color--note type--wgt--bold u-mar--bottom--med">Timeline: Funds will be made available to your account as soon as they are received!</p>

                                <div className="u-separator--primary u-mar--bottom--med"></div>

                                <div className="u-display--flex">
                                    <BaasicButton className="btn btn--100 btn--primary" onClick={() => { navigator.clipboard.writeText(clipboardText) }} label="Copy to clipboard"></BaasicButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <BaasicButton className="btn btn--100 btn--primary" onClick={downloadTxtFile} label="Download"></BaasicButton>
                                </div>
                            </div>
                        </div> : null
                }
                {
                    paymentType.abrv === 'stock-and-securities' ?
                        <div>
                            {/* <a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(
                        )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="btn btn--link btn--med" onClick={downloadStockTxtFile}>Download</a> */}
                            <h3 className="type--color--note u-mar--bottom--sml">Please provide your brokerage firm or financial advisor with the following information so they can initiate the transfer.</h3>
                            <div className="card--primary card--med u-mar--bottom--med" id="clipboard-info">
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Beneficiary</span>
                                    <span className="type--base type--wgt--bold u-push">Donors’ Fund Inc</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Address</span>
                                    <span className="type--base type--wgt--bold u-push">328 3rd St Lakewood NJ 08701</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">EIN (tax ID)</span>
                                    <span className="type--base type--wgt--bold u-push">47-4844275</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">Brokerage Firm</span>
                                    <span className="type--base type--wgt--bold u-push">Fidelity Investment</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--sml">
                                    <span className="type--base type--wgt--medium type--color--opaque">DTC</span>
                                    <span className="type--base type--wgt--bold u-push">0226</span>
                                </div>
                                <div className="card--tny card--secondary u-mar--bottom--med">
                                    <span className="type--base type--wgt--medium type--color--opaque">Brokerage Number</span>
                                    <span className="type--base type--wgt--bold u-push">Z50762458</span>
                                </div>

                                <p className="type--color--note type--wgt--bold u-mar--bottom--med">What happens next? Once we receive the security transfer we will initiate a selling order and then fund your account with the full selling price.</p>
                                <div className="u-separator--primary u-mar--bottom--med"></div>

                                <div className="u-display--flex">
                                    <BaasicButton className="btn btn--100 btn--primary" onClick={() => {
                                        navigator.clipboard.writeText(`
                                    Beneficiary – Donors’ Fund Inc\n
                                    Address - 328 3rd St Lakewood NJ 08701\n
                                    EIN (tax ID) – 47-4844275\n
                                    Brokerage Firm – Fidelity Investment\n
                                    DTC – 0226\n
                                    Brokerage Number - Z50762458`)
                                    }} label="Copy to clipboard"></BaasicButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <BaasicButton className="btn btn--100 btn--primary" onClick={downloadStockTxtFile} label="Download"></BaasicButton>
                                </div>
                            </div>
                        </div> : null
                }

                {/* {
                    paymentType.abrv === 'zelle' ? <div><a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(`
                    Our Zelle email address - QP@TheDonorsFund.org\n
                    Zelle Memo: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                    Amount: $${form.$('amount').value.toFixed(2)}`
                    )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="btn btn--link btn--med" onClick={downloadZelleTxtFile}>Download</a></div> : null

                } */}

                {paymentType.abrv === 'zelle' ?
                    <div>
                        <h3 className="type--color--note u-mar--bottom--sml">Please use the below email address to initiate your Zelle or QuickPay payment.</h3>
                        <div className="card--primary card--med u-mar--bottom--med" id="clipboard-info">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Our Zelle email address</span>
                                <span className="type--base type--wgt--bold u-push">QP@TheDonorsFund.org</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Zelle Memo</span>
                                <span className="type--base type--wgt--bold u-push">xxxx-xxxx-xxxx-{bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--med">
                                <span className="type--base type--wgt--medium type--color--opaque">Amount</span>
                                <span className="type--base type--wgt--bold u-push">
                                    <FormatterResolver
                                        item={{ amount: form.$('amount').value }}
                                        field="amount"
                                        format={{ type: 'currency' }}
                                    /></span>
                            </div>

                            <div className="u-display--flex">
                                <BaasicButton className="btn btn--100 btn--primary" onClick={() => {
                                    navigator.clipboard.clipboard.writeText(`
                            Our Zelle email address - QP@TheDonorsFund.org\n
                            Zelle Memo: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                            Amount: $${form.$('amount').value.toFixed(2)}`
                                    )
                                }} label="Copy to clipboard"></BaasicButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                <BaasicButton className="btn btn--100 btn--primary" onClick={downloadZelleTxtFile} label="Download"></BaasicButton></div>
                        </div>
                    </div> : null
                }
                {/* {
                    paymentType.abrv === 'third-party-donor-advised-funds' ? <div><a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(`
                    Charity name: The Donors Fund\n
                    EIN (tax ID): 47-4844275\n
                    328 3rd Street, Lakewood NJ 08701\n
                    Memo for purpose of grant: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                    Amount: $${form.$('amount').value.toFixed(2)}`
                    )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="btn btn--link btn--med" onClick={downloadThirdPartyTxtFile}>Download</a></div> : null

                } */}

                {paymentType.abrv === 'third-party-donor-advised-funds' ?
                    <div>
                        <h3 className="type--color--note u-mar--bottom--sml">Please use the following information to initiate a grant from your donor-advised fund</h3>
                        <div className="card--primary card--med u-mar--bottom--med">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Charity name</span>
                                <span className="type--base type--wgt--bold u-push">The Donors Fund</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">EIN (tax ID)</span>
                                <span className="type--base type--wgt--bold u-push">47-4844275</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Address</span>
                                <span className="type--base type--wgt--bold u-push">328 3rd Street, Lakewood NJ 08701</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--med">
                                <span className="type--base type--wgt--medium type--color--opaque">Memo for purpose of grant</span>
                                <span className="type--base type--wgt--bold u-push">xxxx-xxxx-xxxx-{bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)</span>
                            </div>
                            <div className="u-display--flex">
                                <BaasicButton className="btn btn--100 btn--primary" onClick={() => {
                                    navigator.clipboard.writeText(`
                    Charity name: The Donors Fund\n
                    EIN (tax ID): 47-4844275\n
                    328 3rd Street, Lakewood NJ 08701\n
                    Memo for purpose of grant: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                    Amount: $${form.$('amount').value.toFixed(2)}`
                                    )
                                }} label="Copy to clipboard"></BaasicButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                <BaasicButton className="btn btn--100 btn--primary" onClick={downloadThirdPartyTxtFile} label="Download"></BaasicButton></div>
                        </div>
                    </div> : null}
                {/* {
                    paymentType.abrv === 'check' ? <div><a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(`
                    Make checks payable to: The Donors Fund\n
                    Mail to: 328 3rd Street, Lakewood NJ 08701\n
                    Check Memo: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                    Amount: $${form.$('amount').value.toFixed(2)}`
                    )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="btn btn--link btn--med" onClick={downloadCheckTxtFile}>Download</a></div> : null

                } */}

                {paymentType.abrv === 'check' ?
                    <div>
                        <h3 className="type--color--note u-mar--bottom--sml">Please use the following information to send us the check</h3>
                        <div className="card--primary card--med u-mar--bottom--med">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Make checks payable to</span>
                                <span className="type--base type--wgt--bold u-push">The Donors Fund</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Mail to</span>
                                <span className="type--base type--wgt--bold u-push">328 3rd Street, Lakewood NJ 08701</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--med">
                                <span className="type--base type--wgt--medium type--color--opaque">Check Memo</span>
                                <span className="type--base type--wgt--bold u-push">xxxx-xxxx-xxxx-{bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)</span>
                            </div>

                            <div className="u-display--flex">
                                <BaasicButton className="btn btn--100 btn--primary" onClick={() => {
                                    navigator.clipboard.writeText(`
                                Make checks payable to: The Donors Fund\n
                                Mail to: 328 3rd Street, Lakewood NJ 08701\n
                                Check Memo: xxxx-xxxx-xxxx-${bankAccount ? bankAccount.accountNumber : 'xxxx'} (your full account number)\n
                                Amount: $${form.$('amount').value.toFixed(2)}`
                                    )
                                }} label="Copy to clipboard"></BaasicButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                <BaasicButton className="btn btn--100 btn--primary" onClick={downloadCheckTxtFile} label="Download"></BaasicButton></div>
                        </div>
                    </div> : null}
                {/* {
                    paymentType.abrv === 'paycheck-direct' ? <div><a className="btn btn--link btn--med" onClick={() => {navigator.clipboard.writeText(`
                    Beneficiary: The Donors Fund
                    328 3rd Street, Lakewood NJ 08701

                    Beneficiary bank:
                    JP Morgan Chase
                    ABA (routing number): 021000021
                    Account number: 883220399

                    Amount: $${form.$('amount').value.toFixed(2)}`
                    )}}>Copy to clipboard</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="btn btn--link btn--med" onClick={downloadPayrollDirectTxtFile}>Download</a></div> : null

                } */}

                {paymentType.abrv === 'paycheck-direct' ?
                    <div>
                        <h3 className="type--color--note u-mar--bottom--sml">Please provide your employer or payroll company with the following information</h3>
                        <div className="card--primary card--med u-mar--bottom--med">
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Beneficiary</span>
                                <span className="type--base type--wgt--bold u-push">The Donors Fund</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Address</span>
                                <span className="type--base type--wgt--bold u-push">328 3rd Street, Lakewood NJ 08701</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">Beneficiary bank</span>
                                <span className="type--base type--wgt--bold u-push">JP Morgan Chase</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--sml">
                                <span className="type--base type--wgt--medium type--color--opaque">ABA (routing number)</span>
                                <span className="type--base type--wgt--bold u-push">021000021</span>
                            </div>
                            <div className="card--tny card--secondary u-mar--bottom--med">
                                <span className="type--base type--wgt--medium type--color--opaque">Account number</span>
                                <span className="type--base type--wgt--bold u-push">883220399</span>
                            </div>

                            <div className="u-display--flex">
                                <BaasicButton className="btn btn--100 btn--primary" onClick={() => {
                                    navigator.clipboard.writeText(`
                    Beneficiary: The Donors Fund
                    328 3rd Street, Lakewood NJ 08701

                    Beneficiary bank:
                    JP Morgan Chase
                    ABA (routing number): 021000021
                    Account number: 883220399

                    Amount: $${form.$('amount').value.toFixed(2)}`
                                    )
                                }} label="Copy to clipboard"></BaasicButton>&nbsp;&nbsp;&nbsp;&nbsp;
                                <BaasicButton className="btn btn--100 btn--primary" onClick={downloadPayrollDirectTxtFile} label="Download"></BaasicButton></div>
                        </div>
                    </div> : null}

                {
                    paymentType.abrv !== 'wire-transfer' && paymentType.abrv !== 'stock-and-securities' ?
                        <div className="type--color--note u-mar--bottom--sml">
                            <b>Timeline: Funds will be made available within 3 - 5 business days.</b> </div> : null
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
        </div >
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
    downloadTxtFile: PropTypes.func,
    downloadStockTxtFile: PropTypes.func,
    downloadThirdPartyTxtFile: PropTypes.func,
    downloadCheckTxtFile: PropTypes.func,
    downloadPayrollDirectTxtFile: PropTypes.func
};

export default defaultTemplate(ContributionCreateStep3Template);
