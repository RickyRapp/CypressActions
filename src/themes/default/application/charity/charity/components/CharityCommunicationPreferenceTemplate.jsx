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
        form
    } = charityCommunicationPreferenceViewStore;

    return (
        <div className="card--primary card--med">
            <EditFormContent form={form}>
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CARD.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.EMAIL_TO_NOTIFY')}</div>
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicInput showLabel={false} field={form.$('emailToNotify')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_ACH_PAYMENT')}</div>
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyAchPaymentsEnabled')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label "> {t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyCheckPaymentsEnabled')} />
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.NAME')}</h3>

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

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_PROCESSED_SESSION')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('isNotifyProcessedSessionEnabled')} />
                    </div>
                </div>

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

                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING')}</div>
                    <div className="list--preferences__dd">
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('notifyExceedingTransactionAmount')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isNotifyExceedingTransactionEnabled')} />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT')}</div>
                        <div className="list--preferences__dd">
                            <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} value={true} field={form.$('isNotifyDonorsApprovedGrantEnabled')} />
                    </div>
                </div>

                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.INVESTMENT.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY')}</div>
                    <div className="list--preferences__dd">
                    <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('notifyOnDailyChangesAmount')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isNotifyOnDailyChangesEnabled')} />
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

CharityCommunicationPreferenceTemplate.propTypes = {
    charityCommunicationPreferenceViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityCommunicationPreferenceTemplate);
