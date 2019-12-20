import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicModal,
    DatePickerField
} from 'core/components';
import { ContributionBaseTemplate } from 'themes/application/contribution/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/components';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';

const ContributionCreateTemplate = function ({ contributionCreateViewStore }) {
    const {
        contentLoading,
        form,
        paymentTypeDropdownStore,
        bankAccountDropdownStore,
        setPayerInfoUsingPrimaryDonorContactInfo,
        donorAccountId,
        openBankAccountModal,
        uploadTypes,
        uploadLoading,
        image,
        onAttachmentDrop,
        bankAccountModal,
        contributionSettingTypeDropdownStore
    } = contributionCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={contributionCreateViewStore}>
                <AuthPageHeader donorAccountId={donorAccountId} type={1} authorization='theDonorsFundAdministrationSection.read' />
                <Content loading={contentLoading} >
                    <ContributionBaseTemplate
                        form={form}
                        paymentTypeDropdownStore={paymentTypeDropdownStore}
                        openBankAccountModal={openBankAccountModal}
                        bankAccountDropdownStore={bankAccountDropdownStore}
                        setPayerInfoUsingPrimaryDonorContactInfo={setPayerInfoUsingPrimaryDonorContactInfo}
                    />
                    {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' && bankAccountDropdownStore.value && form.$('amount').value &&
                        <div className="card card--form card--primary card--med u-mar--bottom--med">
                            <h3 className="u-mar--bottom--med">Scheduled contribution (optional)</h3>
                            <div className="row">
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <BaasicFieldDropdown
                                        field={form.$('contributionSettingTypeId')}
                                        store={contributionSettingTypeDropdownStore} />
                                </div>
                                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                    <DatePickerField field={form.$('settingStartDate')} />
                                </div>
                            </div>
                        </div>}
                </Content>
            </ApplicationEditLayout >
            <BaasicModal modalParams={bankAccountModal}>
                <DonorAccountBankAccountEditForm
                    useDonorContactInformations={() => alert('infooo')}
                    uploadTypes={uploadTypes}
                    uploadLoading={uploadLoading}
                    image={image}
                    onAttachmentDrop={onAttachmentDrop}
                />
            </BaasicModal>
        </React.Fragment>
    )
};

const AuthPageHeader = withAuth(DonorAccountPageHeaderOverview);

ContributionCreateTemplate.propTypes = {
    contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionCreateTemplate);
