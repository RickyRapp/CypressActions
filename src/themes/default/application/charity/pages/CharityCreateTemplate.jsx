import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicDropzone
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const CharityCreateTemplate = function ({ charityCreateViewStore }) {
    const {
        contentLoading,
        form,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        onAttachmentDrop,
        uploadLoading,
        uploadTypes,
        image
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
                            <BasicInput field={form.$('taxId')} />
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
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('emailAddress.email')} />
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
                            <BasicInput field={form.$('contactInformation.emailAddress.email')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('contactInformation.phoneNumber.number')} />
                        </div>
                    </div>
                </div>
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">Bank account</h3>
                    <div className="content__header">
                        <div className="row">
                            <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                <BasicInput field={form.$('bankAccount.name')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                <BasicInput field={form.$('bankAccount.accountNumber')} />
                            </div>
                            <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                <BasicInput field={form.$('bankAccount.routingNumber')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.address.addressLine1')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.address.addressLine2')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.address.city')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.address.state')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.address.zipCode')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.emailAddress.email')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccount.accountHolder.phoneNumber.number')} />
                        </div>
                        <div className="col col-sml-12 col-lrg-4">
                            <div className="card card--form card--primary card--med u-mar--bottom--med">
                                <label className="form__group__label" >Bank account image</label>

                                <div className="buildings__item__img" style={{ backgroundImage: `url(${image ? image : require('themes/assets/img/building-default.svg')})`, }}></div>

                                <BaasicDropzone
                                    acceptFiles={uploadTypes}
                                    loading={uploadLoading}
                                    onFilesDrop={onAttachmentDrop}
                                    multiple={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

CharityCreateTemplate.propTypes = {
    charityCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityCreateTemplate);
