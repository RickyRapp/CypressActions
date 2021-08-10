import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicFieldDropdown, BaasicModal, BasicFieldCheckbox, BasicInput, EditFormContent, NumericInputField, SimpleBaasicTable } from 'core/components';
import { ContributionConfirmTemplate } from 'themes/application/administration/contribution/components';

const ContributionCreateStep2Template = function ({ paymentTypes, paymentType, step, form, bankAccountDropdownStore,
    onSelectPaymentType, t, nextStep, thirdPartyDonorAdvisedFundDropdownStore, securityTypeDropdownStore, brokerageInstitutionDropdownStore,
    collectibleTypeDropdownStore, propertyTypeDropdownStore, onAddBankAccountClick, businessTypeDropdownStore, onSubmitClick, confirmModal, routes,
    previousContributionsTableStore, isThirdPartyFundingAvailable, onShowBankAccountNumberClick }) {

    const AddButton = () => (
        <BaasicButton
            className="btn btn--tny btn--primary u-mar--bottom--tny"
            label="CONTRIBUTION.CREATE.ADD_BANK_ACCOUNT"
            onClick={onAddBankAccountClick}
        ></BaasicButton>
    );

    return (
        <div className="row">
            <div className="col col-sml-12">
                <div className="row row--form">
                    <div className="col col-sml-12 col-lrg-4 col-xlrg-3">
                        <BaasicButton
                            type="button"
                            className="btn btn--link btn--med card--contribution--back"
                            onClick={() => nextStep(step - 1)}
                            label={'Overview'}
                        />
                    </div>
                </div>
            </div>
            <div className="col col-sml-12 col-lrg-4 col-xxlrg-3">
                {paymentTypes.map((c) => {
                    return (
                        <div
                            key={c.id}
                            className="row"
                            onClick={() => c.id !== form.$('paymentTypeId').value && onSelectPaymentType(c.id)}
                        >
                            <div className="col col-sml-12 col-lrg-12">
                                <div
                                    className={`card--contribution card--contribution--primary card--contribution--standalone ${c.id ===
                                        form.$('paymentTypeId').value && 'checked'}`}
                                >
                                    <div className="flex--grow--1 u-mar--right--sml">
                                        <i
                                            className={`u-icon u-icon--med u-icon--${c.abrv} ${c.id === form.$('paymentTypeId').value &&
                                                'checked'}`}
                                        ></i>
                                    </div>
                                    <div className="flex--grow--2">
                                        <h5
                                            className={
                                                c.id !== form.$('paymentTypeId').value
                                                    ? 'type--base type--wgt--medium'
                                                    : 'type--base type--wgt--medium type--color--note'
                                            }
                                        >
                                            {c.name}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="col col-sml-12 col-lrg-8 col-xxlrg-9">
                <div className="row row--form">
                    <div className="col col-sml-12 col-xxlrg-7 u-mar--bottom--med">
                        <EditFormContent form={form}>
                            <div className="card--primary card--med fullheight">
                                <div className="row row--form fullheight">
                                    <div className="col col-sml-12 col-lrg-12">
                                        <p><b>Step 1</b></p>
                                        <h5 className="type--med type--wgt--medium">{paymentType.abrv === 'zelle' ? 'Sending us a Zelle or Quickpay Payment' : t('CONTRIBUTION.CREATE.FUND_YOUR_ACCOUNT')}</h5>
                                    </div>
                                    {paymentType.abrv === 'zelle' ? 
                                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                    <p className="type--color--note">Tell us how much you will be sending</p>
                                                    <br />
                                                </div> : null}

                                    {(paymentType.abrv === 'ach' || paymentType.abrv === 'wire-transfer') && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                {paymentType.abrv === 'wire-transfer' ? 
                                                <div>
                                                    <p className="type--color--note">Sending us a wire</p>
                                                    <br />
                                                </div> : null}
                                                <BaasicFieldDropdown
                                                    field={form.$('bankAccountId')}
                                                    store={bankAccountDropdownStore}
                                                    rightLabelComponent={AddButton}
                                                />
                                                {onShowBankAccountNumberClick && form.$('bankAccountId').value &&
                                                    <BaasicButton
                                                        type="button"
                                                        className="btn btn--icon"
                                                        icon='u-icon u-icon--preview u-icon--base'
                                                        onClick={() => onShowBankAccountNumberClick(form.$('bankAccountId').value)}
                                                        onlyIcon={true}
                                                    />}
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {paymentType.abrv === 'check' && (
                                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <BasicInput field={form.$('checkNumber')} />
                                        </div>
                                    )}
                                    {paymentType.abrv === 'third-party-donor-advised-funds' && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown
                                                    field={form.$('thirdPartyDonorAdvisedFundId')}
                                                    store={thirdPartyDonorAdvisedFundDropdownStore}
                                                />
                                            </div>
                                            {thirdPartyDonorAdvisedFundDropdownStore &&
                                                thirdPartyDonorAdvisedFundDropdownStore.value &&
                                                thirdPartyDonorAdvisedFundDropdownStore.value.name === 'Other' && (
                                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                        <BasicInput field={form.$('thirdPartyDonorAdvisedFundOther')} />
                                                    </div>
                                                )}
                                        </React.Fragment>
                                    )}
                                    {paymentType.abrv === 'stock-and-securities' && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown
                                                    field={form.$('brokerageInstitutionId')}
                                                    store={brokerageInstitutionDropdownStore}
                                                />
                                            </div>
                                            {brokerageInstitutionDropdownStore &&
                                                brokerageInstitutionDropdownStore.value &&
                                                brokerageInstitutionDropdownStore.value.name === 'Other' && (
                                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                        <BasicInput field={form.$('brokerageInstitutionOther')} />
                                                    </div>
                                                )}
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown field={form.$('securityTypeId')} store={securityTypeDropdownStore} />
                                            </div>
                                            {securityTypeDropdownStore &&
                                                securityTypeDropdownStore.value &&
                                                securityTypeDropdownStore.value.name === 'Other' && (
                                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                        <BasicInput field={form.$('securityTypeOther')} />
                                                    </div>
                                                )}
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BasicInput field={form.$('securitySymbol')} />
                                            </div>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <NumericInputField field={form.$('numberOfShares')} />
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {paymentType.abrv === 'business-and-private-interests' && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown field={form.$('businessTypeId')} store={businessTypeDropdownStore} />
                                            </div>
                                            {businessTypeDropdownStore &&
                                                businessTypeDropdownStore.value &&
                                                businessTypeDropdownStore.value.name === 'Other' &&
                                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                    <BasicInput field={form.$('businessTypeOther')} />
                                                </div>}
                                        </React.Fragment>
                                    )}
                                    {paymentType.abrv === 'real-estate' && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown field={form.$('propertyTypeId')} store={propertyTypeDropdownStore} />
                                            </div>
                                            {propertyTypeDropdownStore &&
                                                propertyTypeDropdownStore.value &&
                                                propertyTypeDropdownStore.value.name === 'Other' &&
                                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                    <BasicInput field={form.$('propertyTypeOther')} />
                                                </div>}
                                        </React.Fragment>
                                    )}
                                    {paymentType.abrv === 'collectible-assets' && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BaasicFieldDropdown
                                                    field={form.$('collectibleTypeId')}
                                                    store={collectibleTypeDropdownStore}
                                                />
                                            </div>
                                            {collectibleTypeDropdownStore &&
                                                collectibleTypeDropdownStore.value &&
                                                collectibleTypeDropdownStore.value.name === 'Other' && (
                                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                        <BasicInput field={form.$('collectibleTypeOther')} />
                                                    </div>
                                                )}
                                        </React.Fragment>
                                    )}
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                    {isThirdPartyFundingAvailable && (
                                        <React.Fragment>
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                <BasicFieldCheckbox field={form.$('isThirdParty')} />
                                            </div>
                                            {form.$('isThirdParty').value && (
                                                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                                    <div className="row row--form">
                                                        <div className="form__group col col-sml-12 col-lrg-12">
                                                            <BasicInput field={form.$('name')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-6">
                                                            <BasicInput field={form.$('addressLine1')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-6">
                                                            <BasicInput field={form.$('addressLine2')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-4">
                                                            <BasicInput field={form.$('city')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-4">
                                                            <BasicInput field={form.$('state')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-4">
                                                            <BasicInput field={form.$('zipCode')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-6">
                                                            <BasicInput field={form.$('email')} />
                                                        </div>
                                                        <div className="form__group col col-sml-12 col-lrg-6">
                                                            <BasicInput field={form.$('number')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )}
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <BasicFieldCheckbox field={form.$('isAgreeToPoliciesAndGuidelines')} />
                                    </div>
                                    <div className="col col-sml-12 u-display--flex u-display--flex--end">
                                        <BaasicButton
                                            type="button"
                                            className="btn btn--med btn--med--wide btn--secondary u-push"
                                            onClick={onSubmitClick}
                                            icon={form.validating ? 'synchronize-arrows-1 rotate' : ''}
                                            label={'CONTRIBUTION.CREATE.CONTINUE'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <BaasicModal modalParams={confirmModal}>
                                <ContributionConfirmTemplate form={form} />
                            </BaasicModal>
                        </EditFormContent>
                    </div>
                    <div className="col col-sml-12 col-xxlrg-5 u-mar--bottom--med">
                        <div className="card--primary card--med fullheight">
                            <div className="u-display--flex u-display--flex--column u-display--flex--justify--space-between fullheight">
                                <div>
                                    <h5 className="type--med type--wgt--medium u-mar--bottom--sml">
                                        {t('CONTRIBUTION.CREATE.PREVIOUS_CONTRIBUTIONS')}
                                    </h5>
                                    <SimpleBaasicTable tableStore={previousContributionsTableStore} />
                                </div>

                                <BaasicButton
                                    className="btn btn--100 btn--primary u-mar--top--med"
                                    label="CONTRIBUTION.CREATE.ALL_CONTRIBUTIONS"
                                    onClick={routes.allContributions}
                                ></BaasicButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ContributionCreateStep2Template.propTypes = {
    paymentTypes: PropTypes.array,
    paymentType: PropTypes.object,
    step: PropTypes.any,
    form: PropTypes.object,
    bankAccountDropdownStore: PropTypes.any,
    onSelectPaymentType: PropTypes.func,
    t: PropTypes.func,
    nextStep: PropTypes.any,
    thirdPartyDonorAdvisedFundDropdownStore: PropTypes.any,
    securityTypeDropdownStore: PropTypes.any,
    brokerageInstitutionDropdownStore: PropTypes.any,
    collectibleTypeDropdownStore: PropTypes.any,
    propertyTypeDropdownStore: PropTypes.any,
    onAddBankAccountClick: PropTypes.func,
    businessTypeDropdownStore: PropTypes.any,
    onSubmitClick: PropTypes.func,
    confirmModal: PropTypes.any,
    routes: PropTypes.any,
    previousContributionsTableStore: PropTypes.any,
    isThirdPartyFundingAvailable: PropTypes.bool,
    onShowBankAccountNumberClick: PropTypes.func,
};

export default defaultTemplate(ContributionCreateStep2Template);
