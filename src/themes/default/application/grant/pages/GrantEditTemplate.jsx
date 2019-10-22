import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    DatePickerField,
    NumericInputField,
    BasicInput,
    BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { GrantPurposeTypeForm } from 'themes/application/grant/components';
import _ from 'lodash';

const GrantEditTemplate = function ({ grantEditViewStore }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantScheduleTypeDropdownStore,
        charityDropdownStore,
        donorName,
        donorAccount,
        monthlyGrantId,
        annualGrantId,
        onChangeAmount,
        amountWithFee,
        onChangeEndDate,
        onChangeNumberOfPayments,
        onChangeNoEndDate
    } = grantEditViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={grantEditViewStore}>
                <Content loading={contentLoading} >
                    {donorName && <h3 className="u-mar--bottom--med">{donorName}</h3>}
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">General Data</h3>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('charity')} store={charityDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputField field={form.$('amount')} onChange={onChangeAmount} />
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
                                <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name-and-address' && `${donorAccount.fundName} - ${_.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine1}`}
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

GrantEditTemplate.propTypes = {
    grantEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantEditTemplate);
