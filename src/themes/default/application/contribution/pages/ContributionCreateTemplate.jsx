import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicModal,
    DatePickerField
} from 'core/components';
import { ContributionBaseTemplate } from 'themes/application/contribution/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/components';

const ContributionCreateTemplate = function ({ contributionCreateViewStore }) {
    const {
        contentLoading,
        form,
        paymentTypeDropdownStore,
        bankAccountDropdownStore,
        setPayerInfoUsingPrimaryDonorContactInfo,
        donorName,
        openBankAccountModal,
        uploadTypes,
        uploadLoading,
        image,
        onAttachmentDrop,
        bankAccountModal,
        contributionSettingTypeDropdownStore,
        achId,
        wireTransferId,
        checkId,
        chaseQuickPayId,
        stockAndMutualFundsId
    } = contributionCreateViewStore;

    return (
        <React.Fragment>
            <ApplicationEditLayout store={contributionCreateViewStore}>
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
                    {form.$('paymentTypeId').value === achId
                        && bankAccountDropdownStore.value && form.$('amount').value &&
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

ContributionCreateTemplate.propTypes = {
    contributionCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ContributionCreateTemplate);
