import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import { BaasicButton, BaasicFormControls, BaasicInput, BasicCheckbox } from 'core/components';

const DonorInvestmentCreateTemplate = function ({ donorInvestmentCreateViewStore, t }) {
    const {
        contentLoading,
        form,
        investmentPools,
        onNextStepClick,
        step
    } = donorInvestmentCreateViewStore;

    return (
        <ApplicationEditLayout store={donorInvestmentCreateViewStore}>
            <Content loading={contentLoading} >
                {step === 1 &&
                    <React.Fragment>
                        <h4>{t('DONOR_INVESTMENT.CREATE.POOL_TITLE')}</h4>
                        {investmentPools && investmentPools.map(pool => {
                            return (
                                <div key={pool.id} className="row u-mar--bottom--sml u-display--flex--align--center">
                                    <div className="col col-sml-8">
                                        <div className="card--primary card--med u-mar--bottom--med">
                                            <div className="row u-mar--bottom--sml">
                                                <div className="col col-sml-12">
                                                    <h4>
                                                        <BasicCheckbox
                                                            id={`chk_${pool.id}`}
                                                            checked={pool.checked}
                                                            label={pool.name}
                                                            onChange={event => pool.checked = event.target.checked} /></h4>
                                                </div>
                                                <div className="col col-sml-12">
                                                    <small>{'Short description of when this pool is a good idea'}</small>
                                                </div>
                                                <div className="col col-sml-12">
                                                    <div><span className="counter--prepaid">LONG TERM GROWTH</span> | Expense ration 0.35%</div>
                                                    <div className="row u-mar--bottom--sml u-display--flex--align--center">
                                                        <div className="col col-sml-4">Target allocation:</div>
                                                        <div className="col col-sml-4">Risk:</div>
                                                        <div className="col col-sml-4">Performance:</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
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
                        <h2>$50 000</h2>
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

