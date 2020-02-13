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

const DonorAccountCertificateSettingTemplate = function ({ t, donorAccountCertificateSettingViewStore }) {
    const {
        loaderStore,
        form,
        grantAcknowledgmentTypeDropdownStore,
        grantAcknowledgmentTypeByAmountDropwdownStore
    } = donorAccountCertificateSettingViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
                layoutFoot
            >
                <h3>{t('DONOR_ACCOUNT.CERTIFICATE_SETTING.TITLE')}</h3>
                <div className="card--form card--primary card--med">
                    <div className="row">
                        <div className="form__group col col-lrg-4">
                            <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <NumericInputField field={form.$('acknowledgmentByAmount')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeByAmountId')} store={grantAcknowledgmentTypeByAmountDropwdownStore} />
                        </div>
                    </div>
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorAccountCertificateSettingTemplate.propTypes = {
    donorAccountCertificateSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAccountCertificateSettingTemplate);
