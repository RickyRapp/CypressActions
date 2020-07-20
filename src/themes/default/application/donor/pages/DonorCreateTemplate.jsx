import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    NumericInputField,
    EditFormContent,
    NumberFormatInputField,
    DatePickerField
} from 'core/components';
import { Page } from 'core/layouts';
import {
    AccountSettingsPartialForm,
    ContactInfoForm
} from 'application/donor/components';
import { CreateLoginForm } from 'common/components';

function DonorCreateTemplate({ donorCreateViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        loaderStore,
        accountTypeDropdownStore,
        howDidYouHearAboutUsDropdownStore,
        onBlurUsername,
        onBlurFundName,
        accountSettingsShow,
        onChangeAccountSettingsShow,
        loginShow,
        onChangeLoginShow
    } = donorCreateViewStore;

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
                                    <div className="form__group col col-sml-6 col-lrg-3">
                                        <DatePickerField field={form.$('dateOfBirth')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput
                                            field={form.$('fundName')}
                                            onBlur={onBlurFundName}
                                        />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <NumberFormatInputField field={form.$('securityPin')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BaasicFieldDropdown field={form.$('howDidYouHearAboutUsId')} store={howDidYouHearAboutUsDropdownStore} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('howDidYouHearAboutUsDescription')} />
                                    </div>
                                    {isPremium &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('notificationLimitRemainderAmount')} />
                                        </div>}
                                    {isPremium &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('blankBookletMaxAmount')} />
                                        </div>}
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml">
                                <AuthAccountSettingsPartialFormContent
                                    form={form}
                                    isPremiumAccount={isPremium}
                                    authorization='theDonorsFundAdministrationSection.update'
                                    show={accountSettingsShow}
                                    onChangeShow={onChangeAccountSettingsShow}
                                />
                            </div>
                            <div className="u-mar--bottom--sml">
                                <ContactInfoForm form={form} />
                            </div>
                            <div className="u-mar--bottom--sml">
                                <CreateLoginForm
                                    form={form}
                                    title='DONOR.CREATE.LOGIN_FORM_FIELDS.TITLE'
                                    onBlurUsername={onBlurUsername}
                                    show={loginShow}
                                    onChangeShow={onChangeLoginShow}
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

DonorCreateTemplate.propTypes = {
    donorCreateViewStore: PropTypes.object.isRequired,
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

export default defaultTemplate(DonorCreateTemplate);
