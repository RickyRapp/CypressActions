import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    Date,
    NumericInputField
} from 'core/components';

function DonorAccountSettingTemplate({ donorAccountSettingViewStore, t }) {
    const {
        form
    } = donorAccountSettingViewStore;

    return (
        <EditFormContent form={form}>
            <div className="row">
                <div className="col col-sml-12 col-lrg-12">
                    <div className="u-mar--bottom--sml">
                        <h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_SETTING_FIELDS.TITLE')}</h3>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-3">
                                <NumericInputField field={form.$('lineOfCredit')} />
                            </div>
                            <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-3">
                                <NumericInputField field={form.$('blankBookletMaxAmount')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="u-mar--bottom--med type--right">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent>
    )
}

DonorAccountSettingTemplate.propTypes = {
    donorAccountSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
};

export default defaultTemplate(DonorAccountSettingTemplate);
