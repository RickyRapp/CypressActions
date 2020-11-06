import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    BasicFieldCheckbox
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formEmailAddress } = modalParams.data;

        return (
            <section>
                <form className='form' onSubmit={formEmailAddress.onSubmit}>
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{formEmailAddress.$('id').value ? t('EMAIL_ADDRESS.EDIT.TITLE') : t('EMAIL_ADDRESS.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className={`form__group col col-lrg-${formEmailAddress.$('isPrimary').value ? '12' : '12'}`}>
                            <BasicInput field={formEmailAddress.$('email')} />
                        </div>
                        {!formEmailAddress.$('isPrimary').value &&
                            <div className="form__group col col-sml-12 col-lrg-4">
                                <BasicFieldCheckbox field={formEmailAddress.$('isNotifyEnabled')} />
                            </div>}
                        <div className="form__group col col-lrg-12">
                            <BasicInput field={formEmailAddress.$('description')} />
                        </div>
                    </div>

                    <BaasicFormControls form={formEmailAddress} onSubmit={formEmailAddress.onSubmit} />
                </form>
            </section>
        );
    }
}

DonorEmailAddressEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorEmailAddressEditForm);
