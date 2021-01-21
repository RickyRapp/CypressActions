import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    Date,
    BaasicButton
} from 'core/components';
import {
    DonorAddressList,
    DonorEmailAddressList,
    DonorPhoneNumberList,
    DonorBankAccountList,
    DonorAutomaticContributionSetting,
    DonorGrantFees
} from 'application/donor/donor/components';

function DonorAccountInformationTemplate({ donorAccountInformationViewStore, t }) {
    const {
        form,
        prefixTypeDropdownStore,
        item,
        isEditEnabled,
        onEnableEditClick
    } = donorAccountInformationViewStore;

    return (
        <div className="card--primary card--med">
            <EditFormContent form={form}>
                <div className="row u-mar--bottom--sml">
                    <div className="col col-sml-12 col-lrg-3">
                        <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PROFILE')}</h3>
                    </div>
                    {isEditEnabled ?
                        <React.Fragment>
                            <div className="col col-sml-12 col-lrg-9">
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
                                </div>
                            </div>

                            <div className="u-mar--bottom--med type--right">
                                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                                <BaasicButton
                                    type='button'
                                    className="btn btn--med btn--med--wide btn--tertiary"
                                    onClick={onEnableEditClick}
                                    label='Cancel'
                                />
                            </div>
                        </React.Fragment>
                        :
                        <div className="col col-sml-12 col-lrg-9" title="Click to edit" onClick={onEnableEditClick}>
                            <div className="row">
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-4">
                                    Name:
                                    <strong>{item ? `${item.prefixType ? item.prefixType.name : ''} ${item.firstName} ${item.lastName}` : ''}</strong>
                                </div>
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-4">
                                    Date Of Birth:
                                    <strong>{item && <Date format="full-date" value={item.dateOfBirth} />}</strong>
                                </div>
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-4">
                                    Fund Name:
                                    <strong>{item && item.fundName}</strong>
                                </div>
                                <div className="form__group col col-sml-12 col-xlrg-5 col-xxlrg-4">
                                    Security pin:
                                    <strong>{item && item.securityPin}</strong>
                                </div>
                            </div>
                        </div>}
                </div>
            </EditFormContent>

            <div className="row row__align--end">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                    <DonorAddressList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                    <DonorEmailAddressList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                    <DonorPhoneNumberList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                    <DonorBankAccountList />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                    <DonorAutomaticContributionSetting />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--xlrg">
                    <DonorGrantFees />
                </div>
            </div>
        </div>

    )
}

DonorAccountInformationTemplate.propTypes = {
    donorAccountInformationViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountInformationTemplate);
