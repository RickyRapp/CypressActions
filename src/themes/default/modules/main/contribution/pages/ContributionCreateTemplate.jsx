import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BaasicModal, BasicCheckBox, BasicFormatFieldInput } from 'core/components';
import { AchTemplate, CheckTemplate, WireTransferTemplate, StockAndMutualFundsTemplate, ChaseQuickPayTemplate, PayerInformationTemplate } from 'themes/modules/common/contribution/components';
import { EditFormLayout } from 'core/layouts';
import { BankAccountCreate } from 'modules/common/bank-account/pages';
import { ContributionSettingCreateFormFieldsTemplate } from 'themes/modules/common/contribution-setting/components';
import _ from 'lodash';

function ContributionCreateTemplate({ contributionCreateViewStore }) {
  const {
    form,
    loading,
    bankAccountDropdownStore,
    paymentTypeDropdownStore,
    addBankAccountModalParams,
    onAddBankAccount,
    showStockAndMutualFundsContactInfo,
    onChangeShowStockAndMutualFundsContactInfo,
    chaseQuickPayId,
    achId,
    wireTransferId,
    stockAndMutualFundsId,
    checkId,
    bankAccountSettingDropdownStore,
    contributionSettingTypeDropdownStore,
    userId,
    onChangeMakeAsRecurringPayment,
    usedSettingTypeIds,
    contributionSettingType
  } = contributionCreateViewStore;

  return (
    <React.Fragment>
      {form &&
        <EditFormLayout form={form} isEdit={false} loading={loading}>
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

              {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.id === achId && form.$('bankAccountId').value && form.$('amount').value &&
                <React.Fragment>
                  <BasicCheckBox field={form.$('makeAsRecurringPayment')} onChange={onChangeMakeAsRecurringPayment} />
                  {form.$('makeAsRecurringPayment').value === true &&
                    <ContributionSetting
                      form={form}
                      usedSettingTypeIds={usedSettingTypeIds}
                      contributionSettingType={contributionSettingType}
                      bankAccountSettingDropdownStore={bankAccountSettingDropdownStore}
                      contributionSettingTypeDropdownStore={contributionSettingTypeDropdownStore} />}
                </React.Fragment>}
            </React.Fragment>}
        </EditFormLayout>}
      <BaasicModal modalParams={addBankAccountModalParams} >
        <div className="col col-sml-12 card card--form card--primary card--lrg">
          <BankAccountCreate onAfterCreate={onAddBankAccount} userId={userId} />
        </div>
      </BaasicModal>
    </React.Fragment >
  );
};

const ContributionSetting = ({ form, usedSettingTypeIds, contributionSettingType, bankAccountSettingDropdownStore, contributionSettingTypeDropdownStore }) => {
  return (
    <div className="f-row">
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
    </div>)
}

ContributionCreateTemplate.propTypes = {
  contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionCreateTemplate);
