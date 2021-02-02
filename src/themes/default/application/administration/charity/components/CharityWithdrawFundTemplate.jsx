import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumericInputField,
} from 'core/components';

function CharityWithdrawFundTemplate({ charityWithdrawFundViewStore, t }) {
    const {
        form,
        paymentTypeDropdownStore
    } = charityWithdrawFundViewStore;

    return (
        <EditFormContent form={form}>
            <div className="row">
                <div className="col col-sml-12 col-lrg-12">
                    <div className="u-mar--bottom--sml">
                        <div className="u-mar--bottom--med">
                            <h3 className="" style={{ display: 'inline' }}>
                                {t('CHARITY.WITHDRAW_FUND.TITLE')}
                            </h3>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <NumericInputField field={form.$('amount')} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                <BasicInput field={form.$('paymentNumber')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="u-mar--bottom--med u-push">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent>
    )
}

CharityWithdrawFundTemplate.propTypes = {
    charityWithdrawFundViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(CharityWithdrawFundTemplate);
