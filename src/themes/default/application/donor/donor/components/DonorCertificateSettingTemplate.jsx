import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicFieldDropdown,
    NumericInputField
} from 'core/components'

const DonorCertificateSettingTemplate = function ({ t, donorCertificateSettingViewStore }) {
    const {
        loaderStore,
        form,
        grantAcknowledgmentTypeDropdownStore,
        grantAcknowledgmentTypeByAmountDropwdownStore
    } = donorCertificateSettingViewStore;

    return (
        <EditFormContent form={form}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
        >
            <h3 className="list--preferences__title">{t('DONOR.CERTIFICATE_SETTING.TITLE')}</h3>

            <div className="list--preferences">
                <div className="list--preferences__label is-dropdown">
                    Default share information <span class="type--color--note u-mar--left--tny">*</span>
                </div>
                <div className="list--preferences__dd">
                    <BaasicFieldDropdown showLabel={false} field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                </div>
            </div>
            <div className="list--preferences">
                <div className="list--preferences__label">Share information for transactions that exceeds amount</div>
                <div className="list--preferences__field">
                    <NumericInputField showLabel={false} field={form.$('acknowledgmentByAmount')} />
                </div>
            </div>
            <div className="list--preferences">
                <div className="list--preferences__label is-dropdown">
                    Share informations when exceed amount <span class="type--color--note u-mar--left--tny">*</span>
                </div>
                <div className="list--preferences__dd">
                    <BaasicFieldDropdown showLabel={false} field={form.$('grantAcknowledgmentTypeByAmountId')} store={grantAcknowledgmentTypeByAmountDropwdownStore} />
                </div>
            </div>

            <div className="type--right">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent>
    )
}

DonorCertificateSettingTemplate.propTypes = {
    donorCertificateSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorCertificateSettingTemplate);
