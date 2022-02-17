import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput,
    BasicFieldCheckbox
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
                    <div className="list--preferences__label">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.EMAIL_TO_NOTIFY')}</div>
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicInput showLabel={false} field={form.$('emailToNotifyPayments')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">{t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_ACH_PAYMENT')}</div>
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox field={form.$('isNotifyAchPaymentsEnabled')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label "> {t('CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT')}  </div>
                    <div className="list--preferences__dd">
                        <BasicFieldCheckbox field={form.$('isNotifyCheckPaymentsEnabled')} />
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