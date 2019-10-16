import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    NumericInputField,
    EditFormContent
} from 'core/components';
import { Page } from 'core/layouts';
import {
    AccountSettingsPartialForm,
    ContactInfoForm
} from 'application/donor-account/components';
import { CreateLoginForm } from 'common/components';

function DonorAccountCreateTemplate({ donorAccountCreateViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        loaderStore,
        deliveryMethodTypeDropdownStore,
        accountTypeDropdownStore,
        howDidYouHearAboutUsDropdownStore,
        onBlurUsername,
        onBlurFundName
    } = donorAccountCreateViewStore;

    const isPremium = accountTypeDropdownStore.value && accountTypeDropdownStore.value.abrv === 'premium';

    return (
        <Page loading={loaderStore.loading} >
            <div className="card card--form card--primary card--med u-mar--bottom--sml">
                <EditFormContent form={form}>
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">General Data</h3>
                                <div className="row">
                                    <div className="form__group col col-lrg-2">
                                        <BaasicFieldDropdown field={form.$('accountTypeId')} store={accountTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-lrg-1">
                                        <BaasicFieldDropdown field={form.$('coreUser.prefixTypeId')} store={prefixTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('coreUser.firstName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('coreUser.middleName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('coreUser.lastName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput
                                            field={form.$('fundName')}
                                            onBlur={onBlurFundName}
                                        />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BaasicFieldDropdown field={form.$('howDidYouHearAboutUsId')} store={howDidYouHearAboutUsDropdownStore} />
                                    </div>
                                    {isPremium &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('notificationLimitRemainderAmount')} />
                                        </div>}
                                    {isPremium &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('blankBookletMax')} />
                                        </div>}
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml">
                                <AuthAccountSettingsPartialFormContent
                                    form={form}
                                    isPremiumAccount={isPremium}
                                    authorization='theDonorsFundAdministrationSection.update'
                                />
                            </div>
                            <div className="u-mar--bottom--sml">
                                <ContactInfoForm form={form} />
                            </div>
                            <div className="u-mar--bottom--sml">
                                <CreateLoginForm
                                    form={form}
                                    title='DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.TITLE'
                                    onBlurUsername={onBlurUsername}
                                />
                            </div>
                        </div>
                    </div>

                    {renderEditLayoutFooterContent({ form })}
                </EditFormContent>
            </div>
        </Page >
    )
}

const AuthAccountSettingsPartialFormContent = withAuth(AccountSettingsPartialForm);

DonorAccountCreateTemplate.propTypes = {
    donorAccountCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(DonorAccountCreateTemplate);
