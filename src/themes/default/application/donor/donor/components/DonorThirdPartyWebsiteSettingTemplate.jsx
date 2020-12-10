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

const DonorThirdPartyWebsiteSettingTemplate = function ({ t, donorThirdPartyWebsiteSettingViewStore }) {
    const {
        loaderStore,
        form,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        onChangeIsEnabled
    } = donorThirdPartyWebsiteSettingViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR.THIRD_PARTY_WEBSITE_SETTING.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-sml-12 col-xlrg-6 col-xxlrg-4">
                        <BasicFieldCheckbox field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                    </div>
                </div>
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
                </div>
                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorThirdPartyWebsiteSettingTemplate.propTypes = {
    donorThirdPartyWebsiteSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorThirdPartyWebsiteSettingTemplate);
