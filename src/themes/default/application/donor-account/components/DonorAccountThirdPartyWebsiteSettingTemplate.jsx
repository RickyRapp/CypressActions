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

const DonorAccountThirdPartyWebsiteSettingTemplate = function ({ t, donorAccountThirdPartyWebsiteSettingViewStore }) {
    const {
        loaderStore,
        form,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore,
        onChangeIsEnabled
    } = donorAccountThirdPartyWebsiteSettingViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="u-mar--bottom--tny">{t('DONOR_ACCOUNT.THIRD_PARTY_WEBSITE_SETTING.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <BasicFieldCheckbox field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                    </div>
                    <div className="form__group col col-lrg-2">
                        <NumericInputField field={form.$('maxAmount')} />
                    </div>
                    <div className="form__group col col-lrg-2">
                        <NumericInputField field={form.$('maxTimesPerDay')} />
                    </div>
                </div>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </EditFormContent>
        </div>
    )
}

DonorAccountThirdPartyWebsiteSettingTemplate.propTypes = {
    donorAccountThirdPartyWebsiteSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountThirdPartyWebsiteSettingTemplate);
