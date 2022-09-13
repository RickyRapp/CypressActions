import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicDropdown, BaasicFieldDropdown, BaasicModal, BasicFieldCheckbox, BasicInput, EditFormContent, FormatterResolver, NumericInputField, SimpleBaasicTable } from 'core/components';
import { ContributionConfirmTemplate } from 'themes/application/administration/contribution/components';

const ContributionCreateStep2Template = function ({ paymentTypes, paymentType, step, form, bankAccountDropdownStore,
    onSelectPaymentType, t, thirdPartyDonorAdvisedFundDropdownStore, securityTypeDropdownStore, brokerageInstitutionDropdownStore,
    collectibleTypeDropdownStore, propertyTypeDropdownStore, onAddBankAccountClick, businessTypeDropdownStore, onSubmitClick, confirmModal, routes,
    previousContributionsTableStore, isThirdPartyFundingAvailable, onShowBankAccountNumberClick, selectedType, paymentTypeDropdownStore }) {

    const AddButton = () => (
        <BaasicButton
            className="btn btn--tny btn--primary u-mar--bottom--tny"
            label="CONTRIBUTION.CREATE.ADD_BANK_ACCOUNT"
            onClick={onAddBankAccountClick}
        ></BaasicButton>
    );
    return (
        <div>
            < div className="container--sidebar" >
                <div className="u-mar--bottom--med">
                    {window.innerWidth > 767 &&
                        <div>
                            <h5 className="type--med type--wgt--medium u-mar--bottom--sml">Choose your deposit</h5>
                            <div className={`c-deposit__list c-deposit__list--${paymentTypes.length > 10 ? "6" : "5"}`}>
                                {paymentTypes.map((c) => {
                                    return (
                                        <div
                                            key={c.id}
                                            onClick={() => c.id !== form.$('paymentTypeId').value && onSelectPaymentType(c.id)}
                                            className={`c-deposit__card ${c.id === form.$('paymentTypeId').value && 'active'}`}
                                        >
                                            <div className="flex--grow--1">
                                                <i className={`u-icon u-icon--med u-icon--${c.abrv} ${c.id === form.$('paymentTypeId').value ? 'active' : ''}`}></i>
                                            </div>
                                            <div className="flex--grow--2">
                                                <h5
                                                    className={
                                                        c.id !== form.$('paymentTypeId').value
                                                            ? 'type--base type--wgt--medium'
                                                            : 'type--base type--wgt--medium type--color--negative'
                                                    }
                                                >
                                                    {c.name}
                                                </h5>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    }

                    <EditFormContent form={form}>
                        {window.innerWidth <= 767 &&
                            <div className="card--primary card--med u-mar--bottom--med">
                                <h5 className="type--med type--wgt--medium u-mar--bottom--sml">Step 1 {paymentType.abrv === 'wire-transfer' ? ' - Sending us a wire' : (paymentType.abrv === 'stock-and-securities' ? ' - Sending us securities' : (paymentType.abrv === 'zelle' ? ' - Sending us a Zelle or Quickpay Payment' : (paymentType.abrv === 'third-party-donor-advised-funds' ? ' - Sending us a payment from a Third Party Donor Advised Fund' : (paymentType.abrv === 'check' ? ' - Sending us check payment' : (paymentType.abrv === 'paycheck-direct' ? ' - What is this?' : null)))))}</h5>
                                {paymentType.abrv === 'paycheck-direct' ? <div><div style={{ color: '#C36C36' }}>Payroll Direct is a tool to allocate a portion of your payroll directly to your charitable giving account</div><br /></div> : null}
                                <div className='form__group__label'>Payment type</div>
                                <BaasicDropdown store={paymentTypeDropdownStore} />
                            </div>
                        }
                        <h5 className="type--med type--wgt--medium u-mar--bottom--sml">
                            {paymentType && paymentType.abrv === 'ach' ? 'How much would you like us to pull' : 'Tell us how much you will be sending'}
                        </h5>
                        <div className="card--primary card--med">
                            <div className="row row--form fullheight">
                                {(paymentType.abrv === 'ach' || paymentType.abrv === 'wire-transfer') && (
                                    <React.Fragment>
                                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med u-mar--top--sml">
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
                                {paymentType.abrv === 'third-party-donor-advised-funds' && (
                                    <React.Fragment>
                                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <div className="u-mar--bottom--med">
                                                <BaasicFieldDropdown
                                                    field={form.$('thirdPartyDonorAdvisedFundId')}
                                                    store={thirdPartyDonorAdvisedFundDropdownStore}
                                                />
                                            </div>
                                            <BasicInput field={form.$('thirdPartyDonorAdvisedFundName')} />
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
                                {paymentType.abrv === 'paycheck-direct' && (
                                    <React.Fragment>
                                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <div className="u-mar--bottom--med">
                                                <BasicInput field={form.$('nameOfEmployment')} />
                                            </div>
                                            <BasicInput field={form.$('payrollCompany')} />
                                        </div>
                                    </React.Fragment>
                                )}
                                {paymentType.abrv === 'business-and-private-interests' && (
                                    <React.Fragment>
                                        {/* <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                            <BaasicFieldDropdown field={form.$('businessTypeId')} store={businessTypeDropdownStore} />
                                        </div> */}
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
                                        {propertyTypeDropdownStore &&
                                            propertyTypeDropdownStore.value &&
                                            propertyTypeDropdownStore.value.name === 'Other' &&
                                            <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
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
                                            </div>}
                                    </React.Fragment>
                                )}
                                {paymentType.abrv === 'check' && (
                                    <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                                        <BasicInput field={form.$('checkNumber')} />
                                    </div>
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
                <div>
                    <h5 className="type--med type--wgt--medium u-mar--bottom--sml">
                        Information
                    </h5>
                    <div className="card--primary card--med">
                        {selectedType ?
                            <div>
                                <div className="modal__list u-mar--bottom--med">
                                    <div><i className="u-icon u-icon--med u-icon--clock"></i></div>
                                    <div className="modal__list__label">
                                        {selectedType ? (selectedType.timeline ? <span> {selectedType.timeline}</span> : null) : 'No information to show'}
                                    </div>
                                </div>
                                <div className="modal__list u-mar--bottom--med">
                                    <div><i className="u-icon u-icon--med u-icon--give--dark"></i></div>
                                    <p className="u-display--flex">
                                        Min. deposit:
                                        <div className="modal__list__label u-mar--left--tny">
                                            {selectedType ? <FormatterResolver item={{ amount: selectedType.minimumDeposit }} field='amount' format={{ type: 'currency' }} /> : 'No information to show'}
                                        </div>
                                    </p>
                                </div>
                                <div className="modal__list">
                                    <div><i className="u-icon u-icon--med u-icon--info-regular"></i></div>
                                    <div className="modal__list__label">{selectedType ? (selectedType.more ? <span> {selectedType.more}</span> : "-") : 'No information to show'}</div>
                                </div>
                            </div> :
                            <div className="modal__list">
                                <div><i className="u-icon u-icon--med u-icon--details"></i></div>
                                <div className="modal__list__label"><span>No information to show</span></div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

ContributionCreateStep2Template.propTypes = {
    paymentTypes: PropTypes.any,
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
    onSelectPaymentTypeFromDropdown: PropTypes.func,
    paymentTypeDropdownStore: PropTypes.any,
    selectedType: PropTypes.object
};

export default defaultTemplate(ContributionCreateStep2Template);
