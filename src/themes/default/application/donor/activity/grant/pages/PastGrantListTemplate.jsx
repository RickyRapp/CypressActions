import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicTable,
    TableFilter,
    BaasicDropdown,
    FormatterResolver,
    BaasicButton
} from 'core/components';
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
    ChartTitle,
    ChartTooltip
} from '@progress/kendo-react-charts';
import { Slider, SliderLabel } from '@progress/kendo-react-inputs';
import { isSome } from 'core/utils';

const PastGrantListTemplate = function ({ pastGrantViewStore, t }) {
    const {
        tableStore,
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

    const labelContent = (e) => (`${e.category}: \n $${e.value.toFixed(2)}`);
    const DonutChartContainer = () => {
        return (
            <Chart>
                <ChartTitle text={t('DONATION.PAST_GRANT.LIST.SUMMARY.DONAUT_CHART_TITLE')} />
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
            <ChartTitle text={t('DONATION.PAST_GRANT.LIST.SUMMARY.LINE_CHART_TITLE')} />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} />
            </ChartCategoryAxis>
            <ChartTooltip render={({ point }) => <FormatterResolver item={{ amount: point.value }} field='amount' format={{ type: 'currency' }} />} />
            <ChartSeries>
                <ChartSeriesItem type="line" data={dataLine} />
            </ChartSeries>
        </Chart>
    );

    return (
        <Content>
            <div className="card--tertiary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                        <BaasicDropdown store={charityDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                        <BaasicDropdown store={donationTypeDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                        <BaasicDropdown store={donationStatusDropdownStore} />
                    </div>
                </TableFilter>
            </div>
            <div className="row">
                <div className="col col-sml-12 col-xxlrg-8 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                        />
                    </div>
                </div>
                <div className="col col-sml-12 col-xxlrg-4 u-mar--bottom--med">
                    <div className="card--primary card--med">
                        <h4 className="type--med type--wgt--medium u-mar--bottom--med">{t('DONATION.PAST_GRANT.LIST.SUMMARY.TITLE')}</h4>
                        <div className="row">
                            <div className="col col-sml-12 col-lrg-6 u-mar--bottom--med">
                                <div className="card--secondary card--med type--center">
                                    <div className="type--xxlrg type--wgt--medium type--color--text">
                                        {summaryData &&
                                            <FormatterResolver
                                                item={{ amount: summaryData.totalMoneyGiven }}
                                                field='amount'
                                                format={{ type: 'currency' }} />}
                                        <p className="type--xsml type--wgt--medium type--color--text">Total money given</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-sml-12 col-lrg-6 u-mar--bottom--med">
                                <div className="card--secondary--light card--med type--center">
                                    <div className="type--xxlrg type--wgt--medium type--color--note">
                                        {summaryData &&
                                            <FormatterResolver
                                                item={{ amount: summaryData.totalMoneyUpcoming }}
                                                field='amount'
                                                format={{ type: 'currency' }} />}
                                        <p className="type--xsml type--wgt--medium type--color--note"> Total money upcoming</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-sml-12 col-lrg-12">
                                <span>{t('DONATION.PAST_GRANT.LIST.SUMMARY.SLIDER_LABEL')}</span>
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
            </div>
        </Content>
    )
};

PastGrantListTemplate.propTypes = {
    pastGrantViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onPreview, onCancel } = actions;
    if (!isSome(onEdit) && !isSome(onPreview) && !isSome(onCancel)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let previewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onPreviewRender) {
            previewRender = actionsRender.onPreviewRender(item);
        }
    }

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = actionsRender.onCancelRender(item);
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onPreview) && previewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.PREVIEW'
                        onlyIcon={true}
                        onClick={() => onPreview(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--close u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.CANCEL'
                        onlyIcon={true}
                        onClick={() => onCancel(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(PastGrantListTemplate);

