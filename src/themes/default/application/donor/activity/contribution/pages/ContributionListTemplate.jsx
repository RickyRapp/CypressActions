import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	DateRangeQueryPicker,
	FormatterResolver
} from 'core/components';
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
	ChartTooltip,
} from '@progress/kendo-react-charts';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const ContributionListTemplate = function ({ contributionViewStore, t }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		paymentTypeDropdownStore,
		contributionStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		summaryData,
		depositTab,
		setDepositTab,
		timelineSummary
		//sumYear
	} = contributionViewStore;

	const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
 	];

	let dataDonut = [];
	if (summaryData) {
		dataDonut = summaryData.donationsByCharityType.map(c => {
			return { charityType: c.charityType.name, value: c.amount, color: c.color };
		});
	}
	const labelContent = e => `${e.category}: \n $${e.value.toFixed(2)}`;
	const DonutChartContainer = () => {
		return (
			<Chart>
				<ChartTitle text={t('DONATION.PAST_GRANT.LIST.SUMMARY.DONAUT_CHART_TITLE')} />
				<ChartLegend visible={false} />
				<ChartArea background="none" />
				<ChartSeries>
					<ChartSeriesItem
						type="donut"
						startAngle={150}
						data={dataDonut}
						categoryField="charityType"
						field="value"
						colorField="color"
					>
						<ChartSeriesLabels position="outsideEnd" background="none" content={labelContent} />
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

	const LineChartContainer = () => (// eslint-disable-line
		<Chart>
			<ChartTitle text={t('DONATION.PAST_GRANT.LIST.SUMMARY.LINE_CHART_TITLE')} />
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={categories} />
			</ChartCategoryAxis>
			<ChartTooltip
				render={({ point }) => (
					<FormatterResolver item={{ amount: point.value }} field="amount" format={{ type: 'currency' }} />
				)}
			/>
			<ChartSeries>
				<ChartSeriesItem type="line" color="#bc6d11" data={dataLine} />
			</ChartSeries>
		</Chart>
	);

	return (
		<Content>
			<div className="row">
				<div className="col col-sml-12 col-xxlrg-8 u-mar--bottom--med">
					<div className="u-mar--top--sml u-mar--bottom--sml">
						<BaasicButton
							type="button"
							className={depositTab === 0 ? "btn btn--med btn--med--wide btn--primary" : "btn btn--med btn--med--wide btn--tertiary u-mar--left--med"}
							onClick={() => setDepositTab(0)}
							// onClick={onSubmitClick}
							// form={form} onSubmit={onSubmitClick}
							label="CONTRIBUTION.LIST.OVERVIEW-TRANSACTIONS" />
						<BaasicButton
							type="button"
							className={depositTab === 1 ? "btn btn--med btn--med--wide btn--primary" : "btn btn--med btn--med--wide btn--tertiary u-mar--left--med"}
							onClick={() => setDepositTab(1)}
							// onClick={onSubmitClick}
							// form={form} onSubmit={onSubmitClick}
							label="CONTRIBUTION.LIST.BY-TIMELINE" />
					</div>
				</div>
				<div className="col col-sml-12 col-xxlrg-8 u-mar--bottom--med">
					{depositTab === 0 ? <div className="card--tertiary card--med u-mar--bottom--sml">
						<div className="u-mar--bottom--med">
							<TableFilter queryUtility={queryUtility}>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml ">
									<BaasicInput
										id="confirmationNumber"
										className="input input--lrg"
										value={queryUtility.filter.confirmationNumber || ''}
										onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
										placeholder="CONTRIBUTION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="paymentNumber"
										className="input input--lrg"
										value={queryUtility.filter.paymentNumber || ''}
										onChange={event => (queryUtility.filter.paymentNumber = event.target.value)}
										placeholder="CONTRIBUTION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown
										store={paymentTypeDropdownStore}
										placeholder="CONTRIBUTION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown
										store={contributionStatusDropdownStore}
										placeholder="CONTRIBUTION.LIST.FILTER.CONTRIBUTION_STATUS_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="nameOnCheck"
										className="input input--lrg"
										value={queryUtility.filter.nameOnCheck || ''}
										onChange={event => (queryUtility.filter.nameOnCheck = event.target.value)}
										placeholder="CONTRIBUTION.LIST.FILTER.NAME_ON_CHECK_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="dollarRange"
										value={queryUtility.filter.dollarRange || ''}
										onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
										placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 u-mar--bottom--sml">
									<div className="row row--form">
										<div className="col col-sml-12 col-lrg-6">
											<DateRangeQueryPicker
												queryUtility={queryUtility}
												store={dateCreatedDateRangeQueryStore}
												fromPropertyName="dateCreatedFrom"
												toPropertyName="dateCreatedTo"
											/>
										</div>
									</div>
								</div>
							</TableFilter>
						</div>
						<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
					</div> :
					<div className="card--tertiary card--med u-mar--bottom--sml">
						<table className="table--secondary u-mar--bottom--med">
                    <thead className="table--secondary__thead">
                        <tr>
                            <th className="table--secondary__th">Time Period</th>
                            <th className="table--secondary__th">Amount by Period</th>
                        </tr>
                    </thead>
                    <tbody className="table--secondary__tbody">
						{timelineSummary && timelineSummary.map(x => 
							 <tr className="table--secondary__row">
                            <th className="table--secondary__th">{monthNames[x.month - 1]} {(new Date()).getFullYear()}</th>
                            <td className="table--secondary__td">${x.sumByMonth.toFixed(2)}</td>
                        </tr>)
						}
                        
                    </tbody>
                    <tfoot className="table--secondary__tfoot">
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">
                                Current timeline period:
                            </th>
                            <th className="table--secondary__th">
                                {(new Date()).getFullYear()}
                            </th>
                        </tr>
                    </tfoot>
                </table>
					</div> 
					 }
				</div>
				<div className="col col-sml-12 col-xxlrg-4 u-mar--bottom--med">
					<div className={`card--primary card--med ${!summaryData && "fullheight"}`}>
						<h4 className="type--med type--wgt--medium u-mar--bottom--med">
							{t('DONATION.PAST_GRANT.LIST.SUMMARY.TITLE')}
						</h4>
						{summaryData ? (
							<React.Fragment>
								<div className="row">
									<div className="col col-sml-12 col-lrg-6 u-mar--bottom--med">
										<div className="card--secondary card--med type--center">
											<div className="type--xxlrg type--wgt--medium type--color--text">
												{summaryData && (
													<FormatterResolver
														item={{ amount: summaryData.totalMoneyGiven }}
														field="amount"
														format={{ type: 'currency' }}
													/>
												)}
												<p className="type--xsml type--wgt--medium type--color--text">Total money given</p>
											</div>
										</div>
									</div>

									<div className="col col-sml-12 col-lrg-6 u-mar--bottom--med">
										<div className="card--secondary--light card--med type--center">
											<div className="type--xxlrg type--wgt--medium type--color--note">
												{summaryData && (
													<FormatterResolver
														item={{ amount: summaryData.totalMoneyUpcoming }}
														field="amount"
														format={{ type: 'currency' }}
													/>
												)}
												<p className="type--xsml type--wgt--medium type--color--note"> Total money upcoming</p>
											</div>
										</div>
									</div>
								</div>
								{/* <div className="row u-mar--bottom--med">
									<div className="col col-sml-12 col-lrg-12">
										<span>{t('DONATION.PAST_GRANT.LIST.SUMMARY.SLIDER_LABEL')}</span>
										{summaryData && (
											<Slider
												buttons={false}
												step={1}
												defaultValue={summaryData.totalMoneyGivenThisYear}
												min={0}
												max={summaryData.totalMoneyUpcomingThisYear}
												disabled={true}
											>
												<SliderLabel position={0}>
													{(summaryData.totalMoneyGivenThisYear / summaryData.totalMoneyUpcomingThisYear) * 100}%
												</SliderLabel>

												<SliderLabel position={summaryData.totalMoneyUpcomingThisYear}>
													${summaryData.totalMoneyUpcomingThisYear}
												</SliderLabel>
											</Slider>
										)}
									</div>
								</div> */}
								<div className="u-mar--bottom--med">
									<DonutChartContainer />
								</div>
								{/* <div className="row">
									<div className="col col-sml-12 col-lrg-12">
										<LineChartContainer />
									</div>
								</div> */}
							</React.Fragment>
						) : (
							<div className="card--med">
								<p className="type--sml type--wgt--bold type--color--opaque">No activity yet.</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Content>
	);
};

ContributionListTemplate.propTypes = {
	contributionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onReview, onPreview, onCancel } = actions;
	if (!isSome(onEdit) && !isSome(onReview) && !isSome(onPreview) && !isSome(onCancel)) return null;

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
	// added Cancel per ticket #74959
	if (isSome(actionsRender)) {
		if (actionsRender.onCancelRender) {
			cancelRender = (item.contributionStatus.abrv === 'pending');
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--edit u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onPreview) && previewRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--preview u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--close u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.CANCEL"
						onlyIcon={true}
						onClick={() => onCancel(item)}
					></BaasicButton>
				) : null}
			</div>
		</td>
	);
}

renderActions.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
	actionsRender: PropTypes.object,
	authorization: PropTypes.any,
};

export default defaultTemplate(ContributionListTemplate);
