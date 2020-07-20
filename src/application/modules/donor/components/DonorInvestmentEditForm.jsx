import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BaasicButton,
    NumericInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

class DonorInvestmentEditForm extends Component {
    render() {
        const { modalParams, t } = this.props;
        const { form, investmentPool } = modalParams.data;

        return (
            <section>
                <form className='form' onSubmit={form.onSubmit}>
                    <h3 className="u-mar--bottom--med">{t('DONOR_INVESTMENT.CREATE.TITLE')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-12">
                            <span>Pool: <strong>{investmentPool.name}</strong></span>
                        </div>
                        <div className="form__group col col-lrg-12">
                            <NumericInputField field={form.$('amount')} />
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

DonorInvestmentEditForm.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(DonorInvestmentEditForm);
