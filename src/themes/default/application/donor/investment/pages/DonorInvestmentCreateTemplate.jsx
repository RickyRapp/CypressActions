import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import { BaasicButton, BaasicFormControls, BaasicInput, BasicInput, FormatterResolver, NumericInputField } from 'core/components';
import { InvestmentPoolOverviewTemplate } from '../components';

const DonorInvestmentCreateTemplate = function ({ donorInvestmentCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        investmentPools,
        onNextStepClick,
        step,
        donor
    } = donorInvestmentCreateViewStore;

    return (
        <ApplicationEditLayout store={donorInvestmentCreateViewStore}>
            <Content loading={contentLoading} >
                {step === 1 &&
                    <React.Fragment>
                        <h4>{t('DONOR_INVESTMENT.CREATE.POOL_TITLE')}</h4>
                        {form.$('pools').map(item => {
                            const pool = investmentPools.find(c => c.id === item.$('id').value);
                            item.$('isChecked').set('label', pool.name)
                            return <InvestmentPoolOverviewTemplate
                                key={item.key}
                                form={item}
                                pool={pool} />
                        })}
                        <BaasicButton
                            className="btn btn--secondary btn--med btn--med--wide"
                            onClick={onNextStepClick}
                            disabled={form.$('pools').value && !form.$('pools').value.some(c => c.isChecked)}
                            label={'Next step'}
                        />
                    </React.Fragment>}

                {step === 2 &&
                    <React.Fragment>
                        <h4>Available Balance</h4>
                        <h2>
                            {donor && <FormatterResolver
                                item={{ amount: donor.availableBalance }}
                                field='amount'
                                format={{ type: 'currency' }}
                            />}
                        </h2>
                        <div>How much would you like to invest? </div>
                        <div><small>Minimum $500 investment required.</small></div>
                        <NumericInputField field={form.$('amount')} />

                        {form.$('pools').map(item => {
                            if (item.$('isChecked').value) {
                                const pool = investmentPools.find(c => c.id === item.$('id').value);

                                return (
                                    <div key={item.key} className="row u-mar--bottom--sml">
                                        <div className="col col-sml-6">
                                            {pool.name}
                                        </div>
                                        <div className="col col-sml-6">
                                            <NumericInputField field={item.$('percentage')} />
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        }
                        )}

                        {t('Total:')} <FormatterResolver
                            item={{ value: form.$('pools').value.filter(c => c.isChecked).map(c => c.percentage).reduce((a, b) => a + b, 0) }}
                            field='value'
                            format={{ type: 'percentage', decimalScale: 0 }}
                        />
                        {form.$('pools').value.filter(c => c.isChecked).map(c => c.percentage).reduce((a, b) => a + b, 0) != 1 && <div>Please, check percentage.</div>}
                    </React.Fragment>}
            </Content>
            {renderEditLayoutFooterContent({ form, step })}
        </ApplicationEditLayout>
    )
};

DonorInvestmentCreateTemplate.propTypes = {
    donorInvestmentCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    step: PropTypes.number
};

function renderEditLayoutFooterContent({ form, step }) {
    return <PageFooter>
        <div>
            {step === 2 && <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
        </div>
    </PageFooter>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any,
    step: PropTypes.number
};

export default defaultTemplate(DonorInvestmentCreateTemplate);

