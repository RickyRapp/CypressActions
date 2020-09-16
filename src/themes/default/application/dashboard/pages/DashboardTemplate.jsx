import React from 'react';
import { Page } from 'core/layouts';
import { BaasicButton, FormatterResolver } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

function DashboardTemplate({ dashboardViewStore, t }) {
    const {
        donor
    } = dashboardViewStore

    return (
        <Page >
            <div className="row">
                <div className="col col-sml-12 col-lrg-6">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--right--sml u-mar--top--med">
                        <h3 className="u-mar--bottom--med">{t('DASHBOARD.YOUR_FUNDS')}</h3>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-sml-12 col-lrg-6">
                                <h5>{t('DASHBOARD.AVAILABLE_BALANCE')}</h5>
                                <div>
                                    <small>{t('DASHBOARD.AVAILABLE_BALANCE_DESCRIPTION')}</small>
                                </div>
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                {donor &&
                                    <FormatterResolver
                                        item={{ balance: donor.availableBalance }}
                                        field='balance'
                                        format={{ type: 'currency' }}
                                    />}
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-sml-12 col-lrg-6">
                                <h5>{t('DASHBOARD.PRESENT_BALANCE')}</h5>
                                <div>
                                    <small>{t('DASHBOARD.PRESENT_BALANCE_DESCRIPTION')}</small>
                                </div>
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                {donor &&
                                    <FormatterResolver
                                        item={{ balance: donor.presentBalance }}
                                        field='balance'
                                        format={{ type: 'currency' }}
                                    />}
                            </div>
                        </div>
                        <div className="row u-mar--bottom--xxxlrg">
                            <div className="col col-sml-12 col-lrg-6">
                                <h5>{t('DASHBOARD.INVESTMENTS')}</h5>
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                {donor &&
                                    <FormatterResolver
                                        item={{ balance: donor.investmentBalance }}
                                        field='balance'
                                        format={{ type: 'currency' }}
                                    />}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-6">
                                <BaasicButton
                                    className="btn btn--base btn--primary"
                                    label='DASHBOARD.BUTTON.DEPOSIT_FUNDS'
                                />
                            </div>
                            <div className="col col-sml-12 col-lrg-6">
                                <BaasicButton
                                    className="btn btn--base btn--primary"
                                    label='DASHBOARD.BUTTON.INVEST_FUNDS'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sml-12 col-lrg-6 card card--form">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--left--sml u-mar--top--med">
                        <h3>{t('DASHBOARD.YOUR_GIVING')}</h3>
                    </div>
                </div>
                {donor && (!donor.isGrantMade || !donor.isContributionMade || !donor.isBookletOrderMade || !donor.isInvestmentMade) &&
                    <div className="col col-sml-12 col-lrg-12">
                        <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--top--med">
                            <h3 className="u-mar--bottom--med">{t('DASHBOARD.FINISH_SETTING_UP_YOUR_ACCOUNT')}</h3>
                            <div className="row">
                                {!donor.IsInvestmentMade &&
                                    <div className="col col-sml-12 col-lrg-3">
                                        <BaasicButton
                                            className="btn btn--base btn--primary"
                                            icon='u-icon u-icon--arrow-right u-icon--sml'
                                            label='DASHBOARD.BUTTON.VIEW_INVESTMENT_OPTIONS'
                                        />
                                    </div>}
                                {!donor.isBookletOrderMade &&
                                    <div className="col col-sml-12 col-lrg-3">
                                        <BaasicButton
                                            className="btn btn--base btn--primary"
                                            icon='u-icon u-icon--arrow-right u-icon--sml'
                                            label='DASHBOARD.BUTTON.ORDER_CERTIFICATES'
                                        />
                                    </div>}
                                {!donor.isContributionMade &&
                                    <div className="col col-sml-12 col-lrg-3">
                                        <BaasicButton
                                            className="btn btn--base btn--primary"
                                            icon='u-icon u-icon--arrow-right u-icon--sml'
                                            label='DASHBOARD.BUTTON.NEW_CONTRIBUTION'
                                        />
                                    </div>}
                                {!donor.isGrantMade &&
                                    <div className="col col-sml-12 col-lrg-3">
                                        <BaasicButton
                                            className="btn btn--base btn--primary"
                                            icon='u-icon u-icon--arrow-right u-icon--sml'
                                            label='DASHBOARD.BUTTON.NEW_GRANT'
                                        />
                                    </div>}
                            </div>
                        </div>
                    </div>}
                <div className="col col-sml-12 col-lrg-12">
                    <div className="card card--form card--primary card--med u-mar--bottom--med u-mar--top--med">
                        <h3 className="u-mar--bottom--med">{t('DASHBOARD.RECENT_ACTIVITY')}</h3>
                    </div>
                </div>
            </div>
        </Page>
    )
}

DashboardTemplate.propTypes = {
    dashboardViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DashboardTemplate);
