import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicFieldCheckbox,
    BaasicFieldDropdown,
    NumericInputField
} from 'core/components'

const DonorGivingCardSettingEditTemplate = function ({ donorGivingCardSettingEditViewStore }) {
    const {
        loaderStore,
        form,
        isEdit,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        onChangeIsEnabled,
        givingCardDropdownStore
    } = donorGivingCardSettingEditViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                {isEdit && !form.$('isEnabled').value &&
                    <div className="row">
                        <div className="form__group col col-sml-12 col-xlrg-6 col-xxlrg-4">
                            <BasicFieldCheckbox field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                        </div>
                    </div>}
                <div className="row">
                    <div className="form__group col col-sml-12 col-xlrg-6">
                        <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                    <div className="form__group col col-sml-12 col-xlrg-6">
                        <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                    </div>
                    <div className="form__group col col-sml-12 col-xlrg-6">
                        <NumericInputField field={form.$('maxAmount')} />
                    </div>
                    <div className="form__group col col-sml-12 col-xlrg-6">
                        <NumericInputField field={form.$('maxTimesPerDay')} />
                    </div>
                    <div className="form__group col col-sml-12 col-xlrg-6">
                        <BaasicFieldDropdown store={givingCardDropdownStore} field={form.$('givingCardId')} />
                    </div>
                </div>
                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorGivingCardSettingEditTemplate.propTypes = {
    donorGivingCardSettingEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorGivingCardSettingEditTemplate);
