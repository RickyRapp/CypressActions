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
import moment from 'moment';
import { addressFormatter } from 'core/utils';

const ScheduledGrantEditTemplate = function ({ scheduledGrantEditViewStore }) {
    const {
        contentLoading,
        form,
        grantPurposeTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantScheduleTypeDropdownStore,
        charityDropdownStore,
        donorAccount,
        donorName,
        onChangeAmount,
        amountWithFee,
        onChangeEndDate,
        onChangeNumberOfPayments,
        onChangeNoEndDate
    } = scheduledGrantEditViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={scheduledGrantEditViewStore}>
                <Content loading={contentLoading} >
                    {donorName && <h3 className="u-mar--bottom--med">{donorName}</h3>}
                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                        <h3 className="u-mar--bottom--med">General Data</h3>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantScheduleTypeId')} store={grantScheduleTypeDropdownStore} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
                                <DatePickerField field={form.$('startFutureDate')} />
                            </div>
                            {grantScheduleTypeDropdownStore.value && form.$('startFutureDate').value &&
                                <React.Fragment>
                                    {moment(form.$('startFutureDate').value).isAfter(moment()) &&
                                        <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                                            <BasicInput field={form.$('name')} />
                                        </div>}
                                    {grantScheduleTypeDropdownStore.value &&
                                        (grantScheduleTypeDropdownStore.value.abrv === 'monthly' || grantScheduleTypeDropdownStore.value.abrv === 'annual') &&
                                        <React.Fragment>
                                            <div className="form__group col col-sml-6 col-lrg-1 u-mar--bottom--sml">
                                                <NumericInputField field={form.$('numberOfPayments')} onChange={onChangeNumberOfPayments} />
                                            </div>
                                            <div className="form__group col col-sml-6 col-lrg-2 u-mar--bottom--sml">
                                                <DatePickerField field={form.$('endDate')} onChange={onChangeEndDate} />
                                            </div>
                                            <div className="form__group col col-sml-6 col-lrg-1 u-mar--bottom--sml">
                                                <BasicFieldCheckbox field={form.$('noEndDate')} onChange={onChangeNoEndDate} />
                                            </div>
                                        </React.Fragment>}
                                </React.Fragment>}
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
                            {donorAccount && grantAcknowledgmentTypeDropdownStore.value &&
                                <div className="form__group col col-sml-6 col-lrg-3 u-mar--bottom--sml">
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

ScheduledGrantEditTemplate.propTypes = {
    scheduledGrantEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ScheduledGrantEditTemplate);
