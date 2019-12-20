import React from 'react';
import PropTypes from 'prop-types';
import { BaasicModal } from 'core/components';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/components';
import { ContributionBaseTemplate } from 'themes/application/contribution/components';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';

const ContributionEditTemplate = function ({ contributionEditViewStore }) {
    const {
        contentLoading,
        uploadTypes,
        uploadLoading,
        image,
        onAttachmentDrop,
        bankAccountModal,
        form,
        paymentTypeDropdownStore,
        donorAccountId,
        openBankAccountModal,
        bankAccountDropdownStore,
        setPayerInfoUsingPrimaryDonorContactInfo
    } = contributionEditViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={contributionEditViewStore}>
                <AuthPageHeader donorAccountId={donorAccountId} type={1} authorization='theDonorsFundAdministrationSection.read' />
                <Content loading={contentLoading} >
                    <ContributionBaseTemplate
                        form={form}
                        paymentTypeDropdownStore={paymentTypeDropdownStore}
                        openBankAccountModal={openBankAccountModal}
                        bankAccountDropdownStore={bankAccountDropdownStore}
                        setPayerInfoUsingPrimaryDonorContactInfo={setPayerInfoUsingPrimaryDonorContactInfo}
                    />
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

ContributionEditTemplate.propTypes = {
    contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
