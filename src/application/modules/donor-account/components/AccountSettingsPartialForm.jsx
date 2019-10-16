import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicFieldCheckbox,
    NumericInputField,
    BasicInput
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class AccountSettingsPartialForm extends Component {
    render() {
        const { form, t, isPremiumAccount } = this.props;
        return (
            <React.Fragment>
                <h3 className="u-mar--bottom--med">{t('DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('lineOfCredit')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('certificateDeduction')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('certificateFee')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('contributionMinimumAdditional')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('contributionMinimumInitial')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('grantFee')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumericInputField field={form.$('grantMinimumAmount')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('securityPin')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicFieldCheckbox field={form.$('initialContribution')} />
                    </div>
                    {isPremiumAccount &&
                        <React.Fragment>
                            <div className="form__group col col-lrg-3">
                                <NumericInputField field={form.$('extraBookletPercentage')} />
                            </div>
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );
    }
}

AccountSettingsPartialForm.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func,
    isPremiumAccount: PropTypes.bool
};

export default defaultTemplate(AccountSettingsPartialForm);
