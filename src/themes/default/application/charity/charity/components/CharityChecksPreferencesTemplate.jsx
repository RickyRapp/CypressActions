import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput,
    BaasicToggle
} from 'core/components'

const CharityChecksPreferencesTemplate = function ({t, charityChecksPreferencesViewStore}){

    const {
        loaderStore,
        form
    } = charityChecksPreferencesViewStore;

    return(
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_CHECK_DONATION')}</div>
                    <div className="list--preferences__dd">
                    <BaasicToggle value={true} field={form.$('notifyCheckExceeding')} />
                    <BasicInput showLabel={false} field={form.$('notifyCheckExceedingAmount')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_PROCESSED_SESSION')}  </div>
                    <div className="list--preferences__dd">
                        <BaasicToggle value={true} field={form.$('notifyProcessedSession')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_APPROVED_SESSION')}  </div>
                    <div className="list--preferences__dd">
                        <BaasicToggle value={true} field={form.$('notifyRemoteSessionApproved')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_DELAYED_CHECK')}  </div>
                    <div className="list--preferences__dd">
                        <BaasicToggle value={true} field={form.$('notifyDelayedCheck')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>   
        </div>
    );


}

CharityChecksPreferencesTemplate.propTypes = {
    charityChecksPreferencesViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityChecksPreferencesTemplate);