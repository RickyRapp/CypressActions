import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    Date
} from 'core/components';
import {
    DonorAddressList,
    DonorEmailAddressList,
    DonorPhoneNumberList,
    DonorBankAccountList,
    DonorAutomaticContributionSetting,
    DonorGrantFees
} from 'application/donor/components';

function DonorAccountInformationTemplate({ donorAccountInformationViewStore, t, rootStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        item,
        id,
        accountManagerDropdownStore
    } = donorAccountInformationViewStore;

    const { permissionStore } = rootStore;

    return (
        <div className="card--primary card--med">
            <EditFormContent form={form}>
                <div className="row">
                    <div className="col col-sml-12 col-lrg-12">
                        <div className="u-mar--bottom--sml">
                            <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PROFILE')}</h3>
                            <div className="row">
                                <div className="form__group col col-sml-12 col-xlrg-2 col-xxlrg-1">
                                    <BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
                                </div>
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-3">
                                    <BasicInput field={form.$('firstName')} />
                                </div>
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-4">
                                    <BasicInput field={form.$('lastName')} />
                                </div>
                                <div className="form__group col col-sml-12 col-lrg-12 col-xxlrg-4">
                                    <div>
                                        <label className="form__group__label">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.DATE_OF_BIRTH')}</label>
                                        {item &&
                                            <span className={"input input--lrg input--text input--disabled"}>
                                                <Date format="full-date" value={item.dateOfBirth} />
                                            </span>}
                                    </div>
                                </div>
                                <div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-4">
                                    <BasicInput field={form.$('fundName')} />
                                </div>
                                <div className="form__group col col-sml-12 col-lrg-6 col-xxlrg-4">
                                    <NumberFormatInputField field={form.$('securityPin')} />
                                </div>
                                {permissionStore.hasPermission('theDonorsFundAdministrationSection.update') &&
                                    <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-4">
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

            <div className="row row__align--end">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAddressList donorId={id} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorEmailAddressList donorId={id} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorPhoneNumberList donorId={id} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorBankAccountList donorId={id} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAutomaticContributionSetting donorId={id} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorGrantFees donorId={id} />
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
