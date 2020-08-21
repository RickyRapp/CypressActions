import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls, NumericInputField, FormatterResolver
} from 'core/components';

function InvestmentPoolChangeTemplate({ investmentPoolChangeViewStore, t }) {
    const {
        form,
        item
    } = investmentPoolChangeViewStore;

    return (
        <section>
            <h3 className="u-mar--bottom--med">{t('INVESTMENT_POOL.EDIT.TITLE')}</h3>
            {form.$('investmentPoolHistory').map((_c) => {
                const element = item.investmentPoolHistory.find(_d => _d.investmentPoolId === _c.$('investmentPoolId').value);
                const newPoolValue = element.totalPoolValue + (_c.$('percentageChange').value * element.totalPoolValue)
                const difference = Math.abs(_c.$('totalPoolValue').value - (newPoolValue));

                return (
                    <div key={_c.key} className="row">
                        <div className="form__group col col-lrg-3">
                            <span>{element.investmentPool.name} </span>
                        </div>
                        <div className="form__group col col-lrg-4">
                            <NumericInputField field={_c.$('percentageChange')} />
                            <small>
                                New pool value: <FormatterResolver
                                    item={{ amount: newPoolValue }}
                                    field='amount'
                                    format={{ type: 'currency' }}
                                />
                            </small>
                        </div>
                        <div className="form__group col col-lrg-5">
                            <NumericInputField field={_c.$('totalPoolValue')} />
                            <small>
                                Difference: <span style={{ backgroundColor: difference >= 1 ? "red" : "green" }}>
                                    <FormatterResolver
                                        item={{ difference: difference }}
                                        field='difference'
                                        format={{ type: 'currency' }}
                                    />
                                </span>
                            </small>
                        </div>
                    </div>
                )
            })}

            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </section>
    )
}

InvestmentPoolChangeTemplate.propTypes = {
    investmentPoolChangeViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(InvestmentPoolChangeTemplate);
