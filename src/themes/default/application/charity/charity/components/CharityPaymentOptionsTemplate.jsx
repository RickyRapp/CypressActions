import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    NumericInputField,
    BasicFieldCheckbox
} from 'core/components'


const CharityPaymentOptionsTemplate = function ({t, charityPaymentOptionsViewStore}){

    const {
        loaderStore,
        form,
        changeManuallWithdrawSetting
    } = charityPaymentOptionsViewStore

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="list--preferences__title">{t('CHARITY.PAYMENT_OPTIONS.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label"> {t('CHARITY.PAYMENT_OPTIONS.FIELDS.KEEP_UNTIL_MANUALLY')}  </div>
                    <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('keepFundsUntilManuallyDistributedIsEnabled')} />
                </div>

                <div className="list--preferences">
                    <div className="list--preferences__label">
                        <div className="form__group col col-sml-5 col-lrg-5">
                            <NumericInputField field={form.$('accumulatedAmountExceeding')} />
                        </div>
                    </div>
                    <div className="list--preferences__dd">
                        <div className="row u-mar--bottom--sml">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <NumericInputField field={form.$('withdrawAmount')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12">
                            <div className="form__group col col-sml-12 col-lrg-12">
                                <BasicFieldCheckbox 
                                    field={form.$('keepFundsUntilAccumulatedAmountIsEnabled')} 
                                    onChange={e => {
                                        changeManuallWithdrawSetting(e.target.checked);
                                    }}
                                />
                            </div>
                            </div>
                        </div>
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