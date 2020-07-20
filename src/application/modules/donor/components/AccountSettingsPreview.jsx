import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FormatterResolver
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class AccountSettingsPreview extends Component {
    render() {
        const { item,
            isPrivateAccount,
            t
        } = this.props;

        return (
            <React.Fragment>
                <h3 className="u-mar--bottom--med">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.LINE_OF_CREDIT_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ lineOfCredit: item.lineOfCredit }}
                                field='lineOfCredit'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_DEDUCTION_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ certificateDeductionPercentage: item.certificateDeductionPercentage }}
                                field='certificateDeductionPercentage'
                                format={{ type: 'percentage' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_FEE_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ certificateFeePercentage: item.certificateFeePercentage }}
                                field='certificateFeePercentage'
                                format={{ type: 'percentage' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_ADDITIONAL_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ contributionMinimumAdditionalAmount: item.contributionMinimumAdditionalAmount }}
                                field='contributionMinimumAdditionalAmount'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_INITIAL_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ contributionMinimumInitialAmount: item.contributionMinimumInitialAmount }}
                                field='contributionMinimumInitialAmount'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.GRANT_FEE_LABEL_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ grantFeePercentage: item.grantFeePercentage }}
                                field='grantFeePercentage'
                                format={{ type: 'percentage' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.GRANT_MINIMUM_AMOUNT_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ grantMinimumAmount: item.grantMinimumAmount }}
                                field='grantMinimumAmount'
                                format={{ type: 'currency' }}
                            />}
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                        <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.INITIAL_CONTRIBUTION_LABEL')}</label>
                        {item &&
                            <FormatterResolver
                                item={{ isInitialContributionDone: item.isInitialContributionDone }}
                                field='isInitialContributionDone'
                                format={{ type: 'boolean', value: 'yes-no' }}
                            />}
                    </div>
                    {isPrivateAccount &&
                        <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                            <label className="form__group__label">{t('DONOR.ACCOUNT_SETTINGS_FIELDS.EXTRA_BOOKLET_PERCENTAGE_LABEL')}</label>
                            {item &&
                                <FormatterResolver
                                    item={{ extraBookletPercentage: item.extraBookletPercentage }}
                                    field='extraBookletPercentage'
                                    format={{ type: 'percentage' }}
                                />}
                        </div>}
                </div>
            </React.Fragment>
        );
    }
}

AccountSettingsPreview.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func,
    isPrivateAccount: PropTypes.bool,
    show: PropTypes.bool,
    onChangeShow: PropTypes.func,
    item: PropTypes.object
};

export default defaultTemplate(AccountSettingsPreview);
