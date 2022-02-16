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

const CharityInvestmentNotificationsTemplate = function ({t, charityInvestmentNotificationsViewStore}){

    const {
        loaderStore,
        form
    } = charityInvestmentNotificationsViewStore;

    return(
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.INVESTMENT.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY')}</div>
                    <div className="list--preferences__dd">
                    <BaasicToggle value={true} field={form.$('notifyOnDailyChanges')} />
                    <NumericInputField showLabel={false} field={form.$('notifyOnDailyChangesAmount')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent> 
        </div>
    );


}

CharityInvestmentNotificationsTemplate.propTypes = {
    charityInvestmentNotificationsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityInvestmentNotificationsTemplate);