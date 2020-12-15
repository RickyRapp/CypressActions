import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFieldDropdown,
    NumberFormatInputField,
    BasicFieldCheckbox,
    BaasicFieldDropzone
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const CharityCreateTemplate = function ({ charityCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        imageUploadStore
    } = charityCreateViewStore;

    return (
        <ApplicationEditLayout store={charityCreateViewStore}>
            <Content loading={contentLoading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CHARITY.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('name')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInputField field={form.$('taxId')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('dba')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressAddressLine1')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressAddressLine2')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressCity')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressState')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('addressZipCode')} />
                        </div>
                    </div>
                </div>
                <div className="card--primary card--med u-mar--bottom--med">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('CHARITY.CREATE.CONATCT_INFO_TITLE')}</h3>
                    <div className="row">
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('contactInformationName')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('contactInformationEmail')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInputField field={form.$('contactInformationNumber')} />
                        </div>
                    </div>
                </div>
                <div className="card--primary card--med u-mar--bottom--med">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">
                        <BasicFieldCheckbox field={form.$('isNewBankAccount')} />
                    </h3>
                    <div className="row">
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountName')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountNumber')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInputField field={form.$('bankAccountRoutingNumber')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountHolderAddressLine1')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountHolderAddressLine2')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountHolderCity')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountHolderState')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountHolderZipCode')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('bankAccountAccountHolderEmail')} />
                        </div>
                        <div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInputField field={form.$('bankAccountAccountHolderNumber')} />
                        </div>

                        <div className="col col-sml-12 col-lrg-12">
                            <BaasicFieldDropzone field={form.$('coreMediaVaultEntryId')} store={imageUploadStore} />
                        </div>
                    </div>
                </div>
                <div className="card--primary card--med u-mar--bottom--med">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">
                        <BasicFieldCheckbox field={form.$('isNewOnlineAccount')} />
                    </h3>
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-4">
                            <BasicInput field={form.$('username')} />
                        </div>
                        <div className="col col-sml-12 col-lrg-4">
                            <BasicInput field={form.$('password')} />
                        </div>
                        <div className="col col-sml-12 col-lrg-4">
                            <BasicInput field={form.$('confirmPassword')} />
                        </div>
                    </div>
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

CharityCreateTemplate.propTypes = {
    charityCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default defaultTemplate(CharityCreateTemplate);
