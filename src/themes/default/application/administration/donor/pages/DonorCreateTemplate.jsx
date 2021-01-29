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
import { CreateAccountTemplate, ContactInfoTemplate } from 'themes/application/administration/donor/components';

function DonorCreateTemplate({ donorCreateViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        loaderStore,
        howDidYouHearAboutUsDropdownStore
    } = donorCreateViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <div className="card--primary card--med u-mar--bottom--sml">
                <EditFormContent form={form}>
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <h3 className=" type--color--note u-mar--bottom--sml">General Data</h3>
                            <div className="row u-mar--bottom--med">
                                <div className="col col-sml-12">
                                    <div className="row">
                                        <div className="form__group col col-lrg-1">
                                            <BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
                                        </div>
                                    </div>
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
                                    <BasicInput field={form.$('fundName')} />
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

                            <div className="u-mar--bottom--med">
                                <ContactInfoTemplate form={form} />
                            </div>
                            <div className="u-mar--bottom--sml">
                                <CreateAccountTemplate
                                    form={form}
                                    title='DONOR.CREATE.LOGIN_FORM_FIELDS.TITLE'
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