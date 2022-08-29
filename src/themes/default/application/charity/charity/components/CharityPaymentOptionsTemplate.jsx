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

const CharityPaymentOptionsTemplate = function ({ t, charityPaymentOptionsViewStore }) {
    const {
        loaderStore,
        form,
        changeManuallWithdrawSetting
    } = charityPaymentOptionsViewStore

    return (
        <div>
            <EditFormContent
                form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
                formClassName={" "}
            >
                <h3 className="list--preferences__title">{t('CHARITY.PAYMENT_OPTIONS.TITLE')}</h3>

                <div className="row u-mar--bottom--med">
                    <div className="col col-sml-12 col-lrg-10">{t('CHARITY.PAYMENT_OPTIONS.FIELDS.KEEP_UNTIL_MANUALLY')}</div>
                    <div className="col col-sml-12 col-lrg-2">
                        <BasicFieldCheckbox toggleClass="--toggle" showLabel={false} field={form.$('keepFundsUntilManuallyDistributedIsEnabled')} />
                    </div>
                </div>

                <div className="row">
                    <div className="col col-sml-12 col-lrg-6 col-xlrg-12 col-xxlrg-6">
                        <div className="form__group">
                            <NumericInputField field={form.$('accumulatedAmountExceeding')} />
                        </div>
                    </div>
                    <div className="col col-sml-12 col-lrg-6 col-xlrg-12 col-xxlrg-6">
                        <div className="form__group">
                            <NumericInputField field={form.$('withdrawAmount')} />
                        </div>
                        <div className="form__group">
                            <BasicFieldCheckbox
                                field={form.$('keepFundsUntilAccumulatedAmountIsEnabled')}
                                onChange={e => {
                                    changeManuallWithdrawSetting(e.target.checked);
                                }}
                            />
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