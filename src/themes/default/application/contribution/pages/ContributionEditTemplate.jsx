import React from 'react';
import PropTypes from 'prop-types';
import { BaasicModal } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/components';
import { ContributionBaseTemplate } from 'themes/application/contribution/components';

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
        donorName,
        achId,
        checkId,
        wireTransferId,
        stockAndMutualFundsId,
        chaseQuickPayId,
        openBankAccountModal,
        bankAccountDropdownStore,
        setPayerInfoUsingPrimaryDonorContactInfo
    } = contributionEditViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={contributionEditViewStore}>
                <Content loading={contentLoading} >
                    <ContributionBaseTemplate
                        form={form}
                        paymentTypeDropdownStore={paymentTypeDropdownStore}
                        donorName={donorName}
                        achId={achId}
                        checkId={checkId}
                        wireTransferId={wireTransferId}
                        stockAndMutualFundsId={stockAndMutualFundsId}
                        chaseQuickPayId={chaseQuickPayId}
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

ContributionEditTemplate.propTypes = {
    contributionEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionEditTemplate);
