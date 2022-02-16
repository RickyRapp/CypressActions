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

const CharityCardPreferencesTemplate = function ({t, charityCardPreferencesViewStore}){

    const {
        loaderStore,
        form
    } = charityCardPreferencesViewStore;

    return(
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.CARD.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_ACH_PAYMENT')}</div>
                    <div className="list--preferences__dd">
                    <BaasicToggle value={true} field={form.$('notifyAchPayments')} />
                    <BasicInput showLabel={false} field={form.$('emailToNotify')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT')}  </div>
                    <div className="list--preferences__dd">
                        <BaasicToggle value={true} field={form.$('notifyCheckPayments')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    );


}

CharityCardPreferencesTemplate.propTypes = {
    charityCardPreferencesViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityCardPreferencesTemplate);