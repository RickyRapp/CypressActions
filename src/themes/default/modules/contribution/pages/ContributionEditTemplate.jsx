import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicDropdown } from 'core/components';
import { EditFormLayout } from 'core/layouts';
import _ from 'lodash';

function ContributionEditTemplate({ contributionEditViewStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    showBankAccounts,
    onChangeShowPayerInformation,
    showPayerInformation
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
    <EditFormLayout form={form} isEdit={true} loading={loading}>
      <div className="f-row">
        <div className="form__group f-col f-col-lrg-6">
          <div className="inputgroup">
            <label>Payment Type</label>
            <BaasicDropdown classNames="input" field={form.$('paymentType')} store={paymentTypeDropdownStore} />
          </div>
        </div>
        {showBankAccounts && <div className="form__group f-col f-col-lrg-6">
          <div className="inputgroup">
            <label>Bank Account</label>
            <BaasicDropdown classNames="input" field={form.$('bankAccount')} store={bankAccountDropdownStore} />
          </div>
        </div>}
      </div>
      {form.$('paymentType.id').value && (!showBankAccounts || showBankAccounts && form.$('bankAccount.id').value) &&
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-12">
            <h5>Payer Information</h5>
            <div className="display--b pull">Show payer informations</div>
            <div className="display--b pull spc--left--sml">
              <input type="checkbox" onChange={onChangeShowPayerInformation} value={showPayerInformation} />
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
  );
};

ContributionEditTemplate.propTypes = {
  contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
