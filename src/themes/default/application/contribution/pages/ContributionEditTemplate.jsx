import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page } from 'core/layouts';
import { BaasicButton, BaasicFieldDropdown, BaasicFormControls, BaasicModal, BasicFieldCheckbox, BasicInput, EditFormContent, FormatterResolver, NumericInputField, SimpleBaasicTable } from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { BankAccountForm } from 'application/donor/components';
import { ContributionConfirmTemplate } from 'themes/application/contribution/components';

const ContributionEditTemplate = function ({ contributionEditViewStore, t }) {
    const {
        loaderStore,
        form,
        routes,
        paymentTypes,
        step,
        onSelectPaymentType,
        paymentTypeDropdownStore,
        bankAccountDropdownStore,
        bankAccountModal,
        onAddBankAccountClick,
        onSubmitClick,
        goBack,
        confirmModal,
        previousContributionsTableStore
    } = contributionEditViewStore;

    let paymentType = {};
    if (!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value)) {
        paymentType = paymentTypes.find(c => c.id === form.$('paymentTypeId').value)
    }

    const addButton = <BaasicButton
        className="btn btn--icon"
        icon='u-icon u-icon--unlocked u-icon--sml' //TODO replace with add icon
        label='CONTRIBUTION.CREATE.ADD_BANK_ACCOUNT_LABEL'
        onlyIcon={true}
        onClick={onAddBankAccountClick}>
    </BaasicButton>

    return (
        <Page loading={loaderStore.loading}>
            {step === 1 && paymentTypes && paymentTypes.map(c => {
                return (
                    <div key={c.id} className="row">
                        <div className="col col-sml-12 col-lrg-3">
                            <div className="card card--primary card--med u-mar--bottom--med">
                                <h5 className="type--med type--wgt--medium u-mar--bottom--med">{c.name}</h5>
                            </div>
                        </div>
                        {step === 1 &&
                            <React.Fragment>
                                <div className="col col-sml-12 col-lrg-2">
                                    <div className="card card--primary card--med u-mar--bottom--med">
                                        <p className="u-mar--bottom--med">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-lrg-2">
                                    <div className="card card--primary card--med u-mar--bottom--med">
                                        <p className="u-mar--bottom--med">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-lrg-2">
                                    <div className="card card--primary card--med u-mar--bottom--med">
                                        <p className="u-mar--bottom--med">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-lrg-2">
                                    <div className="card card--primary card--med u-mar--bottom--med">
                                        <p className="u-mar--bottom--med">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-lrg-1">
                                    <BaasicButton
                                        className="btn btn--base btn--primary"
                                        label={t('CONTRIBUTION.CREATE.LINK')}
                                        onClick={() => onSelectPaymentType(c.id)}
                                    />
                                </div>
                            </React.Fragment>}
                    </div>
                )
            })}

            {step === 2 && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) &&
                <div className="row">
                    <div className="col col-sml-12 col-lrg-3">
                        {paymentTypes.map(c => {
                            return (
                                <div key={c.id} className="row" onClick={() => c.id !== form.$('paymentTypeId').value && onSelectPaymentType(c.id)}>
                                    <div className="col col-sml-12 col-lrg-12">
                                        <div className="card card--primary card--med u-mar--bottom--med cursor--pointer">
                                            <div className="row u-display--flex u-display--flex--align--center">
                                                <div className="col col-sml-2">
                                                    <i className="u-icon u-icon--med u-icon--download u-push"></i>
                                                </div>
                                                <div className="col col-sml-10">
                                                    <h5 className="type--med type--wgt--medium">{c.name}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })
                        }
                    </div>
                    <div className="col col-sml-12 col-lrg-6">
                        <EditFormContent form={form}>
                            {!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) &&
                                <h5 className="type--lrg type--wgt--medium u-mar--bottom--med">
                                    {t(`CONTRIBUTION.CREATE.${paymentTypes.find(c => c.id === form.$('paymentTypeId').value).name.toUpperCase()}`)}
                                </h5>}
                            <div className="card card--primary card--med u-mar--bottom--med">
                                <div className="row">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <h5 className="type--med type--wgt--medium">{t('CONTRIBUTION.CREATE.FUND_YOUR_ACCOUNT')}</h5>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <p className="type--sml type--wgt--medium type--color--note">{t('CONTRIBUTION.CREATE.DONATE_SECURITIES')}</p>
                                    </div>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                                    </div>
                                    {(paymentType.abrv === 'ach' || paymentType.abrv === 'wire-transfer') &&
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown
                                                    field={form.$('donorBankAccountId')}
                                                    store={bankAccountDropdownStore}
                                                    additionalLabel={addButton}
                                                />
                                            </div>
                                            <BaasicModal modalParams={bankAccountModal}>
                                                <BankAccountForm />
                                            </BaasicModal>
                                        </React.Fragment>}
                                    {paymentType.abrv === 'check' &&
                                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <BasicInput field={form.$('checkNumber')} showLabel={false} />
                                        </div>}
                                    {paymentType.abrv === 'chase-quickpay' &&
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BasicInput field={form.$('transactionId')} showLabel={false} />
                                            </div>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BasicInput field={form.$('memo')} showLabel={false} />
                                            </div>
                                        </React.Fragment>}
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <NumericInputField field={form.$('amount')} showLabel={false} />
                                    </div>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <BasicFieldCheckbox field={form.$('isThirdParty')} />
                                    </div>
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <BasicFieldCheckbox field={form.$('isAgreeToPoliciesAndGuidelines')} />
                                    </div>
                                </div>
                                <BaasicFormControls form={form} onSubmit={onSubmitClick} type='button' />
                                <BaasicButton className="btn btn--sml btn--ghost" label="EDIT_FORM_LAYOUT.CANCEL" onClick={goBack} />
                            </div>
                            <BaasicModal modalParams={confirmModal}>
                                <ContributionConfirmTemplate form={form} />
                            </BaasicModal>
                        </EditFormContent>
                    </div>
                    <div className="col col-sml-12 col-lrg-3">
                        <div className="card card--primary card--med u-mar--bottom--med">
                            <h5 className="type--med type--wgt--medium">{t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}</h5>
                            <SimpleBaasicTable tableStore={previousContributionsTableStore} />
                            <BaasicButton
                                className="btn btn--base btn--tertiary type--uppercase u-mar--top--med"
                                label='CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS'
                                onClick={routes.allContributions}>
                            </BaasicButton>
                        </div>
                    </div>
                </div>}

            {step === 3 &&
                <div className="row">
                    <div className="col col-sml-12 col-lrg-9">
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--lrg">
                                <h3>{t('CONTRIBUTION.CREATE.SUCCESS')}</h3>
                            </div>
                        </div>
                        <div className="card card--primary card--med u-mar--bottom--med">
                            <div className="row">
                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                    <h4>{t('CONTRIBUTION.CREATE.SUMMARY')}</h4>
                                </div>
                                <div className="col col-sml-12 col-lrg-12">
                                    {t('CONTRIBUTION.CREATE.PAYMENT_TYPE')}
                                    {paymentTypes.find(c => c.id === form.$('paymentTypeId').value).name}
                                </div>
                                {(paymentType.abrv === 'ach' || paymentType.abrv === 'wire-transfer') &&
                                    <React.Fragment>
                                        <div className="col col-sml-12 col-lrg-12">
                                            {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NAME')}
                                            {bankAccountDropdownStore.items.find(c => c.id === form.$('donorBankAccountId').value).name}
                                        </div>
                                        <div className="col col-sml-12 col-lrg-12">
                                            {t('CONTRIBUTION.CREATE.BANK_ACCOUNT_NUMBER')}
                                            xxxx-xxxx-xxxx-{bankAccountDropdownStore.items.find(c => c.id === form.$('donorBankAccountId').value).accountNumber}
                                        </div>
                                    </React.Fragment>}
                                {paymentType.abrv === 'check' &&
                                    <div className="col col-sml-12 col-lrg-12">
                                        {t('CONTRIBUTION.CREATE.CHECK_NUMBER')}
                                        {form.$('checkNumber').value}
                                    </div>}

                                {paymentType.abrv === 'chase-quickpay' &&
                                    <React.Fragment>
                                        <div className="col col-sml-12 col-lrg-12">
                                            {t('CONTRIBUTION.CREATE.TRANSACTION_ID')}
                                            {form.$('tranasctionId').value}
                                        </div>
                                        <div className="col col-sml-12 col-lrg-12">
                                            {t('CONTRIBUTION.CREATE.MEMO')}
                                            {form.$('memo').value}
                                        </div>
                                    </React.Fragment>}
                                <div className="col col-sml-12 col-lrg-12">
                                    {t('CONTRIBUTION.CREATE.AMOUNT')}
                                    <FormatterResolver
                                        item={{ amount: form.$('amount').value }}
                                        field='amount'
                                        format={{ type: 'currency' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12 col-lrg-3">
                        <div className="card card--primary card--med u-mar--bottom--med">
                            <h5>{t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}</h5>
                            <SimpleBaasicTable tableStore={previousContributionsTableStore} />
                            <BaasicButton
                                className="btn btn--base btn--secondary u-mar--top--med"
                                label='CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS'
                                onClick={routes.allContributions}>
                            </BaasicButton>
                        </div>
                    </div>

                </div>}
        </Page>
    )
};

ContributionEditTemplate.propTypes = {
    contributionEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
};

export default defaultTemplate(ContributionEditTemplate);
