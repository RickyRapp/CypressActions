import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicButton, BaasicFieldDropdown, BaasicFormControls, BaasicModal } from 'core/components';
import { EditFormLayout, PageContentHeader, PageContentSidebar } from 'core/layouts';
import { BankAccountCreate } from 'modules/common/bank-account/pages';
import { ContributionReview } from 'modules/administration/contribution/components';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import moment from 'moment';
import 'moment-timezone';
import _ from 'lodash';

function ContributionEditTemplate({ contributionCreateViewStore, rootStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    addBankAccountModalParams,
    onAddBankAccount,
    reviewContributionModalParams,
    contributionStatuses,
    onAfterReviewContribution,
    showStockAndMutualFundsContactInfo,
    onChangeShowStockAndMutualFundsContactInfo,
    contribution,
    chaseQuickPayId,
    achId,
    wireTransferId,
    stockAndMutualFundsId,
    checkId
  } = contributionCreateViewStore;

  const labelBankAccount =
    <label>Bank Account <a className="btn btn--xsml btn--tertiary" onClick={() => addBankAccountModalParams.open()}>Add new</a> </label>

  return (
    <React.Fragment>
      {form &&
        <React.Fragment>
          <EditFormLayout form={form} isEdit={true} loading={loading} layoutFooterVisible={false}>
            {contribution &&
              <PageContentHeader><DonorAccountHeaderDetails userId={contribution.donorAccountId} type='contribution' /></PageContentHeader>}
            {contribution && contributionStatuses &&
              <PageContentSidebar>{contributionDetails(contribution, reviewContributionModalParams, contributionStatuses)}</PageContentSidebar>}
            <div className="f-row">
              <div className="form__group f-col f-col-lrg-6">
                {paymentTypeDropdownStore &&
                  <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />}
              </div>
            </div>

            {(form.$('paymentTypeId').value === achId || form.$('paymentTypeId').value === wireTransferId) &&
              <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                  {bankAccountDropdownStore &&
                    <BaasicFieldDropdown field={form.$('bankAccountId')} store={bankAccountDropdownStore} label={labelBankAccount} />}
                </div>
              </div>}

            {form.$('paymentTypeId').value === checkId &&
              <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                  <BasicInput field={form.$('checkNumber')} />
                </div>
              </div>}

            {form.$('paymentTypeId').value === stockAndMutualFundsId &&
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
            {form.$('paymentTypeId').value === chaseQuickPayId &&
              <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                  <BasicInput field={form.$('transactionId')} />
                </div>
                <div className="form__group f-col f-col-lrg-6">
                  <BasicInput field={form.$('memo')} />
                </div>
              </div>}
            <div className="f-row card card--sml">
              <div className="form__group f-col f-col-lrg-12">
                <h5>Payer Information</h5>
              </div>
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
              {contribution &&
                <BankAccountCreate onAfterCreate={onAddBankAccount} userId={contribution.donorAccountId} />}
            </div>
          </BaasicModal>
          <BaasicModal modalParams={reviewContributionModalParams} >
            <div className="col col-sml-12 card card--form card--primary card--lrg">
              <ContributionReview onAfterReview={onAfterReviewContribution} id={form.$('id').value} />
            </div>
          </BaasicModal>
        </React.Fragment>}
    </React.Fragment>
  );
};

function contributionDetails(contribution, reviewContributionModalParams, contributionStatuses) {
  return (
    <React.Fragment>
      {contribution ?
        <React.Fragment >
          <h4>Details</h4>
          <div className="f-row">
            <div className="form__group f-col f-col-lrg-12">
              <div>Status:</div>
              <strong>{_.find(contributionStatuses, { id: contribution.contributionStatusId }).name}</strong>
              <a className="btn btn--xsml btn--tertiary" onClick={() => reviewContributionModalParams.open()}>Review</a>
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
              <div>Date Updated:</div>
              <strong>{moment(contribution.dateUpdated).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss')}</strong>
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
  contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
