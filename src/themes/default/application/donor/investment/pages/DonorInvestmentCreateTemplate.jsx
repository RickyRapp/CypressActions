import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import { BaasicButton, BaasicFormControls, BaasicInput, BasicCheckbox, FormatterResolver } from 'core/components';
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
                        {investmentPools && investmentPools.map(pool => {
                            return <InvestmentPoolOverviewTemplate pool={pool} />
                        })}
                        <BaasicButton
                            className="btn btn--secondary btn--med btn--med--wide"
                            onClick={onNextStepClick}
                            disabled={!investmentPools.some(c => c.checked)}
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

                        {investmentPools.filter(c => { return c.checked }).map(pool => {
                            return (
                                <div key={pool.id} className="row u-mar--bottom--sml">
                                    <div className="col col-sml-6">
                                        {pool.name}
                                    </div>
                                    <div className="col col-sml-6">
                                        <BaasicInput
                                            id={`txt_${pool.id}`}
                                            className='input input--lrg'
                                            value={pool.amount}
                                            onChange={(event) => pool.amount = event.target.value}
                                            placeholder='INVESTMENT.CREATE.FIELDS.AMOUNT_PLACEHOLDER' />
                                    </div>
                                </div>
                            )
                        }
                        )}

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

