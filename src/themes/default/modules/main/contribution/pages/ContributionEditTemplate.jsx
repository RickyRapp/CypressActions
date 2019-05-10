import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicFormatFieldInput, BaasicFieldDropdown, BaasicModal } from 'core/components';
import { AchTemplate, WireTransferTemplate, StockAndMutualFundsTemplate, ChaseQuickPayTemplate, PayerInformationTemplate } from 'themes/modules/common/contribution/components';
import { SidebarDetailsTemplate } from 'themes/modules/main/contribution/components';
import { EditFormLayout, PageContentSidebar } from 'core/layouts';
import { BankAccountCreate } from 'modules/common/bank-account/pages';
import _ from 'lodash';

function ContributionEditTemplate({ contributionEditViewStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    addBankAccountModalParams,
    onAddBankAccount,
    contributionStatuses,
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
            {contribution && contributionStatuses &&
              <PageContentSidebar><SidebarDetailsTemplate contribution={contribution} contributionStatuses={contributionStatuses} /></PageContentSidebar>}
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
                    <BasicFormatFieldInput field={form.$('amount')} thousandSeparator={true} prefix={'$'} />
                  </div>
                  <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('description')} />
                  </div>
                </div>
              </React.Fragment>}
          </EditFormLayout>
          <BaasicModal modalParams={addBankAccountModalParams} >
            <div className="col col-sml-12 card card--form card--primary card--lrg">
              <BankAccountCreate onAfterCreate={onAddBankAccount} userId={contribution.donorAccountId} />
            </div>
          </BaasicModal>
        </React.Fragment>}
    </React.Fragment >
  );
};

ContributionEditTemplate.propTypes = {
  contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
