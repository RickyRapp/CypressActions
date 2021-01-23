import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicButton,
    EditFormContent,
    BasicFieldCheckbox,
    BaasicFormControls
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditFormTemplate extends Component {
    render() {
        const {
            title,
            form,
            onCancelEditClick,
            isAssignableAsPrimary
        } = this.props;

        return (
            <EditFormContent form={form}>
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{title}</h3>
                <div className="row u-mar--bottom--sml">
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('addressLine1')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('addressLine2')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-2">
                        <BasicInput field={form.$('city')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-2">
                        <BasicInput field={form.$('state')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-2">
                        <BasicInput field={form.$('zipCode')} />
                    </div>
                    {isAssignableAsPrimary &&
                        <div className="form__group col col-sml-12 col-lrg-2">
                            <BasicFieldCheckbox field={form.$('isPrimary')} />
                        </div>}
                </div>
                <BaasicFormControls
                    form={form}
                    onSubmit={form.onSubmit}
                    className="btn btn--base btn--secondary u-push" />
                <BaasicButton
                    type='button'
                    className="btn btn--base btn--tertiary u-push"
                    onClick={onCancelEditClick}
                    label='Cancel'
                />
            </EditFormContent>
        );
    }
}

DonorEmailAddressEditFormTemplate.propTypes = {
    title: PropTypes.string,
    onCancelEditClick: PropTypes.func,
    form: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(DonorEmailAddressEditFormTemplate);
