import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EditFormContent,
    BaasicFormControls,
    NumericInputField,
    BasicFieldCheckbox,
    BasicInput
} from 'core/components'

const CharityCommunicationPreferenceTemplate = function ({ t, charityCommunicationPreferenceViewStore }) {
    const {
        form,
        donorEmail
    } = charityCommunicationPreferenceViewStore;

    return (
        <EditFormContent form={form}>
            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.EMAIL.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.EMAIL_TO_NOTIFY')}</div>
                    <div className="list--preferences__dd">
                        <input
                            className="input input--lrg input--text"
                            type="text"
                            value={donorEmail}
                            disabled />
                    </div>
                </div>
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT')}</div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} disabled={true} value={true} field={form.$('isNotifyDonorsApprovedGrantEnabled')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_ACH_PAYMENT')}</div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyAchPaymentsEnabled')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label "> {t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyCheckPaymentsEnabled')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>


            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CARD.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CARD_AMOUNT')}</div>
                    <div className="list--preferences__dd">
                        <NumericInputField field={form.$('cardTransactionExceedingAmount')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>


            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.NAME')}</h3>

                {/*  now hidden... maybe will be activated later
                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_CHECK_DONATION')}</div>
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('notifyCheckExceedingAmount')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isNotifyCheckExceedingEnabled')} />
                            </div>
                        </div>
                    </div>
                </div>
            */}
                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_PROCESSED_SESSION')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyProcessedSessionEnabled')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_WHEN_CHECK_RELEASED')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyWhenCheckReleasedFromHold')} />
                    </div>
                </div>

                {/*  now hidden... maybe will be activated later
                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_APPROVED_SESSION')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyRemoteSessionApprovedEnabled')} />
                    </div>
                </div>
             
                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_DELAYED_CHECK')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyDelayedCheckEnabled')} />
                    </div>
                </div>
            */}

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING')}</div>
                    <div className="list--preferences__dd">
                        <div className="list--preferences__dd">
                            <div className="u-mar--bottom--sml">
                                <NumericInputField field={form.$('notifyExceedingTransactionAmount')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.INVESTMENT.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">
                        <p className="u-mar--bottom--tny">{t('CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY')}</p>
                        <BasicFieldCheckbox toggleClass="--toggle" disabled={true} field={form.$('isNotifyOnDailyChangesEnabled')} />
                    </div>
                    <div className="list--preferences__dd">
                        <div className="u-mar--bottom--sml">
                            <NumericInputField disabled={true} field={form.$('notifyOnDailyChangesAmount')} />
                        </div>
                    </div>
                </div>
                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </div>
        </EditFormContent>
    )
}

CharityCommunicationPreferenceTemplate.propTypes = {
    charityCommunicationPreferenceViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityCommunicationPreferenceTemplate);

