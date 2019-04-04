import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BaasicModal } from 'core/components';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { BankAccountCreate } from 'modules/bank-account/pages';
import { renderIf, isSome } from 'core/utils';
import _ from 'lodash';

function ContributionCreateTemplate({ contributionCreateViewStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    donorAccount,
    permissions,
    addBankAccountModalParams,
    onAddBankAccount,
    showPayerInformation,
    onChangeShowPayerInformation,
    showStockAndMutualFundsContactInfo,
    onChangeShowStockAndMutualFundsContactInfo,
    paymentTypes,
    isPayerInformationValid,
    chaseQuickPayId,
    achId,
    wireTransferId,
    stockAndMutualFundsId,
    checkId
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

  return (
    <React.Fragment>
      <EditFormLayout form={form} isEdit={true} loading={loading}>
        {renderIf(permissions.employeeCreate)(
          <PageContentHeader>{donorDetails(donorAccount)}</PageContentHeader>)}
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            <div className="inputgroup">
              <label>Payment Type</label>
              {renderIf(paymentTypeDropdownStore)(
                <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />)}
            </div>
          </div>
        </div>

        {renderIf(paymentTypeDropdownStore && paymentTypeDropdownStore.value && (paymentTypeDropdownStore.value.id === achId || paymentTypeDropdownStore.value.id === wireTransferId))(
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              <div className="inputgroup">
                <label>Bank Account <a className="btn btn--xsml btn--tertiary" onClick={() => addBankAccountModalParams.open()}>Add new</a> </label>
                {renderIf(bankAccountDropdownStore)(
                  <BaasicFieldDropdown field={form.$('bankAccountId')} store={bankAccountDropdownStore} />)}
              </div>
            </div>
          </div>)}

        {renderIf(paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === checkId)(
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('checkNumber')} />
            </div>
          </div>)}

        {renderIf(paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === stockAndMutualFundsId)(
          <React.Fragment>
            <div className="f-row">
              <div className="form__group f-col f-col-lrg-12">
                <BasicInput field={form.$('financialInstitution')} />
              </div>
            </div>
            <div className="f-row">
              {renderIf(showStockAndMutualFundsContactInfo)(
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
                </React.Fragment>)}
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
          </React.Fragment>)}
        {renderIf(paymentTypeDropdownStore && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === chaseQuickPayId)(
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('transactionId')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('memo')} />
            </div>
          </div>)}
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-12">
            <h5>Payer Information</h5>
            <div className="display--b pull">Show payer informations</div>
            <div className="display--b pull spc--left--sml">
              <input type="checkbox" onChange={onChangeShowPayerInformation} value={showPayerInformation} />
              {renderIf(!showPayerInformation && !isPayerInformationValid && form.$('paymentTypeId').value === _.find(paymentTypes, { abrv: 'wire-transfer' }).id)
                (<span className="type--tiny type--color--error">Check this</span>)}
            </div>
          </div>
          {renderIf(showPayerInformation)(
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
            </React.Fragment>)}
        </div>
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            <BasicInput field={form.$('amount')} />
          </div>
          <div className="form__group f-col f-col-lrg-6">
            <BasicInput field={form.$('description')} />
          </div>
        </div>
      </EditFormLayout>
      <BaasicModal modalParams={addBankAccountModalParams} >
        <div className="col col-sml-12 card card--form card--primary card--lrg">
          <BankAccountCreate onAfterCreate={onAddBankAccount} />
        </div>
      </BaasicModal>
    </React.Fragment>
  );
};

function donorDetails(donorAccount) {
  return (
    <React.Fragment>
      {donorAccount ?
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-3">
            Donor Name: <strong>{donorAccount.coreUser.firstName} {donorAccount.coreUser.lastName}</strong>
          </div>
          <div className="form__group f-col f-col-lrg-3">
            Available Balance: <strong>${donorAccount.availableBalance}</strong>
          </div>
          <div className="form__group f-col f-col-lrg-3">
            Initial Contribution: <strong>{donorAccount.initialContribution ? `Yes - Minimum $${donorAccount.contributionMinimumAdditional}` : `No - Minimum $${donorAccount.contributionMinimumInitial}`}</strong>
          </div>
        </div> : null}
    </React.Fragment>
  );
}

ContributionCreateTemplate.propTypes = {
  contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionCreateTemplate);
