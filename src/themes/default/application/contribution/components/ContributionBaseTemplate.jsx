import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFieldDropdown,
    NumericInputField
} from 'core/components';
import {
    AchTemplate,
    CheckTemplate,
    WireTransferTemplate,
    StockAndMutualFundsTemplate,
    ChaseQuickPayTemplate,
    PayerInformationTemplate
} from 'themes/application/contribution/components';

function ContributionBaseTemplate({
    form,
    paymentTypeDropdownStore,
    donorName,
    openBankAccountModal,
    bankAccountDropdownStore,
    setPayerInfoUsingPrimaryDonorContactInfo
}) {
    return (
        <React.Fragment>
            {donorName && <h3 className="u-mar--bottom--med">{donorName}</h3>}
            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">General Data</h3>
                <div className="row">
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <NumericInputField field={form.$('amount')} />
                    </div>
                </div>

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' &&
                    <AchTemplate
                        field={form.$('bankAccountId')}
                        bankAccountDropdownStore={bankAccountDropdownStore}
                        openBankAccountModal={openBankAccountModal} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'wire-transfer' &&
                    <WireTransferTemplate
                        field={form.$('bankAccountId')}
                        bankAccountDropdownStore={bankAccountDropdownStore} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' &&
                    <CheckTemplate field={form.$('checkNumber')} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'stock-and-mutual-funds' &&
                    <StockAndMutualFundsTemplate form={form} />}

                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'chase-quick-pay' &&
                    <ChaseQuickPayTemplate form={form} />}
            </div>
            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <PayerInformationTemplate
                    form={form}
                    setPayerInfoUsingPrimaryDonorContactInfo={setPayerInfoUsingPrimaryDonorContactInfo}
                    hideButton={paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach'}
                />
            </div>
        </React.Fragment>
    );
}

ContributionBaseTemplate.propTypes = {
    form: PropTypes.object.isRequired,
    paymentTypeDropdownStore: PropTypes.object.isRequired,
    donorName: PropTypes.string.isRequired,
    openBankAccountModal: PropTypes.func.isRequired,
    bankAccountDropdownStore: PropTypes.object.isRequired,
    setPayerInfoUsingPrimaryDonorContactInfo: PropTypes.func.isRequired
};

export default defaultTemplate(ContributionBaseTemplate);
