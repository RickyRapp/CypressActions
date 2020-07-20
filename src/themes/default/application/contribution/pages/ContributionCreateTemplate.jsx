import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicModal,
    DatePickerField,
    NumericInputField
} from 'core/components';
import {
    AchTemplate,
    CheckTemplate,
    WireTransferTemplate,
    StockAndMutualFundsTemplate,
    ChaseQuickPayTemplate,
    PayerInformationTemplate
} from 'themes/application/contribution/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { DonorBankAccountEditForm } from 'application/donor/components';
import { DonorPageHeaderOverview } from 'application/donor/components';

const ContributionCreateTemplate = function ({ contributionCreateViewStore }) {
    const {
        contentLoading,
        form,
        paymentTypeDropdownStore,
        bankAccountDropdownStore,
        setPayerInfoUsingPrimaryDonorContactInfo,
        donorId,
        openBankAccountModal,
        uploadLoading,
        image,
        onAttachmentDrop,
        bankAccountModal,
        contributionSettingTypeDropdownStore,
        checkBank,
        useDonorContactInformations
    } = contributionCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={contributionCreateViewStore}>
                <AuthPageHeader donorId={donorId} type={1} authorization='theDonorsFundAdministrationSection.read' />
                <Content loading={contentLoading} >
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-6">
                            <div className="card card--form card--primary card--med u-mar--bottom--med">
                                <h3 className="u-mar--bottom--med">General Data</h3>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <NumericInputField field={form.$('amount')} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                                    </div>
                                </div>

                                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' &&
                                    <React.Fragment>

                                        <AchTemplate
                                            field={form.$('bankAccountId')}
                                            bankAccountDropdownStore={bankAccountDropdownStore}
                                            openBankAccountModal={openBankAccountModal} />

                                        <div className="row">
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <BaasicFieldDropdown
                                                    field={form.$('contributionSettingTypeId')}
                                                    store={contributionSettingTypeDropdownStore} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                                <DatePickerField field={form.$('settingStartDate')} />
                                            </div>
                                        </div>

                                    </React.Fragment>
                                }

                                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'wire-transfer' &&
                                    <WireTransferTemplate
                                        field={form.$('bankAccountId')}
                                        bankAccountDropdownStore={bankAccountDropdownStore} />}

                                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' &&
                                    <CheckTemplate field={form.$('checkNumber')} />}

                                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'stock-and-mutual-funds' &&
                                    <StockAndMutualFundsTemplate form={form} />}

                                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'chase-quick-pay' &&
                                    <ChaseQuickPayTemplate form={form} />}
                            </div>
                        </div>
                        <div className="col col-sml-12 col-lrg-6">
                            <div className="card card--form card--primary card--med u-mar--bottom--med">
                                <PayerInformationTemplate
                                    form={form}
                                    setPayerInfoUsingPrimaryDonorContactInfo={setPayerInfoUsingPrimaryDonorContactInfo}
                                    hideButton={paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach'}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </ApplicationEditLayout >
            <BaasicModal modalParams={bankAccountModal}>
                <DonorBankAccountEditForm
                    useDonorContactInformations={useDonorContactInformations}
                    uploadLoading={uploadLoading}
                    image={image}
                    onAttachmentDrop={onAttachmentDrop}
                    onBlurRoutingNumber={checkBank}
                />
            </BaasicModal>
        </React.Fragment>
    )
};

const AuthPageHeader = withAuth(DonorPageHeaderOverview);

ContributionCreateTemplate.propTypes = {
    contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionCreateTemplate);
