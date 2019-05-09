import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BaasicModal } from 'core/components';
import { AchTemplate, WireTransferTemplate, StockAndMutualFundsTemplate, ChaseQuickPayTemplate, PayerInformationTemplate, SidebarDetailsTemplate } from 'themes/modules/common/contribution/components';
import { EditFormLayout, PageContentHeader, PageContentSidebar } from 'core/layouts';
import { BankAccountCreate } from 'modules/common/bank-account/pages';
import { ContributionReview } from 'modules/administration/contribution/components';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import _ from 'lodash';

function ContributionEditTemplate({ contributionEditViewStore }) {
  const {
    form,
    loaderStore: { loading },
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
  } = contributionEditViewStore;

  return (
    <React.Fragment>
      {form &&
        <React.Fragment>
          <EditFormLayout form={form} isEdit={true} loading={loading}>
            {contribution &&
              <PageContentHeader><DonorAccountHeaderDetails userId={contribution.donorAccountId} type='contribution' /></PageContentHeader>}
            {contribution && contributionStatuses &&
              <PageContentSidebar><SidebarDetailsTemplate contribution={contribution} contributionStatuses={contributionStatuses} reviewContributionModalParams={reviewContributionModalParams} /></PageContentSidebar>}
            <div className="f-row">
              <div className="form__group f-col f-col-lrg-6">
                {paymentTypeDropdownStore &&
                  <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />}
              </div>
            </div>

            {paymentTypeDropdownStore &&
              <React.Fragment>
                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === achId &&
                  <AchTemplate field={form.$('bankAccountId')} bankAccountDropdownStore={bankAccountDropdownStore} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === wireTransferId &&
                  <WireTransferTemplate field={form.$('bankAccountId')} bankAccountDropdownStore={bankAccountDropdownStore} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === checkId &&
                  <CheckTemplate field={form.$('checkNumber')} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === stockAndMutualFundsId &&
                  <StockAndMutualFundsTemplate form={form} showStockAndMutualFundsContactInfo={showStockAndMutualFundsContactInfo} onChangeShowStockAndMutualFundsContactInfo={onChangeShowStockAndMutualFundsContactInfo} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === chaseQuickPayId &&
                  <ChaseQuickPayTemplate form={form} />}

                <PayerInformationTemplate form={form} />

                <div className="f-row">
                  <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('amount')} />
                  </div>
                  <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('description')} />
                  </div>
                </div>
              </React.Fragment>}
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

ContributionEditTemplate.propTypes = {
  contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
