import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BasicCheckBox, BasicFieldDatePicker, BasicFormatFieldInput } from 'core/components';
import _ from 'lodash';

function ContributionSettingCreateFormFields({
    contributionSettingTypeIdField,
    enabledField,
    amountField,
    bankAccountIdField,
    lowBalanceAmountField,
    startDateField,
    bankAccountDropdownStore,
    contributionSettingType,
    contributionSettingTypeDropdownStore
}) {
    const styles = {
        opacity: '0.5',
        pointerEvents: 'none'
    }

    return (
        <React.Fragment>
            <BasicCheckBox field={enabledField} />

            <React.Fragment>
                <React.Fragment>
                    <div className="f-row" style={enabledField.value ? null : styles}>
                        <div className="form__group f-col f-col-lrg-12">
                            {contributionSettingTypeDropdownStore &&
                                <BaasicFieldDropdown field={contributionSettingTypeIdField} store={contributionSettingTypeDropdownStore} />}
                        </div>
                        <div className="form__group f-col f-col-lrg-12">
                            <BasicFormatFieldInput field={amountField} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2} />
                        </div>
                        <div className="form__group f-col f-col-lrg-12">
                            {bankAccountDropdownStore &&
                                <BaasicFieldDropdown field={bankAccountIdField} store={bankAccountDropdownStore} />}
                        </div>
                        {contributionSettingType && contributionSettingTypeIdField.value &&
                            (_.find(contributionSettingType, { id: contributionSettingTypeIdField.value }).abrv === 'low-balance' ?
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicFormatFieldInput field={lowBalanceAmountField} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2} />
                                </div>
                                :
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicFieldDatePicker field={startDateField} />
                                </div>)}
                    </div>
                </React.Fragment>
            </React.Fragment>
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionSettingCreateFormFields);
