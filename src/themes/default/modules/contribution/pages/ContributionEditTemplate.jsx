import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicButton, BaasicFieldDropdown, BaasicFormControls, BaasicModal } from 'core/components';
import { EditFormLayout, PageContentHeader, PageContentSidebar } from 'core/layouts';
import { BankAccountCreate } from 'modules/bank-account/pages';
import { ContributionReview } from 'modules/contribution/components';
import { renderIf, isSome } from 'core/utils';
import { DonorAccountHeaderDetails } from 'modules/donor-account/components'
import moment from 'moment';
import 'moment-timezone';
import _ from 'lodash';

function ContributionEditTemplate({ contributionEditViewStore, rootStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    showBankAccounts,
    showCheckNumber,
    permissions,
    addBankAccountModalParams,
    onAddBankAccount,
    reviewContributionModalParams,
    onAfterReviewContribution,
    showPayerInformation,
    onChangeShowPayerInformation,
    paymentTypes,
    isPayerInformationValid,
    contribution
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
      <EditFormLayout form={form} isEdit={true} loading={loading} layoutFooterVisible={false}>
        {contribution && permissions.employeeUpdate ?
          <PageContentHeader><DonorAccountHeaderDetails userId={contribution.donorAccountId} type='contribution' /></PageContentHeader> : null}
        <PageContentSidebar>{contributionDetails(contribution, reviewContributionModalParams, permissions)}</PageContentSidebar>
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            <div className="inputgroup">
              <label>Payment Type</label>
              {paymentTypeDropdownStore && <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />}
              {renderIf(isSome(form.$('paymentTypeId').error))(
                <p className="type--tiny type--color--error">{form.$('paymentTypeId').error}</p>
              )}
            </div>
          </div>
          {showBankAccounts &&
            <div className="form__group f-col f-col-lrg-6">
              <div className="inputgroup">
                <label>Bank Account <a className="btn btn--xsml btn--tertiary" onClick={() => addBankAccountModalParams.open()}>Add new</a></label>
                {bankAccountDropdownStore && <BaasicFieldDropdown field={form.$('bankAccountId')} store={bankAccountDropdownStore} />}
                {renderIf(isSome(form.$('bankAccountId').error))(
                  <p className="type--tiny type--color--error">{form.$('bankAccountId').error}</p>
                )}
              </div>
            </div>}

          {showCheckNumber &&
            <div className="form__group f-col f-col-lrg-6">
              <BasicInput field={form.$('checkNumber')} />
            </div>}
        </div>
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
        <div className="f-row">
          <div className="form__group f-col f-col-lrg-6">
            <BasicInput field={form.$('amount')} />
          </div>
          <div className="form__group f-col f-col-lrg-6">
            <BasicInput field={form.$('description')} />
          </div>
        </div>
        {renderFormButtonControls({
          form,
          goBack: () => rootStore.routerStore.goBack()
        })}
      </EditFormLayout>
      <BaasicModal modalParams={addBankAccountModalParams} >
        <div className="col col-sml-12 card card--form card--primary card--lrg">
          <BankAccountCreate onAfterCreate={onAddBankAccount} />
        </div>
      </BaasicModal>
      <BaasicModal modalParams={reviewContributionModalParams} >
        <div className="col col-sml-12 card card--form card--primary card--lrg">
          <ContributionReview onAfterReview={onAfterReviewContribution} rootStore={rootStore} id={form.$('id').value} />
        </div>
      </BaasicModal>
    </React.Fragment>
  );
};

function contributionDetails(contribution, reviewContributionModalParams, permissions) {
  return (
    <React.Fragment>
      {contribution ?
        <React.Fragment >
          <h4>Details</h4>
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
              <div>Status:</div>
              <strong>{contribution.contributionStatus.name}</strong>
              {permissions.employeeUpdate && <a className="btn btn--xsml btn--tertiary" onClick={() => reviewContributionModalParams.open()}>Review</a>}
            </div>
            <div className="form__group f-col f-col-lrg-12">
              <div>Conf. Number:</div>
              <strong>{contribution.confirmationNumber}</strong>
            </div>
            <div className="form__group f-col f-col-lrg-12">
              <div>Date Created:</div>
              <strong>{moment(contribution.dateCreated).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss')}</strong>
            </div>
            <div className="form__group f-col f-col-lrg-12">
              <div>Created By:</div>
              {contribution.createdByCoreUser ?
                <strong>{`${contribution.createdByCoreUser.firstName} ${contribution.createdByCoreUser.lastName}`}</strong>
                :
                <strong>System</strong>
              }
            </div>
          </div>
        </React.Fragment >
        : null}
    </React.Fragment >
  );
}

function renderFormButtonControls({ form, goBack }) {
  return (
    <div>
      <BaasicFormControls form={form} onSubmit={form.onSubmit} />
      <BaasicButton
        className="btn btn--med btn--primary display--ib"
        label={'Cancel'}
        onClick={goBack}
      />
    </div>
  )
}

ContributionEditTemplate.propTypes = {
  contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
