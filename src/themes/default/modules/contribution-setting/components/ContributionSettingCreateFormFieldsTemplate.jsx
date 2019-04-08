import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BasicCheckBox, BasicFieldDatePicker } from 'core/components';
import { renderIf } from 'core/utils';
import _ from 'lodash';

function ContributionSettingCreateFormFields({
    contributionSettingTypeIdField,
    enabledField,
    amountField,
    bankAccountIdField,
    lowBalanceAmountField,
    startDateField,
    bankAccountDropdownStore,
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
                            {contributionSettingTypeDropdownStore && <BaasicFieldDropdown field={contributionSettingTypeIdField} store={contributionSettingTypeDropdownStore} />}
                        </div>
                        <div className="form__group f-col f-col-lrg-12">
                            <BasicInput field={amountField} />
                        </div>
                        <div className="form__group f-col f-col-lrg-12">
                            <div className="inputgroup">
                                <label>Bank Account</label>
                                {bankAccountDropdownStore && <BaasicFieldDropdown field={bankAccountIdField} store={bankAccountDropdownStore} />}
                            </div>
                        </div>
                        {contributionSettingTypeIdField.value &&
                            (contributionSettingTypeDropdownStore.value.abrv === 'low-balance' ?
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicInput field={lowBalanceAmountField} />
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
