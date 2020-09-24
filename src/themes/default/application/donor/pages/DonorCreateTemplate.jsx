import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    DatePickerField
} from 'core/components';
import { Page } from 'core/layouts';
import { ContactInfoForm } from 'application/donor/components';
import { CreateLoginForm } from 'common/components';

function DonorCreateTemplate({ donorCreateViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        loaderStore,
        howDidYouHearAboutUsDropdownStore,
        onBlurUsername,
        onBlurFundName,
        loginShow,
        onChangeLoginShow
    } = donorCreateViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className="card card--form card--primary card--med u-mar--bottom--sml">
                <EditFormContent form={form}>
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">General Data</h3>
                                <div className="row">
                                    <div className="form__group col col-lrg-1">
                                        <BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('firstName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('lastName')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-3">
                                        <DatePickerField field={form.$('dateOfBirth')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('fundName')} onBlur={onBlurFundName} />
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
                                </div>
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
                    <div className="u-mar--bottom--med">
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                    </div>
                </EditFormContent>
            </div>
        </Page >
    )
}

DonorCreateTemplate.propTypes = {
    donorCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorCreateTemplate);
