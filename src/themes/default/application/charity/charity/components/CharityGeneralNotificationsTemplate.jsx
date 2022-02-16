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

const CharityGeneralNotificationsTemplate = function ({t, charityGeneralNotificationsViewStore}){

    const {
        loaderStore,
        form
    } = charityGeneralNotificationsViewStore;

    return(
        <div>
            
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.NAME')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT')}</div>
                    <div className="list--preferences__dd">
                    <BaasicToggle value={true} field={form.$('notifyDonorsApprovedGrant')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>

        </div>
    );


}

CharityGeneralNotificationsTemplate.propTypes = {
    charityGeneralNotificationsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityGeneralNotificationsTemplate);