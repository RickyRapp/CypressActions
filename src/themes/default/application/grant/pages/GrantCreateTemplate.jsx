import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    DatePickerField,
    NumericInputField,
    BasicInput,
    BasicFieldCheckbox,
    Scanner
} from 'core/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { GrantPurposeTypeForm } from 'themes/application/grant/components';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';
import { addressFormatter } from 'core/utils';
import _ from 'lodash';

const GrantCreateTemplate = function ({ grantCreateViewStore }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantScheduleTypeDropdownStore,
        charityDropdownStore,
        donorAccountId,
        donorAccount,
        monthlyGrantId,
        annualGrantId,
        onBlurAmount,
        amountWithFee,
        onChangeEndDate,
        onChangeNumberOfPayments,
        onChangeNoEndDate,
        onScanned
    } = grantCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={grantCreateViewStore}>
                <AuthPageHeader donorAccountId={donorAccountId} type={2} authorization='theDonorsFundAdministrationSection.read' />
                <Content loading={contentLoading} >
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">General Data</h3>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                                <Scanner onBarcodeDetected={onScanned} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <DatePickerField field={form.$('startFutureDate')} />
                            </div>
                            {form.$('grantScheduleTypeId').value && form.$('startFutureDate').value &&
                                <React.Fragment>
                                    {form.$('startFutureDate').value > new Date() &&
                                        <div className="form__group col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                                            <BasicInput field={form.$('name')} />
                                        </div>}
                                    {(form.$('grantScheduleTypeId').value === monthlyGrantId || form.$('grantScheduleTypeId').value === annualGrantId) &&
                                        <React.Fragment>
                                            <div className="form__group col col-sml-12 col-lrg-1 u-mar--bottom--sml">
                                                <NumericInputField field={form.$('numberOfPayments')} onChange={onChangeNumberOfPayments} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                                                <DatePickerField field={form.$('endDate')} onChange={onChangeEndDate} />
                                            </div>
                                            <div className="form__group col col-sml-12 col-lrg-1 u-mar--bottom--sml">
                                                <BasicFieldCheckbox field={form.$('noEndDate')} onChange={onChangeNoEndDate} />
                                            </div>
                                        </React.Fragment>}
                                </React.Fragment>}
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputField field={form.$('amount')} onBlur={onBlurAmount} />
                            </div>
                            <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                {amountWithFee &&
                                    <React.Fragment><label className="form__group__label">Total amount with fee</label>
                                        <span className={"input input--med input--text input--disabled"}>{amountWithFee}</span>
                                    </React.Fragment>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                            </div>
                            {grantAcknowledgmentTypeDropdownStore.value &&
                                <div className="form__group col col-sml-12 col-lrg-3 u-mar--top--med">
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'name-fund-name-and-address' &&
                                        `${donorAccount.donorName} - ${donorAccount.fundName} - ${addressFormatter.format(_.find(donorAccount.donorAccountAddresses, { isPrimary: true }), 'full')}`}
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name-and-address' &&
                                        `${donorAccount.fundName} - ${addressFormatter.format(_.find(donorAccount.donorAccountAddresses, { isPrimary: true }), 'full')}`}
                                    {grantAcknowledgmentTypeDropdownStore.value.abrv === 'fund-name' && donorAccount.fundName}
                                </div>}
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
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

GrantCreateTemplate.propTypes = {
    grantCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantCreateTemplate);
