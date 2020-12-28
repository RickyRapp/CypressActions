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
        <div className="card--primary card--med">
            <EditFormContent form={form}>
                <div className="row">
                    <div className="col col-sml-12 col-lrg-6">
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CARD')}</h3>
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('cardTransactionAmountExceeding')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('cardNonPresentTransactionAmountExceeding')} />
                            </div>
                        </div>
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CHECK')}</h3>
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isCheckInventoryRunningLowEnabled')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('checkAmountExceeding')} />
                            </div>
                        </div>
                        <h3 className="type--lrg type--wgt--medium type--break--all u-mar--bottom--sml">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_THIRD_PARY_WEBSITE')}</h3>
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('thirdPartyWebsiteAmountExceeding')} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12 col-lrg-6">
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_GENERAL')}</h3>
                        <div className="row u-mar--bottom--sml u-padd--top--tny">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isNewGrantRequestEnabled')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isDonorStatementAvailableEnabled')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('donorAvailableBalanceRunsBelow')} />
                            </div>
                        </div>
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--sml">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_INVESTMENT')}</h3>
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('investmentPoolDropsBelow')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="u-mar--bottom--sml type--right">
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
