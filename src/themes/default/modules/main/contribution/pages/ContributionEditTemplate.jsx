import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BasicFormatFieldInput, BaasicFieldDropdown, BaasicModal } from 'core/components';
import { AchTemplate, WireTransferTemplate, StockAndMutualFundsTemplate, ChaseQuickPayTemplate, PayerInformationTemplate } from 'themes/modules/common/contribution/components';
import { SidebarDetailsTemplate } from 'themes/modules/common/contribution/components';
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
    checkId,
    syncBankAccounts
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

            {form.$('paymentTypeId').value === achId && bankAccountDropdownStore &&
              <AchTemplate field={form.$('bankAccountId')} bankAccountDropdownStore={bankAccountDropdownStore} addBankAccountModalParams={addBankAccountModalParams} syncBankAccounts={syncBankAccounts} />}

            {form.$('paymentTypeId').value === wireTransferId && bankAccountDropdownStore &&
              <WireTransferTemplate field={form.$('bankAccountId')} bankAccountDropdownStore={bankAccountDropdownStore} addBankAccountModalParams={addBankAccountModalParams} syncBankAccounts={syncBankAccounts} />}

            {form.$('paymentTypeId').value === checkId &&
              <CheckTemplate field={form.$('checkNumber')} />}

            {form.$('paymentTypeId').value === stockAndMutualFundsId &&
              <StockAndMutualFundsTemplate form={form} showStockAndMutualFundsContactInfo={showStockAndMutualFundsContactInfo} onChangeShowStockAndMutualFundsContactInfo={onChangeShowStockAndMutualFundsContactInfo} />}

            {form.$('paymentTypeId').value === chaseQuickPayId &&
              <ChaseQuickPayTemplate form={form} />}

            <PayerInformationTemplate form={form} />

            <div className="f-row">
              <div className="form__group f-col f-col-lrg-6">
                <BasicFormatFieldInput field={form.$('amount')} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2} />
              </div>
              <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={form.$('description')} />
              </div>
            </div>

          </EditFormLayout>
          <BaasicModal modalParams={addBankAccountModalParams} >
            {contribution &&
              <BankAccountCreate onAfterCreate={onAddBankAccount} userId={contribution.donorAccountId} />}
          </BaasicModal>
        </React.Fragment>}
    </React.Fragment >
  );
};

ContributionEditTemplate.propTypes = {
  contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
