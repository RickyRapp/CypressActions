import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls, NumericInputField
} from 'core/components';

function InvestmentPoolChangeTemplate({ investmentPoolChangeViewStore, t }) {
    const {
        form,
        item
    } = investmentPoolChangeViewStore;

    return (
        <section>
            <form className='form' onSubmit={form.onSubmit}>
                <h3 className="u-mar--bottom--med">{t('INVESTMENT_POOL.EDIT.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.aggressiveGrowthName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('aggressiveGrowthChange')}
                            onChange={(event) => {
                                debugger
                                form.$('aggressiveGrowthPoolValue').set(item.aggressiveGrowthPoolValue + (event.value * item.aggressiveGrowthPoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('aggressiveGrowthPoolValue')}
                            onChange={(event) => {
                                form.$('aggressiveGrowthChange').set((event.value - item.aggressiveGrowthPoolValue) / item.aggressiveGrowthPoolValue)
                            }} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.balancedName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('balancedChange')}
                            onChange={(event) => {
                                form.$('balancedPoolValue').set(item.balancedPoolValue + (event.value * item.balancedPoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField field={form.$('balancedPoolValue')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.conservativeIncomeName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('conservativeIncomeChange')}
                            onChange={(event) => {
                                form.$('conservativeIncomePoolValue').set(item.conservativeIncomePoolValue + (event.value * item.conservativeIncomePoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField field={form.$('conservativeIncomePoolValue')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.growthName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('growthChange')}
                            onChange={(event) => {
                                form.$('growthPoolValue').set(item.growthPoolValue + (event.value * item.growthPoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField field={form.$('growthPoolValue')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.incomeName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('incomeChange')}
                            onChange={(event) => {
                                form.$('incomePoolValue').set(item.incomePoolValue + (event.value * item.incomePoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField field={form.$('incomePoolValue')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.moderateGrowthName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('moderateGrowthChange')}
                            onChange={(event) => {
                                form.$('moderateGrowthPoolValue').set(item.moderateGrowthPoolValue + (event.value * item.moderateGrowthPoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField field={form.$('moderateGrowthPoolValue')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-4">
                        <span>{item && item.moderateIncomeName} </span>
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField
                            field={form.$('moderateIncomeChange')}
                            onChange={(event) => {
                                form.$('moderateIncomePoolValue').set(item.moderateIncomePoolValue + (event.value * item.moderateIncomePoolValue))
                            }} />
                    </div>
                    <div className="form__group col col-lrg-4">
                        <NumericInputField field={form.$('moderateIncomePoolValue')} />
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
