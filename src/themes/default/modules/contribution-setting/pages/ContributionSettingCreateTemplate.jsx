import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, EditFormContent, BaasicFormControls, BaasicFieldDropdown, BasicCheckBox } from 'core/components';
import _ from 'lodash';

function ContributionSettingCreateTemplate({ contributionSettingCreateViewStore }) {
    const {
        form,
        loading,
        bankAccountDropdownStore,
        contributionSettingTypeDropdownStore
    } = contributionSettingCreateViewStore;

    const styles = {
        opacity: '0.5',
        pointerEvents: 'none'
    }

    return (
        <EditFormContent form={form} loading={loading}>
            {contributionSettingTypeDropdownStore && <BaasicFieldDropdown field={form.$('contributionSettingTypeId')} store={contributionSettingTypeDropdownStore} />}

            {form.$('contributionSettingTypeId').value &&
                <React.Fragment>
                    <BasicCheckBox field={form.$('enabled')} />
                    <React.Fragment>
                        <div className="f-row" style={form.$('enabled').value ? null : styles}>
                            <div className="form__group f-col f-col-lrg-12">
                                <BasicInput field={form.$('amount')} />
                            </div>
                            <div className="form__group f-col f-col-lrg-12">
                                <div className="inputgroup">
                                    <label>Bank Account</label>
                                    {bankAccountDropdownStore && <BaasicFieldDropdown field={form.$('bankAccountId')} store={bankAccountDropdownStore} />}
                                </div>
                            </div>
                            {form.$('contributionSettingTypeId').value && contributionSettingTypeDropdownStore.value.abrv === 'low-balance' ?
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicInput field={form.$('lowBalanceAmount')} />
                                </div>
                                :
                                <div className="form__group f-col f-col-lrg-12">
                                    <BasicInput field={form.$('startDate')} />
                                </div>}
                        </div>
                    </React.Fragment>
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </React.Fragment>
            }
        </EditFormContent>
    );
}

export default defaultTemplate(ContributionSettingCreateTemplate);
