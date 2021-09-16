import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    NumberFormatInputField,
    BaasicButton,
    BasicFieldCheckbox,
    EditFormContent
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorPhoneNumberEditTemplate extends Component {
    render() {
        const { title, form, onCancelEditClick, isAssignableAsPrimary } = this.props;

        return (
            <EditFormContent form={form}>
                <div className="card--med card--primary">
                    <h3 className="type--med type--wgt--medium type--color--opaque u-mar--bottom--med">{title}</h3>
                    <div className="row row--form u-mar--bottom--sml">
                        <div className="form__group col col-sml-12 col-lrg-3">
                            <NumberFormatInputField field={form.$('number')} />
                        </div>
                        <div className="form__group col col-sml-12 col-lrg-6">
                            <BasicInput field={form.$('description')} />
                        </div>
                        {isAssignableAsPrimary &&
                            <div className="form__group col col-sml-12 col-lrg-2">
                                <BasicFieldCheckbox field={form.$('isPrimary')} />
                            </div>}
                    </div>
                </div>
                <div className="info-card--footer">
                    <BaasicButton
                        type='button'
                        className="btn btn--med btn--med--wide btn--ghost"
                        onClick={onCancelEditClick}
                        label='Cancel'
                    />
                    <BaasicFormControls
                        form={form}
                        onSubmit={form.onSubmit}
                        className="btn btn--med btn--med--wide btn--secondary" />
                </div>
            </EditFormContent>
        );
    }
}

DonorPhoneNumberEditTemplate.propTypes = {
    title: PropTypes.string,
    onCancelEditClick: PropTypes.func,
    form: PropTypes.object,
    t: PropTypes.func,
    isAssignableAsPrimary: PropTypes.bool,
};

export default defaultTemplate(DonorPhoneNumberEditTemplate);
