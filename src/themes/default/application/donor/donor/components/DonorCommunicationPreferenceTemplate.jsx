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
                <h3 className="list--preferences__title">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CARD')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label">Notify me for a non present transaction exceeding</div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('cardTransactionAmountExceeding')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">Notify me for card transactions exceeding</div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('cardNonPresentTransactionAmountExceeding')} />
                    </div>
                </div>

                <div className="list--preferences u-mar--bottom--lrg">
                    <div className="list--preferences__label">Notify me when check inventory running low</div>
                    <div className="list--preferences__field">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isCheckInventoryRunningLowEnabled')} />
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CHECK')}</h3>

                <div className="list--preferences u-mar--bottom--lrg">
                    <div className="list--preferences__label">Notify me for checks exceeding</div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('checkAmountExceeding')} />
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_CHARITY_WEBSITE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label">Notify me for tranasctions exceed</div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('thirdPartyWebsiteAmountExceeding')} />
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_GENERAL')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label">Notify me when charity sends request</div>
                    <div className="list--preferences__field">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNewGrantRequestEnabled')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">Notify me when my online statement is made available</div>
                    <div className="list--preferences__field">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isDonorStatementAvailableEnabled')} />
                    </div>
                </div>

                <div className="list--preferences u-mar--bottom--lrg">
                    <div className="list--preferences__label">Notify me when my balance runs below</div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('donorAvailableBalanceRunsBelow')} />
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('DONOR.COMMUNICATION_PREFERENCE.TITLE_INVESTMENT')}</h3>
                <div className="list--preferences">
                    <div className="list--preferences__label">Notify me when a pool drops</div>
                    <div className="list--preferences__field">
                        <NumericInputField showLabel={false} field={form.$('investmentPoolDropsBelow')} />
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
