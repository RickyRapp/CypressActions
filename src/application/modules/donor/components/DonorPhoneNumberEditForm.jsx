import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorPhoneNumberEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formPhoneNumber } = modalParams.data;

        return (
            <section>
                <form className='form' onSubmit={formPhoneNumber.onSubmit}>
                    <h3 className="u-mar--bottom--med">{formPhoneNumber.$('id').value ? t('PHONE_NUMBER.EDIT.TITLE') : t('PHONE_NUMBER.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-6">
                            <NumberFormatInputField field={formPhoneNumber.$('number')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BasicInput field={formPhoneNumber.$('description')} />
                        </div>
                    </div>

                    <BaasicFormControls form={formPhoneNumber} onSubmit={formPhoneNumber.onSubmit} />
                </form>
            </section>
        );
    }
}

DonorPhoneNumberEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorPhoneNumberEditForm);
