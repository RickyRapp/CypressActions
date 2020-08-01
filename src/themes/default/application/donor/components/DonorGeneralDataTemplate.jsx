import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    Date
} from 'core/components';

function DonorGeneralDataTemplate({ donorGeneralDataEditViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        item
    } = donorGeneralDataEditViewStore;

    return (
        <div className="card--form card--primary card--med">
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
                                    <BasicInput field={form.$('middleName')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <BasicInput field={form.$('lastName')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <div>
                                        <label className="form__group__label">Date of birth</label>
                                        {item &&
                                            <span className={"input input--med input--text input--disabled"}>
                                                <Date format="full-date" value={item.dateOfBirth} />
                                            </span>}
                                    </div>
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <BasicInput field={form.$('fundName')} />
                                </div>
                                <div className="form__group col col-lrg-3">
                                    <NumberFormatInputField field={form.$('securityPin')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {renderEditLayoutFooterContent({ form })}
            </EditFormContent>
        </div>

    )
}

DonorGeneralDataTemplate.propTypes = {
    donorGeneralDataEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func,
    rootStore: PropTypes.object
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(DonorGeneralDataTemplate);
