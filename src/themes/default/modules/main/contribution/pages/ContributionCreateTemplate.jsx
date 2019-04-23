import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BaasicModal } from 'core/components';
import { EditFormLayout } from 'core/layouts';
import { BankAccountCreate } from 'modules/common/bank-account/pages';
import { ContributionSettingCreateFormFieldsTemplate } from 'themes/modules/administration/contribution-setting/components';
import _ from 'lodash';

function ContributionCreateTemplate({ contributionCreateViewStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    addBankAccountModalParams,
    onAddBankAccount,
    showPayerInformation,
    onChangeShowPayerInformation,
    showStockAndMutualFundsContactInfo,
    onChangeShowStockAndMutualFundsContactInfo,
    isPayerInformationValid,
    chaseQuickPayId,
    achId,
    wireTransferId,
    stockAndMutualFundsId,
    checkId,
    bankAccountSettingDropdownStore,
    contributionSettingTypeDropdownStore,
    onChangeMakeAsRecurringPayment,
    makeAsRecurringPayment,
    userId,
    usedSettingTypeIds,
    contributionSettingType
  } = contributionCreateViewStore;

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5
      }}
    />
  );

  const labelBankAccount =
    <label>Bank Account <a className="btn btn--xsml btn--tertiary" onClick={() => addBankAccountModalParams.open()}>Add new</a> </label>

  return (
    <React.Fragment>
      <EditFormLayout form={form} isEdit={true} loading={loading}>
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            {paymentTypeDropdownStore &&
              <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />}
          </div>
        </div>

        {paymentTypeDropdownStore && paymentTypeDropdownStore.value && (paymentTypeDropdownStore.value.id === achId || paymentTypeDropdownStore.value.id === wireTransferId) &&
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              {bankAccountDropdownStore &&
                <BaasicFieldDropdown field={form.$('bankAccountId')} store={bankAccountDropdownStore} label={labelBankAccount} />}
            </div>
          </div>}

        {paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === checkId &&
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('checkNumber')} />
            </div>
          </div>}

        {paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === stockAndMutualFundsId &&
          <React.Fragment>
            <div className="f-row">
              <div className="form__group f-col f-col-lrg-12">
                <BasicInput field={form.$('financialInstitution')} />
              </div>
            </div>
            <div className="f-row">
              {showStockAndMutualFundsContactInfo &&
                <React.Fragment>
                  <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('financialInstitutionAddressLine1')} />
                  </div>
                  <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('financialInstitutionAddressLine2')} />
                  </div>
                  <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={form.$('financialInstitutionCity')} />
                  </div>
                  <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={form.$('financialInstitutionState')} />
                  </div>
                  <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={form.$('financialInstitutionZipCode')} />
                  </div>
                  <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={form.$('financialInstitutionPhoneNumber')} />
                  </div>
                </React.Fragment>}
              <div className="form__group f-col f-col-lrg-6">
                <div className="display--b pull">{showStockAndMutualFundsContactInfo ? 'Hide' : 'Show'} institution contact informations</div>
                <div className="display--b pull spc--left--sml">
                  <input type="checkbox" onChange={onChangeShowStockAndMutualFundsContactInfo} value={showStockAndMutualFundsContactInfo} />
                </div>
              </div>
            </div>
            <div className="f-row">
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('accountNumber')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('securityType')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('securitySymbol')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('numberOfShares')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('estimatedValue')} />
              </div>
            </div>
          </React.Fragment>}
        {paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === chaseQuickPayId &&
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('transactionId')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('memo')} />
            </div>
          </div>}
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-12">
            <h5>Payer Information</h5>
            <div className="display--b pull">Show payer informations</div>
            <div className="display--b pull spc--left--sml">
              <input type="checkbox" onChange={onChangeShowPayerInformation} value={showPayerInformation} />
              {!showPayerInformation && !isPayerInformationValid && form.$('paymentTypeId').value === wireTransferId &&
                <span className="type--tiny type--color--error">Check this</span>}
            </div>
          </div>
          {showPayerInformation &&
            <React.Fragment>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('payerInformation.firstName')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('payerInformation.lastName')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('payerInformation.address.addressLine1')} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('payerInformation.address.addressLine2')} />
              </div>
              <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.address.city')} />
              </div>
              <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.address.state')} />
              </div>
              <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.address.zipCode')} />
              </div>
              <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.emailAddress.email')} />
              </div>
              <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={form.$('payerInformation.phoneNumber.number')} />
              </div>
              <div className="form__group f-col f-col-lrg-12">
                <ColoredLine color="red" />
              </div>
            </React.Fragment>}
        </div>
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            <BasicInput field={form.$('amount')} />
          </div>
          <div className="form__group f-col f-col-lrg-6">
            <BasicInput field={form.$('description')} />
          </div>
        </div>
        {bankAccountDropdownStore && paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === achId &&
          form.$('bankAccountId').value && form.$('amount').value &&
          <React.Fragment>
            <div className="f-row">
              <div className="form__group f-col f-col-lrg-12">
                <div className="display--b pull">Make As Recurring Payment</div>
                <div className="display--b pull spc--left--sml">
                  <input type="checkbox" onChange={onChangeMakeAsRecurringPayment} value={makeAsRecurringPayment} />
                </div>
              </div>
            </div>
            {makeAsRecurringPayment &&
              < div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                  <ContributionSettingCreateFormFieldsTemplate
                    enabledField={form.$('settingEnabled')}
                    amountField={form.$('settingAmount')}
                    bankAccountIdField={form.$('settingBankAccountId')}
                    contributionSettingTypeIdField={form.$('contributionSettingTypeId')}
                    lowBalanceAmountField={form.$('settingLowBalanceAmount')}
                    startDateField={form.$('settingStartDate')}
                    bankAccountDropdownStore={bankAccountSettingDropdownStore}
                    contributionSettingTypeDropdownStore={contributionSettingTypeDropdownStore} />
                </div>
                {usedSettingTypeIds && usedSettingTypeIds.length > 0 &&
                  <div className="form__group f-col f-col-lrg-6">
                    Created Setting Rules:
                {usedSettingTypeIds.map((settingTypeId, i) =>
                      <ul key={settingTypeId}>
                        <li>{_.find(contributionSettingType, { id: settingTypeId }).name}</li>
                      </ul>)}
                  </div>}
              </div>}
          </React.Fragment>}
      </EditFormLayout>
      <BaasicModal modalParams={addBankAccountModalParams} >
        <div className="col col-sml-12 card card--form card--primary card--lrg">
          <BankAccountCreate onAfterCreate={onAddBankAccount} userId={userId} />
        </div>
      </BaasicModal>
    </React.Fragment >
  );
};

ContributionCreateTemplate.propTypes = {
  contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionCreateTemplate);
