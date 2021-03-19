import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content, PageFooter } from 'core/layouts';
import {
    BaasicButton,
    BaasicFormControls,
    FormatterResolver,
    NumericInputField,
} from 'core/components';
import { InvestmentPoolOverviewTemplate } from '../components';

const DonorInvestmentCreateTemplate = function ({ donorInvestmentCreateViewStore, t }) {
    const { contentLoading, form, investmentPools, onNextStepClick, step, donor } = donorInvestmentCreateViewStore;

    return (
        <ApplicationEditLayout store={donorInvestmentCreateViewStore}>
            <Content loading={contentLoading}>
                {step === 1 && (
                    <div className="row">
                        <div className="col col-sml-12">
                            <h4 className="type--lrg type--color--opaque u-mar--bottom--med">
                                {t('DONOR_INVESTMENT.CREATE.POOL_TITLE')}:
							</h4>
                        </div>
                        <div className="col col-sml-12 col-xlrg-10">
                            {form.$('pools').map(item => {
                                const pool = investmentPools.find(c => c.id === item.$('id').value);
                                return <InvestmentPoolOverviewTemplate key={item.key} form={item} pool={pool} />;
                            })}
                        </div>
                        <div className="col col-sml-12 col-xlrg-2 type--right">
                            <BaasicButton
                                className="btn btn--secondary btn--med btn--med--wide"
                                onClick={onNextStepClick}
                                disabled={form.$('pools').value && !form.$('pools').value.some(c => c.isChecked)}
                                label={'Next step'}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <React.Fragment>
                        <div className="row">
                            <div className="col col-sml-12 type--center">
                                <div className="row">
                                    <div className="col col-sml-12 u-mar--bottom--base">
                                        <h4 className="type--base type--wgt--medium type--color--note">Available Balance</h4>
                                    </div>
                                    <div className="col col-sml-12 u-mar--bottom--xlrg">
                                        <h2 className="type--huge">
                                            {donor && (
                                                <FormatterResolver
                                                    className="type--huge"
                                                    item={{ amount: donor.availableBalance }}
                                                    field="amount"
                                                    format={{ type: 'currency' }}
                                                />
                                            )}
                                        </h2>
                                    </div>
                                    <div className="col col-sml-12 u-mar--bottom--sml">
                                        <p className="type--lrg type--wgt--regular">How much would you like to invest?</p>
                                    </div>
                                    <div className="col col-sml-12 u-mar--bottom--base">
                                        <p className="type--sml type--color--opaque">Minimum $500 investment required.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-sml-12">
                                <div className="row">
                                    <div className="col col-sml-12 col-med-8 col-lrg-4 u-mar--center">
                                        <div className="u-mar--bottom--xxxlrg">
                                            <NumericInputField field={form.$('amount')} />
                                        </div>
                                    </div>
                                    <div className="col col-sml-12">
                                        <div className="card--med card--primary">
                                            <div className="row u-mar--bottom--lrg">
                                                {form.$('pools').map(item => {
                                                    if (item.$('isChecked').value) {
                                                        const pool = investmentPools.find(c => c.id === item.$('id').value);

                                                        return (
                                                            <React.Fragment>
                                                                <div className="col col-sml-6 col-lrg-8 col-xlrg-9">{pool.name}</div>
                                                                <div className="col col-sml-6 col-lrg-4 col-xlrg-3">
                                                                    <NumericInputField field={item.$('percentage')} />
                                                                </div>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                            <div className="col col-sml-12 type--right">
                                                <div className="row row__align--end u-mar--bottom--med">
                                                    <div className="col col-sml-12 type--right">
                                                        <span className="type--med type--color--opaque u-mar--right--base">{t('Total:')}</span>

                                                        <span className="type--xxlrg">
                                                            <FormatterResolver
                                                                item={{
                                                                    value: form
                                                                        .$('pools')
                                                                        .value.filter(c => c.isChecked)
                                                                        .map(c => c.percentage)
                                                                        .reduce((a, b) => a + b, 0),
                                                                }}
                                                                field="value"
                                                                format={{ type: 'percentage', decimalScale: 0 }}
                                                            />
                                                        </span>

                                                        {form
                                                            .$('pools')
                                                            .value.filter(c => c.isChecked)
                                                            .map(c => c.percentage)
                                                            .reduce((a, b) => a + b, 0) !== 1 &&
                                                            form
                                                                .$('pools')
                                                                .value.filter(c => c.isChecked)
                                                                .every(c => c.percentage > 0) &&
                                                            <div className="validation__message">
                                                                <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>
                                                                <span>Please, check percentage.</span>
                                                            </div>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col col-sml-12">
                                                <div className="row row__align--end">
                                                    <div className="col col-sml-12 type--right">
                                                        <span className="type--med type--color--opaque u-mar--right--base">Total in $:</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </Content>
            {renderEditLayoutFooterContent({ form, step })}
        </ApplicationEditLayout>
    );
};

DonorInvestmentCreateTemplate.propTypes = {
    donorInvestmentCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    step: PropTypes.number,
};

function renderEditLayoutFooterContent({ form, step }) {
    return (
        <PageFooter>
            <div>{step === 2 && <BaasicFormControls form={form} onSubmit={form.onSubmit} />}</div>
        </PageFooter>
    );
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any,
    step: PropTypes.number,
};

export default defaultTemplate(DonorInvestmentCreateTemplate);
