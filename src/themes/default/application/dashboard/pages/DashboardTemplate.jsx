import React from 'react';
import { Page, PageHeader } from 'core/layouts';
import { BaasicButton, BaasicDropdown, FormatterResolver } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend,
    ChartTooltip
} from '@progress/kendo-react-charts';
import { AccountManager } from 'application/donor/components';

function DashboardTemplate({ dashboardViewStore, t }) {
    const {
        donor,
        yearDropdownStore
    } = dashboardViewStore

    let categories = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let dataGrants = [];
    let dataContributions = [];
    if (donor) {
        dataGrants = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).grants.slice();
        dataContributions = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).contributions.slice();
    }

    const LineChartContainer = () => (
        <Chart>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} />
            </ChartCategoryAxis>
            <ChartTooltip render={({ point }) => <FormatterResolver item={{ amount: point.value }} field='amount' format={{ type: 'currency' }} />} />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartSeries>
                <ChartSeriesItem name="Total Contributed" type="line" data={dataContributions} />
                <ChartSeriesItem name="Total Granted" type="line" data={dataGrants} />
            </ChartSeries>
        </Chart>
    );

    return (
        <Page >
            <PageHeader>
                <AccountManager />
            </PageHeader>
            <div className="u-padd--top--sml">
                <div className="row">
                    <div className="col col-sml-12 col-med-6">
                        <div className="card card--primary card--med u-mar--bottom--med">
                            <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.YOUR_FUNDS')}</h3>
                            <div className="row u-mar--bottom--med">
                                <div className="col col-sml-12 col-lrg-6">
                                    <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.AVAILABLE_BALANCE')}</h5>
                                    <div>
                                        <p className="type--base type--wgt--medium type--color--opaque">{t('DASHBOARD.AVAILABLE_BALANCE_DESCRIPTION')}</p>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-lrg-6 type--base type--wgt--bold type--color--note">
                                    {donor &&
                                        <FormatterResolver
                                            item={{ balance: donor.availableBalance }}
                                            field='balance'
                                            format={{ type: 'currency' }}
                                        />}
                                </div>
                            </div>
                            <div className="row u-mar--bottom--med">
                                <div className="col col-sml-12 col-med-6">
                                    <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.PRESENT_BALANCE')}</h5>
                                    <div>
                                        <p className="type--base type--wgt--medium type--color--opaque">{t('DASHBOARD.PRESENT_BALANCE_DESCRIPTION')}</p>
                                    </div>
                                </div>
                                <div className="col col-sml-12 col-med-6 type--base type--wgt--bold type--color--note">
                                    {donor &&
                                        <FormatterResolver
                                            item={{ balance: donor.presentBalance }}
                                            field='balance'
                                            format={{ type: 'currency' }}
                                        />}
                                </div>
                            </div>
                            <div className="row u-mar--bottom--lrg">
                                <div className="col col-sml-12 col-med-6">
                                    <h5 className="type--base type--wgt--bold type--color--note type--underline">{t('DASHBOARD.INVESTMENTS')}</h5>
                                </div>
                                <div className="col col-sml-12 col-med-6 type--medium type--wgt--bold type--color--note">
                                    {donor &&
                                        <FormatterResolver
                                            item={{ balance: donor.investmentBalance }}
                                            field='balance'
                                            format={{ type: 'currency' }}
                                        />}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                    <BaasicButton
                                        className="btn btn--med btn--secondary type--sml type--wgt--medium type--uppercase u-padd--left--xxxlrg u-padd--right--xxxlrg"
                                        label='DASHBOARD.BUTTON.DEPOSIT_FUNDS'
                                    />
                                </div>
                                <div className="col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                    <BaasicButton
                                        className="btn btn--med btn--secondary type--sml type--wgt--medium type--uppercase u-padd--left--xxxlrg u-padd--right--xxxlrg"
                                        label='DASHBOARD.BUTTON.INVEST_FUNDS'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sml-12 col-med-6">
                        <div className="card card--primary card--med u-mar--bottom--med">
                            <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.YOUR_GIVING')}</h3>
                            <div className="row u-mar--bottom--med">
                                <div className="col col-sml-12 col-med-5">
                                    Donations Per Year <BaasicDropdown store={yearDropdownStore} />
                                </div>
                            </div>
                            <div className="row u-mar--bottom--med">
                                <div className="col col-sml-12 col-med-12">
                                    <LineChartContainer />
                                </div>
                            </div>
                        </div>
                    </div>
                    {donor && (!donor.isGrantMade || !donor.isContributionMade || !donor.isBookletOrderMade || !donor.isInvestmentMade) &&
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card card--tertiary card--med u-mar--bottom--med u-mar--top--med">
                                <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.FINISH_SETTING_UP_YOUR_ACCOUNT')}</h3>
                                <div className="row">
                                    {!donor.IsInvestmentMade &&
                                        <div className="col col-sml-12 col-med-4 col-lrg-3 u-mar--bottom--sml">
                                            <BaasicButton
                                                className="btn btn--med btn--tertiary type--sml type--uppercase type--wide u-padd--left--med"
                                                onlyIconClassName="u-mar--right--med"
                                                icon='u-icon u-icon--arrow-right u-icon--sml'
                                                label='DASHBOARD.BUTTON.VIEW_INVESTMENT_OPTIONS'
                                            />
                                        </div>}
                                    {!donor.isBookletOrderMade &&
                                        <div className="col col-sml-12 col-med-4 col-lrg-3 u-mar--bottom--sml">
                                            <BaasicButton
                                                className="btn btn--med btn--tertiary type--sml type--uppercase type--wide u-padd--left--med"
                                                onlyIconClassName="u-mar--right--med"
                                                icon='u-icon u-icon--arrow-right u-icon--sml'
                                                label='DASHBOARD.BUTTON.ORDER_CERTIFICATES'
                                            />
                                        </div>}
                                    {!donor.isContributionMade &&
                                        <div className="col col-sml-12 col-med-4 col-lrg-3 u-mar--bottom--sml">
                                            <BaasicButton
                                                className="btn btn--med btn--tertiary type--sml type--uppercase type--wide u-padd--left--med"
                                                onlyIconClassName="u-mar--right--med"
                                                icon='u-icon u-icon--arrow-right u-icon--sml'
                                                label='DASHBOARD.BUTTON.NEW_CONTRIBUTION'
                                            />
                                        </div>}
                                    {!donor.isGrantMade &&
                                        <div className="u-mar--right--med">
                                            <BaasicButton
                                                className="btn btn--med btn--primary"
                                                icon='u-icon u-icon--arrow-right u-icon--sml'
                                                label='DASHBOARD.BUTTON.NEW_GRANT'
                                            />
                                        </div>}
                                </div>
                            </div>
                        </div>}
                    <div className="col col-sml-12 col-lrg-12">
                        <div className="card card--primary card--med u-mar--bottom--med u-mar--top--med">
                            <h3 className="type--med type--wgt--medium u-mar--bottom--med">{t('DASHBOARD.RECENT_ACTIVITY')}</h3>
                        </div>
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
