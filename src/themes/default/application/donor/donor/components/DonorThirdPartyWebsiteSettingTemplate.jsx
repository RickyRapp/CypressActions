import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicFieldDropdown
} from 'core/components'

const DonorThirdPartyWebsiteSettingTemplate = function ({ t, donorThirdPartyWebsiteSettingViewStore }) {
    const {
        loaderStore,
        form,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore
    } = donorThirdPartyWebsiteSettingViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('DONOR.CHARITY_WEBSITE_SETTING.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">Share information</div>
                    <div className="list--preferences__dd">
                        <BaasicFieldDropdown showLabel={false} field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">Purpose</div>
                    <div className="list--preferences__dd">
                        <BaasicFieldDropdown showLabel={false} field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} disabled={true} />
                    </div>
                </div>

                {/* <div className="list--preferences">
                <div className="list--preferences__label">Maximum dollar amount per transaction</div>
                <div className="list--preferences__field">
                    <NumericInputField showLabel={false} field={form.$('maxAmount')} />
                </div>
            </div>

            <div className="list--preferences">
                <div className="list--preferences__label">
                    Maximum transactions per day
                </div>
                <div className="list--preferences__field">
                    <NumericInputField showLabel={false} field={form.$('maxTimesPerDay')} />
                </div>
            </div> */}
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
