import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    NumericInputField
} from 'core/components';
import {
    DonorAddressList,
    DonorEmailAddressList,
    DonorPhoneNumberList,
    DonorBankAccountList,
    DonorAutomaticContributionSetting,
    DonorGrantFees,
    DonorAccountSetting
} from 'application/administration/donor/components';

function DonorAccountInformationTemplate({ donorAccountInformationViewStore, t }) {
    const {
        form,
        prefixTypeDropdownStore,
        item,
        accountManagerDropdownStore,
        monthDropdownStore,

    } = donorAccountInformationViewStore;

    window.scrollTo(0, 0);

    return (
        <div className="card--primary card--med u-mar--bottom--sml">
            <EditFormContent form={form}>
                <div className="row row--form">
                    <div className="col col-sml-12 col-lrg-12">
                        <div className="u-mar--bottom--sml">
                            <h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PROFILE')}</h3>
                            <div className="row row--form">
                                <div className="form__group col col-sml-12 col-xlrg-2 col-xxlrg-2">
                                    <BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
                                </div>
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-5">
                                    <BasicInput field={form.$('firstName')} />
                                </div>
                                <div className="col col-sml-12 col-xlrg-5 col-xxlrg-5">
                                    <BasicInput field={form.$('lastName')} />
                                </div>
                                <div className="col col-sml-12 col-lrg-12 u-mar--top--sml u-mar--bottom--sml">
                                    <label className="form__group__label">Date of Birth</label>
                                </div>
                                <div className="form__group col col-sml-12 col-med-4 col-xxlrg-3">
                                    <BaasicFieldDropdown store={monthDropdownStore} field={form.$('month')} />
                                </div>
                                <div className="form__group col col-sml-12 col-med-4 col-xxlrg-2">
                                    <NumericInputField field={form.$('day')} />
                                </div>
                                <div className="form__group col col-sml-12 col-med-4 col-xxlrg-2">
                                    <NumericInputField
                                        field={form.$('year')}
                                        formatOptions={{
                                            style: 'decimal',
                                            useGrouping: false
                                        }} />
                                </div>
                                <div className="col col-sml-12 col-xxlrg-2"></div>
                                <div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-5">
                                    <BasicInput field={form.$('fundName')} />
                                </div>
                                <div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-2">
                                    <NumberFormatInputField field={form.$('securityPin')} />
                                </div>
                                {item && item.accountType.abrv === 'private' &&
                                    <div className="col col-sml-12 col-xlrg-5 col-xxlrg-4">
                                        <BaasicFieldDropdown
                                            field={form.$('accountManagerId')}
                                            store={accountManagerDropdownStore} />
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="u-mar--bottom--med type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>

            <DonorAccountSetting />

            <div className="row row__align--end">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAddressList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorEmailAddressList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorPhoneNumberList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorBankAccountList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAutomaticContributionSetting />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorGrantFees />
                </div>
            </div>
        </div>

    )
}

DonorAccountInformationTemplate.propTypes = {
    donorAccountInformationViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    rootStore: PropTypes.object.isRequired
};

export default defaultTemplate(DonorAccountInformationTemplate);
