import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorAccountEmailAddressEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formEmailAddress } = modalParams.data;

        return (
            <section className='w--400--px'>
                <form className='form' onSubmit={formEmailAddress.onSubmit}>
                    <h3 className="u-mar--bottom--med">{formEmailAddress.$('id').value ? t('EMAIL_ADDRESS.EDIT.TITLE') : t('EMAIL_ADDRESS.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-6">
                            <BasicInput field={formEmailAddress.$('email')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BasicInput field={formEmailAddress.$('description')} />
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

DonorAccountEmailAddressEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountEmailAddressEditForm);
