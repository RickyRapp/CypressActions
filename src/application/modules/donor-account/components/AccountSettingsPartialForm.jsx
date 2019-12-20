import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicFieldCheckbox,
    NumericInputField,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class AccountSettingsPartialForm extends Component {
    render() {
        const { form, t, isPremiumAccount, show, onChangeShow } = this.props;
        return (
            <React.Fragment>
                <h3 className="u-mar--bottom--med">{t('DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.TITLE')}
                    <BaasicButton
                        className="btn btn--icon"
                        icon={`u-icon u-icon--${show ? 'arrow-down' : 'arrow-right'} u-icon--sml`}
                        label={show ? t('DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.SHOW') : t('DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.HIDE')}
                        onlyIcon={true}
                        onClick={() => onChangeShow(!show)}
                    />
                </h3>
                {show &&
                    <div className="row">
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('lineOfCredit')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('certificateDeductionPercentage')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('certificateFeePercentage')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('contributionMinimumAdditionalAmount')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('contributionMinimumInitialAmount')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('grantFeePercentage')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <NumericInputField field={form.$('grantMinimumAmount')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicFieldCheckbox field={form.$('isInitialContributionDone')} />
                        </div>
                        {isPremiumAccount &&
                            <React.Fragment>
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('extraBookletPercentage')} />
                                </div>
                            </React.Fragment>
                        }
                    </div>}
            </React.Fragment>
        );
    }
}

AccountSettingsPartialForm.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func,
    isPremiumAccount: PropTypes.bool,
    show: PropTypes.bool,
    onChangeShow: PropTypes.func,
};

export default defaultTemplate(AccountSettingsPartialForm);
