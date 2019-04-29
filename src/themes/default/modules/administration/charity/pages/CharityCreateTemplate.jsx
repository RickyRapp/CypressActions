import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldDropdown, BasicFormatFieldInput, BasicCheckBox, BaasicFieldAsyncDropdown } from 'core/components';
import { ContactInformationTemplate } from 'themes/modules/common/charity/components';
import { AddressTemplate } from 'themes/modules/common/address/components';
import { EditFormLayout } from 'core/layouts';
import { CreateLoginTemplate } from 'themes/modules/common/donor-account/components';
import { CreateBankAccountTemplate } from 'themes/modules/common/bank-account/components';
import _ from 'lodash';

function CharityCreateTemplate({ charityCreateViewStore }) {
    const {
        form,
        loaderStore: { loading },
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        suggestedByIdDropdownStore
    } = charityCreateViewStore;

    return (
        <EditFormLayout form={form} isEdit={false} loading={loading}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('name')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('dba')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicFormatFieldInput field={form.$('taxId')} format="##-#######" mask="*" />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    {charityTypeDropdownStore &&
                        <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />}
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    {charityStatusDropdownStore &&
                        <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />}
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('emailAddress.email')} />
                </div>

                <div className="card card--sml">
                    <AddressTemplate field={form.$('address')} />
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    {suggestedByIdDropdownStore &&
                        <BaasicFieldAsyncDropdown field={form.$('suggestedById')} store={suggestedByIdDropdownStore} />}
                </div>

                <div className="form__group f-col f-col-lrg-12">
                    <BasicCheckBox field={form.$('hasContact')} />
                </div>

                <div className="form__group f-col f-col-lrg-12">
                    <BasicCheckBox field={form.$('hasLogin')} />
                </div>

                <div className="form__group f-col f-col-lrg-12">
                    <BasicCheckBox field={form.$('hasBankAccount')} />
                </div>
            </div>

            {form.$('hasContact').value === true &&
                <ContactInformationTemplate field={form.$('contactInformation')} />}

            {form.$('hasLogin').value === true &&
                <div className="f-row card card--sml card--primary">
                    <CreateLoginTemplate
                        coreUserfields={form.$('coreUser')}
                        sendWelcomeEmailField={form.$('sendWelcomeEmail')}
                        isApprovedField={form.$('isApproved')}
                        emailAddressField={form.$('emailAddress.email')}
                    />
                </div>}

            {form.$('hasBankAccount').value === true &&
                <div className="f-row card card--sml card--primary">
                    <CreateBankAccountTemplate
                        form={form.$('bankAccount')}
                    />
                </div>}
        </EditFormLayout>
    );
};

CharityCreateTemplate.propTypes = {
    charityCreateViewStore: PropTypes.object.isRequired
}

export default defaultTemplate(CharityCreateTemplate);
