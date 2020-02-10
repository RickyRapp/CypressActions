import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    NumericInputField
} from 'core/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { GrantPurposeTypeForm } from 'themes/application/grant/components';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';
import { addressFormatter } from 'core/utils';
import _ from 'lodash';

const GrantEditTemplate = function ({ grantEditViewStore }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        charityDropdownStore,
        donorAccountId,
        donorAccount,
        onBlurAmount,
        amountWithFee
    } = grantEditViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={grantEditViewStore}>
                <AuthPageHeader donorAccountId={donorAccountId} type={2} authorization='theDonorsFundAdministrationSection.read' />
                <Content loading={contentLoading} >
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">General Data</h3>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputField field={form.$('amount')} onBlur={onBlurAmount} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                {amountWithFee &&
                                    <React.Fragment><label className="form__group__label">Total amount with fee</label>
                                        <span className={"input input--med input--text input--disabled"}>{amountWithFee}</span>
                                    </React.Fragment>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                            </div>
                            {grantAcknowledgmentTypeDropdownStore.value &&
                                <div className="form__group col col-sml-6 col-lrg-3 u-mar--top--med">
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'name-fund-name-and-address' &&
                                        `${donorAccount.donorName} - ${donorAccount.fundName} - ${addressFormatter.format(_.find(donorAccount.donorAccountAddresses, { isPrimary: true }), 'full')}`}
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name-and-address' &&
                                        `${donorAccount.fundName} - ${addressFormatter.format(_.find(donorAccount.donorAccountAddresses, { isPrimary: true }), 'full')}`}
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name' && donorAccount.fundName}
                                </div>}
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                {grantPurposeTypeDropdownStore.value &&
                                    <GrantPurposeTypeForm form={form} store={grantPurposeTypeDropdownStore} />}
                            </div>
                        </div>
                    </div>
                </Content>
            </ApplicationEditLayout >
        </React.Fragment>
    )
};

const AuthPageHeader = withAuth(DonorAccountPageHeaderOverview);

GrantEditTemplate.propTypes = {
    grantEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantEditTemplate);
