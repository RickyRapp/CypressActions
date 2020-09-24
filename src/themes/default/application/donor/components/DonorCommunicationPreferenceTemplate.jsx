import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EditFormContent,
    BaasicFormControls, NumericInputField, BasicFieldCheckbox
} from 'core/components'

const DonorCommunicationPreferenceTemplate = function ({ t, donorCommunicationPreferenceViewStore }) {
    const {
        form
    } = donorCommunicationPreferenceViewStore;

    return (
        <div className="card--form card--primary card--med">
            <EditFormContent form={form}>
                <div className="row">
                    <div className="col col-sml-12 col-lrg-12">
                        <div className="u-mar--bottom--sml">
                            <h3>{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CARD')}</h3>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('cardTransactionAmountExceeding')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('cardNonPresentTransactionAmountExceeding')} />
                                </div>
                            </div>
                            <h3>{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CHECK')}</h3>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('checkAmountExceeding')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <BasicFieldCheckbox field={form.$('isCheckInventoryRunningLowEnabled')} />
                                </div>
                            </div>
                            <h3>{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_THIRD_PARY_WEBSITE')}</h3>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('thirdPartyWebsiteAmountExceeding')} />
                                </div>
                            </div>
                            <h3>{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_GENERAL')}</h3>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <BasicFieldCheckbox field={form.$('isNewGrantRequestEnabled')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('donorAvailableBalanceRunsBelow')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <BasicFieldCheckbox field={form.$('isDonorStatementAvailableEnabled')} />
                                </div>
                            </div>
                            <h3>{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_INVESTMENT')}</h3>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('investmentPoolDropsBelow')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="u-mar--bottom--med">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

DonorCommunicationPreferenceTemplate.propTypes = {
    donorCommunicationPreferenceViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorCommunicationPreferenceTemplate);
