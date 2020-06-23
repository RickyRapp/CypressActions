import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls, NumericInputField
} from 'core/components';

function InvestmentPoolChangeTemplate({ investmentPoolChangeViewStore, t }) {
    const {
        form,
    } = investmentPoolChangeViewStore;

    return (
        <section>
            <form className='form' onSubmit={form.onSubmit}>
                <h3 className="u-mar--bottom--med">{t('INVESTMENT_POOL.EDIT.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('aggressiveGrowthName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('aggressiveGrowthChange')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('balancedName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('balancedChange')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('conservativeIncomeName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('conservativeIncomeChange')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('growthName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('growthChange')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('incomeName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('incomeChange')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('moderateGrowthName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('moderateGrowthChange')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <span>{form.$('moderateIncomeName').value} </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <NumericInputField field={form.$('moderateIncomeChange')} />
                    </div>
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </form>
        </section>
    )
}

InvestmentPoolChangeTemplate.propTypes = {
    investmentPoolChangeViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(InvestmentPoolChangeTemplate);
