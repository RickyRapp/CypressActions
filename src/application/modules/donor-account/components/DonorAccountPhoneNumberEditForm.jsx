import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicButton,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorAccountPhoneNumberEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formPhoneNumber } = modalParams.data;

        return (
            <section className='w--400--px'>
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
                    <BaasicButton
                        className='btn btn--base btn--primary'
                        type='submit'
                        label='Submit'
                    />
                </form>
            </section>
        );
    }
}

DonorAccountPhoneNumberEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountPhoneNumberEditForm);
