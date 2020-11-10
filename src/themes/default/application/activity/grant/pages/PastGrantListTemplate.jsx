import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import {
    Chart,
    ChartArea,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTitle
} from '@progress/kendo-react-charts';
import { Slider, SliderLabel } from '@progress/kendo-react-inputs';

const PastGrantListTemplate = function ({ pastGrantViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        charityDropdownStore,
        donationTypeDropdownStore,
        donationStatusDropdownStore,
        summaryData
    } = pastGrantViewStore;

    let dataDonut = [];
    if (summaryData) {
        dataDonut = summaryData.donationsByCharityType.map(c => { return { charityType: c.charityType.name, value: c.amount, color: c.color } })
    }

    const labelContent = (e) => (`${e.category}: \n $${e.value}`);
    const DonutChartContainer = () => {
        return (
            <Chart>
                <ChartTitle text="Amount donated by category" />
                <ChartLegend visible={false} />
                <ChartArea background="none" />
                <ChartSeries>
                    <ChartSeriesItem
                        type="donut" startAngle={150} data={dataDonut}
                        categoryField="charityType" field="value" colorField="color"
                    >
                        <ChartSeriesLabels
                            position="outsideEnd"
                            background="none"
                            content={labelContent} />
                    </ChartSeriesItem>
                </ChartSeries>
            </Chart>
        );
    };

    let categories = [];
    let dataLine = [];
    if (summaryData) {
        categories = summaryData.donationsByTimePeriod.map(c => c.month);
        dataLine = summaryData.donationsByTimePeriod.map(c => c.amount);
    }
    const LineChartContainer = () => (
        <Chart>
            <ChartTitle text="Amount donated by time period" />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} />
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem type="line" data={dataLine} />
            </ChartSeries>
        </Chart>
    );

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <div className="card--tertiary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={charityDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationTypeDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                        <BaasicDropdown store={donationStatusDropdownStore} />
                    </div>
                </TableFilter>
            </div>
            <div className="row">
                <div className="col col-sml-12 col-lrg-8 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                        />
                    </div>
                </div>
                <div className="card--primary card--sml col col-sml-12 col-lrg-4 u-mar--bottom--med">
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-6">
                            ${summaryData && summaryData.totalMoneyGiven}
                            Total money given
                        </div>
                        <div className="col col-sml-12 col-lrg-6">
                            ${summaryData && summaryData.totalMoneyUpcoming}
                            Total money upcoming
                        </div>
                    </div>
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-12">
                            {summaryData &&
                                <Slider
                                    buttons={false}
                                    step={1}
                                    defaultValue={summaryData.totalMoneyGivenThisYear}
                                    min={0}
                                    max={summaryData.totalMoneyUpcomingThisYear}
                                    disabled={true}
                                >
                                    <SliderLabel position={0}>{(summaryData.totalMoneyGivenThisYear / summaryData.totalMoneyUpcomingThisYear) * 100}%</SliderLabel>

                                    <SliderLabel position={summaryData.totalMoneyUpcomingThisYear}>${summaryData.totalMoneyUpcomingThisYear}</SliderLabel>
                                </Slider>}
                        </div>
                    </div>
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-lrg-12">
                            <DonutChartContainer />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <LineChartContainer />
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='DONATION.LIST.EMPTY_STATE.TITLE' actionLabel='DONATION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

PastGrantListTemplate.propTypes = {
    pastGrantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(PastGrantListTemplate);

