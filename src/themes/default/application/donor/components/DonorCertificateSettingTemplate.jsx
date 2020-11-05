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
            <h3 className="u-mar--bottom--tny">{t('DONOR.CERTIFICATE_SETTING.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <NumericInputField field={form.$('acknowledgmentByAmount')} />
                </div>
                <div className="form__group col col-sml-12 col-lrg-4">
                    <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeByAmountId')} store={grantAcknowledgmentTypeByAmountDropwdownStore} />
                </div>
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </EditFormContent>
    )
}

DonorCertificateSettingTemplate.propTypes = {
    donorCertificateSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorCertificateSettingTemplate);
