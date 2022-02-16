import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BaasicToggle,
    BasicInput
} from 'core/components'


const CharityPaymentOptionsTemplate = function ({t, charityPaymentOptionsViewStore}){

    const {
        loaderStore,
        form
    } = charityPaymentOptionsViewStore

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.PAYMENT_OPTIONS.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown"> {t('CHARITY.PAYMENT_OPTIONS.FIELDS.KEEP_UNTIL_MANUALLY')}  </div>
                    <div className="list--preferences__dd">
                        <BaasicToggle value={true} field={form.$('keepFundsUntilManuallyDistributed')} />
                    </div>
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">{t('CHARITY.PAYMENT_OPTIONS.FIELDS.DISTRIBUTE_WHEN_ACCUMULATED')}</div>
                    <div className="list--preferences__dd">
                    <BaasicToggle value={true} field={form.$('keepFundsUntilAccumulatedAmount')} />
                    <BasicInput showLabel={false} field={form.$('AccumulatedAmount')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

CharityPaymentOptionsTemplate.propTypes = {
    charityPaymentOptionsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityPaymentOptionsTemplate);