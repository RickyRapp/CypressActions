import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function ContributionConfirmTemplate({ modalParams, t }) {
    const {
        form,
        onCancel,
        paymentType,
        bankAccount,
        brokerageInstitution,
        securityType,
        securitySymbol,
        numberOfShares,
        thirdPartyDonorAdvisedFund,
        checkNumber,
        businessType,
        propertyType,
        collectableType,
        thirdPartyDonorAdvisedFundName,
        nameOfEmployment,
        payrollCompany
    } = modalParams.data;

    return (
        <div className="modal__list__wrap">

            <h3 className="u-mar--bottom--med">{t('CONTRIBUTION.CONFIRM.TITLE')}</h3>
            <section className="modal__list u-mar--bottom--med">
                <div>{t('CONTRIBUTION.CONFIRM.PAYMENT_TYPE')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">{paymentType.name}</div>
            </section>

            {nameOfEmployment &&
                <React.Fragment>
                    <section className="modal__list u-mar--bottom--med">
                        <div>Name of Employment</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{nameOfEmployment}</div>
                    </section>
                </React.Fragment>
            }
            {payrollCompany &&
                <React.Fragment>
                    <section className="modal__list u-mar--bottom--med">
                        <div>Payroll Company</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{payrollCompany}</div>
                    </section>
                </React.Fragment>
            }
            {bankAccount &&
                <React.Fragment>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('CONTRIBUTION.CONFIRM.BANK_ACCOUNT')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{bankAccount.name}</div>
                    </section>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('CONTRIBUTION.CONFIRM.BANK_ACCOUNT_NUMBER')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{bankAccount? bankAccount.accountNumber : 'xxxx-xxxx-xxxx-xxxx'}</div>
                    </section>

                </React.Fragment>}
            {securitySymbol &&
                <React.Fragment>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('CONTRIBUTION.CONFIRM.BROKERAGE_INSTITUTION')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{brokerageInstitution}</div>
                    </section>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('CONTRIBUTION.CONFIRM.SECURITY_TYPE')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{securityType}</div>
                    </section>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('CONTRIBUTION.CONFIRM.SECURITY_SYMBOL')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{securitySymbol}</div>
                    </section>
                    <section className="modal__list u-mar--bottom--med">
                        <div>{t('CONTRIBUTION.CONFIRM.NUMBER_OF_SHARES')}</div>
                        <div className="modal__list__divider"></div>
                        <div className="modal__list__amount">{numberOfShares}</div>
                    </section>
                </React.Fragment>}
            {thirdPartyDonorAdvisedFund &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('CONTRIBUTION.CONFIRM.THIRD_PARTY_DONOR_ADVISED_FUND')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{thirdPartyDonorAdvisedFund}</div>
                </section>}
            {thirdPartyDonorAdvisedFundName &&
                <section className="modal__list u-mar--bottom--med">
                    <div>Fund Holder Name</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{thirdPartyDonorAdvisedFundName}</div>
                </section>
            }
            {checkNumber &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('CONTRIBUTION.CONFIRM.CHECK_NUMBER')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{checkNumber}</div>
                </section>
            }
            {businessType &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('CONTRIBUTION.CONFIRM.BUSINESS_TYPE')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{businessType}</div>
                </section>
            }
            {propertyType &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('CONTRIBUTION.CONFIRM.PROPERTY_TYPE')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{propertyType}</div>
                </section>
            }
            {collectableType &&
                <section className="modal__list u-mar--bottom--med">
                    <div>{t('CONTRIBUTION.CONFIRM.COLLECTABLE_TYPE')}</div>
                    <div className="modal__list__divider"></div>
                    <div className="modal__list__amount">{collectableType}</div>
                </section>
            }
            <section className="modal__list u-mar--bottom--med">
                <div>{t('CONTRIBUTION.CONFIRM.AMOUNT')}</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">
                    <FormatterResolver
                        item={{ amount: form.$('amount').value }}
                        field='amount'
                        format={{ type: 'currency' }}
                    />
                </div>
            </section>
            <div className="row">
                <div className="col col-sml-12 col-lrg-6 u-order--2">
                    <BaasicButton
                        className="btn btn--med btn--med--100 btn--ghost u-mar--bottom--sml u-mar--top--sml"
                        classNameExtend="u-display--flex--justify--center"
                        label={t('EDIT_FORM_LAYOUT.CANCEL')}
                        onClick={onCancel}
                    />
                </div>
                <div className="col col-sml-12 col-lrg-6">
                    <div className="u-mar--left--auto">
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} className="btn btn--100 btn--secondary u-mar--top--sml" label={'CONTRIBUTION.CREATE.COMPLETE_DEPOSIT'} classNameExtend="u-display--flex--justify--center" />
                    </div>
                </div>
            </div>
        </div>
    );
}

ContributionConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionConfirmTemplate);