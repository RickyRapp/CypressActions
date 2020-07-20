import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    BasicInput,
    BaasicFieldDropdown,
    BaasicDropzone,
    NumberFormatInputField,
    BasicFieldCheckbox,
    NumericInputField,
    DatePickerField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const CharityCreateTemplate = function ({ charityCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        onAttachmentDrop,
        uploadLoading,
        uploadTypes,
        image,
        onBlurUsername,
        taxIdExists,
        onChangeIsOnlineAccountEnabled,
        bankAccountShow,
        onChangeBankAccountShow,
        charityAccountTypeDropdownStore,
        subscriptionTypeDropdownStore
    } = charityCreateViewStore;

    return (
        <ApplicationEditLayout store={charityCreateViewStore}>
            <Content loading={contentLoading} >
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">General Data</h3>
                    <div className="row">
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('name')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInputField
                                field={form.$('taxId')}
                                onChange={taxIdExists}
                            />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('dba')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            {charityTypeDropdownStore &&
                                <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />}
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            {charityStatusDropdownStore &&
                                <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />}
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.addressLine1')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.addressLine2')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.city')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.state')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.zipCode')} />
                        </div>
                    </div>
                </div>
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">Contact info</h3>
                    <div className="row">
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('contactInformation.name')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('contactInformation.email')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInputField field={form.$('contactInformation.number')} />
                        </div>
                    </div>
                </div>
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">Bank account
                    <BaasicButton
                            className="btn btn--icon"
                            icon={`u-icon u-icon--${bankAccountShow ? 'arrow-down' : 'arrow-right'} u-icon--sml`}
                            label={bankAccountShow ? t('CHARITY.CREATE.BANK_ACCOUNT_FORM_FIELDS.HIDE') : t('DONOR.CREATE.BANK_ACCOUNT_FORM_FIELDS.SHOW')}
                            onlyIcon={true}
                            onClick={() => onChangeBankAccountShow(!bankAccountShow)}
                        />
                    </h3>
                    {bankAccountShow &&
                        <React.Fragment>
                            <div className="row">
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.name')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountNumber')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <NumberFormatInputField field={form.$('bankAccount.routingNumber')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountHolder.addressLine1')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountHolder.addressLine2')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountHolder.city')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountHolder.state')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountHolder.zipCode')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BasicInput field={form.$('bankAccount.accountHolder.email')} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <NumberFormatInputField field={form.$('bankAccount.accountHolder.number')} />
                                </div>
                                <div className="col col-sml-12 col-lrg-4">
                                    <div className="card card--form card--primary card--med u-mar--bottom--med">
                                        <label className="form__group__label" >Bank account image</label>

                                        <BaasicDropzone
                                            acceptFiles={uploadTypes}
                                            loading={uploadLoading}
                                            onFilesDrop={onAttachmentDrop}
                                            multiple={false}
                                        />

                                        {image && imgPreview({ image })}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>}
                </div>
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">
                        Online account
                        <BasicFieldCheckbox
                            field={form.$('isOnlineAccountEnabled')}
                            onChange={onChangeIsOnlineAccountEnabled}
                        />
                    </h3>
                    {form.$('isOnlineAccountEnabled').value === true &&
                        <React.Fragment>
                            <div className="row">
                                <div className="form__group col-lrg-3 u-mar--bottom--sml">
                                    <BaasicFieldDropdown
                                        field={form.$('charityAccountTypeId')}
                                        store={charityAccountTypeDropdownStore}
                                    />
                                </div>
                                <div className="form__group col-lrg-3 u-mar--bottom--sml">
                                    <BaasicFieldDropdown
                                        field={form.$('subscriptionTypeId')}
                                        store={subscriptionTypeDropdownStore}
                                    />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <DatePickerField field={form.$('subscriptionNextDate')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <NumericInputField field={form.$('subscriptionAmount')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <BasicInput field={form.$('coreUser.username')} onBlur={onBlurUsername} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <BasicInput field={form.$('coreUser.coreMembership.password')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <BasicInput field={form.$('coreUser.coreMembership.confirmPassword')} />
                                </div>
                            </div>
                        </React.Fragment>}
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

CharityCreateTemplate.propTypes = {
    charityCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginTop: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function imgPreview({ image }) {
    return (
        <div style={thumb} >
            <div style={thumbInner}>
                <img
                    src={image}
                    style={img}
                />
            </div>
        </div>
    )
}

imgPreview.propTypes = {
    image: PropTypes.any
};

export default defaultTemplate(CharityCreateTemplate);
