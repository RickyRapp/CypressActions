import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    NumericInputField,
    BaasicToggle
} from 'core/components'

const CharityWebsiteDonationsPreferencesTemplate = function ({t, charityWebsiteDonationsPreferencesViewStore}){

    const {
        loaderStore,
        form
    } = charityWebsiteDonationsPreferencesViewStore;

    return(
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING')}</div>
                    <div className="list--preferences__dd">
                    <BaasicToggle value={true} field={form.$('notifyExceedingTransaction')} />
                    <NumericInputField showLabel={false} field={form.$('notifyExceedingTransactionAmount')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    );


}

CharityWebsiteDonationsPreferencesTemplate.propTypes = {
    charityWebsiteDonationsPreferencesViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityWebsiteDonationsPreferencesTemplate);