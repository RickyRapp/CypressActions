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
            <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('INVESTMENT_POOL.EDIT.TITLE')}</h3>
            {form.$('investmentPoolHistory').map((_c) => {
                const element = item.investmentPoolHistory.find(_d => _d.investmentPoolId === _c.$('investmentPoolId').value);
                const newPoolValue = element.totalPoolValue + (_c.$('percentageChange').value * element.totalPoolValue)
                const difference = Math.abs(_c.$('totalPoolValue').value - (newPoolValue));

                return (
                    <div key={_c.key} className="u-separator--primary u-mar--bottom--sml">
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-12">
                                <span className="type--med type--wgt--medium type--color--note u-mar--bottom--tny">{element.investmentPool.name} </span>
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                <NumericInputField field={_c.$('percentageChange')} />
                                <p className="type--tny type--wgt--regular">
                                    New pool value:
                                    <span className="type--color--note u-mar--left--tny">
                                        <FormatterResolver
                                            item={{ amount: newPoolValue }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />
                                    </span>
                                </p>
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={_c.$('totalPoolValue')} />
                                <p className="type--tny type--wgt--regular">
                                    Difference: <span className="u-mar--left--tny" style={{ backgroundColor: difference >= 1 ? "#ff4553" : "#00c48c" }}>
                                        <FormatterResolver
                                            item={{ difference: difference }}
                                            field='difference'
                                            format={{ type: 'currency' }}
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="u-push">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </section>
    )
}

InvestmentPoolChangeTemplate.propTypes = {
    investmentPoolChangeViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(InvestmentPoolChangeTemplate);
