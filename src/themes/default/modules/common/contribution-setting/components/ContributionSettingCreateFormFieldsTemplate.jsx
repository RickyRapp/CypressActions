import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicFieldDropdown, BasicCheckBox, DatePickerField, BasicFormatFieldInput } from 'core/components';
import _ from 'lodash';
import moment from 'moment';

function ContributionSettingCreateFormFields({
    contributionSettingTypeIdField,
    enabledField,
    amountField,
    bankAccountIdField,
    lowBalanceAmountField,
    startDateField,
    bankAccountDropdownStore,
    contributionSettingType,
    contributionSettingTypeDropdownStore,
    hideUntilSettingIsSelected = false
}) {
    const styles = {
        opacity: '0.5',
        pointerEvents: 'none'
    }

    return (
        <React.Fragment>
            {enabledField &&
                <BasicCheckBox field={enabledField} />}

            <React.Fragment>
                <div className="f-row" style={enabledField ? (enabledField.value ? null : styles) : null}>
                    <div className="form__group f-col f-col-lrg-12">
                        {contributionSettingTypeDropdownStore &&
                            <BaasicFieldDropdown field={contributionSettingTypeIdField} store={contributionSettingTypeDropdownStore} />}
                    </div>
                    {(!hideUntilSettingIsSelected || (hideUntilSettingIsSelected && contributionSettingTypeDropdownStore && contributionSettingTypeDropdownStore.value)) &&
                        <React.Fragment>
                            {contributionSettingType && contributionSettingTypeIdField.value &&
                                (_.find(contributionSettingType, { id: contributionSettingTypeIdField.value }).abrv === 'low-balance' ?
                                    <div className="form__group f-col f-col-lrg-12">
                                        <BasicFormatFieldInput
                                            field={lowBalanceAmountField}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                            fixedDecimalScale={true}
                                            decimalScale={2} />
                                    </div>
                                    :
                                    <div className="form__group f-col f-col-lrg-12">
                                        <DatePickerField field={startDateField} />
                                    </div>)}
                            <div className="form__group f-col f-col-lrg-12">
                                <BasicFormatFieldInput
                                    field={amountField}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                {bankAccountDropdownStore &&
                                    <BaasicFieldDropdown field={bankAccountIdField} store={bankAccountDropdownStore} />}
                            </div>
                        </React.Fragment>}
                </div>
            </React.Fragment>
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionSettingCreateFormFields);
