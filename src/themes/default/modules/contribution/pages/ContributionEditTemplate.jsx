import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BaasicModal } from 'core/components';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { BankAccountCreate } from 'modules/bank-account/pages';
import _ from 'lodash';

function ContributionEditTemplate({ contributionEditViewStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    showBankAccounts,
    donorAccount,
    permissions,
    addBankAccountModalParams,
    onAddBankAccount,
    showPayerInformation,
    onChangeShowPayerInformation,
    paymentTypes,
    isPayerInformationValid
  } = contributionEditViewStore;

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
        {permissions.employeeCreate ? <PageContentHeader>{donorDetails(donorAccount)}</PageContentHeader> : null}
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            <div className="inputgroup">
              <label>Payment Type</label>
              {paymentTypeDropdownStore && <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />}
            </div>
          </div>
          {showBankAccounts && <div className="form__group f-col f-col-lrg-6">
            <div className="inputgroup">
              <label>Bank Account <button className="btn btn--xsml btn--tertiary" onClick={() => addBankAccountModalParams.open()}>Add new</button> </label>
              {bankAccountDropdownStore && <BaasicFieldDropdown key={JSON.stringify(bankAccountDropdownStore)} field={form.$('bankAccountId')} store={bankAccountDropdownStore} />}
            </div>
          </div>}
        </div>
        {form.$('paymentTypeId').value && (form.$('paymentTypeId').value !== _.find(paymentTypes, { abrv: 'ach' }).id || form.$('paymentTypeId').value === _.find(paymentTypes, { abrv: 'wire-transfer' }).id && form.$('bankAccountId').value) &&
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
              <h5>Payer Information</h5>
              <div className="display--b pull">Show payer informations</div>
              <div className="display--b pull spc--left--sml">
                <input type="checkbox" onChange={onChangeShowPayerInformation} value={showPayerInformation} />
                {!showPayerInformation && !isPayerInformationValid && <span className="type--tiny type--color--error">Check this</span>}
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
              </React.Fragment>
            }
          </div>
        }
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

ContributionEditTemplate.propTypes = {
  contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
