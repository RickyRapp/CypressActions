import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorEmailAddressEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { formAddress } = modalParams.data;

        return (
            <section>
                <form className='form' onSubmit={formAddress.onSubmit}>
                    <h3 className="u-mar--bottom--med">{formAddress.$('id').value ? t('ADDRESS.EDIT.TITLE') : t('ADDRESS.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-6">
                            <BasicInput field={formAddress.$('addressLine1')} />
                        </div>
                        <div className="form__group col col-lrg-6">
                            <BasicInput field={formAddress.$('addressLine2')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={formAddress.$('city')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={formAddress.$('state')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={formAddress.$('zipCode')} />
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicInput field={formAddress.$('description')} />
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

DonorEmailAddressEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorEmailAddressEditForm);
