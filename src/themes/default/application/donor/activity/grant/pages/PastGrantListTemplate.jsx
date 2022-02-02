import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Export, BaasicTable, TableFilter, BaasicDropdown, FormatterResolver, BaasicButton, BaasicInput, NumberFormatInput, DateRangeQueryPicker } from 'core/components';
import { Content } from 'core/layouts';
import { ProgressLineTemplate } from '../components'

import {
	Chart,
	ChartArea,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartLegend,
	ChartSeries,
	ChartSeriesItem,
	ChartSeriesItemTooltip,
	//ChartSeriesLabels,
	ChartTooltip,
	ChartValueAxis,
	ChartValueAxisItem,
} from '@progress/kendo-react-charts';
import { isSome } from 'core/utils';
import moment from 'moment';

const PastGrantListTemplate = function ({ pastGrantViewStore, t }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		charityDropdownStore,
		donationTypeDropdownStore,
		donationStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		summaryData,
		exportConfig,
		donor,
		yearDropdownStore,
		onShowMoreOptionsClick,
		showMoreOptions,
		upcomingGrants
	} = pastGrantViewStore;
	//Color palette
	let colors = ["#99bdf3", "#F9EA9A", "#A8C69F", "#223A5E", "#C36C36", "#D8D4F2", "#E0EEC6", "#5DB7DE", "#CEB1BE"];

	let dataDonut = [];
	if (summaryData) {
		dataDonut = summaryData.donationsByCharityType.map(c => {
			return { charityType: c.charityType.name, value: c.amount, color: c.color, legend: `${c.charityType.name} ${summaryData ? ((c.amount / summaryData.totalMoneyGiven) * 100).toFixed(2) + '%' : c.charityType.name}` };
		});
	}
	for (let i = 0; i < dataDonut.length; i++) {
		dataDonut[i].color = colors[i];
	}

	//const labelContent = e => `${e.category}: \n $${e.value.toFixed(2)}`;
	const DonutChartContainer = () => {// eslint-disable-line
		return (
			<div className="u-mar--bottom--med">
				<p className="type--base">
					{t('DONATION.PAST_GRANT.LIST.SUMMARY.DONAUT_CHART_TITLE')}
				</p>
				<Chart style={{
					height: 250,
				}}>
					<ChartLegend position="right" visible={true} />
					<ChartArea background="none" />
					<ChartTooltip render={({ point }) => (
						point ? point.category + ' ' + '$' + point.value.toFixed(2) : null)}
					/>
					<ChartTooltip />
					<ChartSeries>
						<ChartSeriesItem
							type="donut"
							startAngle={150}
							data={dataDonut}
							categoryField="legend"
							field="value"
							colorField="color"
							border={'1px'}
						>
							{/* $${point.value.toFixed(2)} */}
							<ChartSeriesItemTooltip render={({ point }) => point ? <span>{point.dataItem.charityType}: <FormatterResolver item={{ amount: point.value }} field="amount" format={{ type: 'currency' }} /></span> : null} />
							{/* <ChartSeriesLabels position="outsideEnd" background="none" content={labelContent} /> */}
						</ChartSeriesItem>
					</ChartSeries>
				</Chart>
			</div>
		);
	};

	//let dataLine = [];
	// if (summaryData) {
	// 	categories = summaryData.donationsByTimePeriod.map(c => c.month);
	// 	//dataLine = summaryData.donationsByTimePeriod.map(c => c.amount);
	// };
	let categoriesMonths = [];
	if (window.innerWidth > 750) {
		categoriesMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	} else {
		categoriesMonths = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'];
	}
	let categoriesDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	let categoriesWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
	//let categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let dataGrants = [];
	let dataContributions = [];
	let chartDays = [];
	let categoriesYearToDate = [];
	let categoriesYears = [];

	function checkWeek(donor) {
		if (yearDropdownStore.value.id == 7 || yearDropdownStore.value.id == -7) {
			const todayDate = new Date();
			let dayOfWeek = todayDate.getDay();
			let counter = 0;
			if (dayOfWeek === 0) {
				chartDays = categoriesDays;
			} else {
				dayOfWeek += 1;
				while (counter < 7) {
					if (dayOfWeek < 7) {
						chartDays.push(categoriesDays[dayOfWeek++]);
						counter++;
					}
					else {
						dayOfWeek = 0;
					}
				}
			}
			if (yearDropdownStore.value.id == -7) {
				for (let i = 0; i < 7; i++) {
					dataGrants.push(donor.donationsPerPastWeek[i].grants[0]);
				}
				for (let i = 0; i < 7; i++) {
					dataContributions.push(donor.donationsPerPastWeek[i].contributions[0]);
				}
			} else {
				for (let i = 0; i < 7; i++) {
					dataGrants.push(donor.donationsPerWeek[i].grants[0]);
				}
				for (let i = 0; i < 7; i++) {
					dataContributions.push(donor.donationsPerWeek[i].contributions[0]);
				}
			}
		}
	}
	function checkMonth(donor) {
		if (yearDropdownStore.value.id === 30 || yearDropdownStore.value.id === -30) {
			if (yearDropdownStore.value.id == -30) {
				for (let i = 0; i < 4; i++) {
					dataGrants.push(donor.donationsPerPastMonth[i].grants[0]);
					dataContributions.push(donor.donationsPerPastMonth[i].contributions[0]);
				}
			} else {
				for (let i = 0; i < 4; i++) {
					dataGrants.push(donor.donationsPerMonth[i].grants[0]);
					dataContributions.push(donor.donationsPerMonth[i].contributions[0]);
				}
			}
		}
	}
	function checkYear(donor) {
		if (donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id)) {
			dataGrants = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).grants.slice();
		}
		if (donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id)) {
			dataContributions = donor.donationsPerYear.find(c => c.year === yearDropdownStore.value.id).contributions.slice();
		}
	}
	if (donor && donor.donationsPerYear.length > 0) {
		checkWeek(donor);
		checkMonth(donor);
		checkYear(donor);

		if (yearDropdownStore.value.id === 1) {
			const today = moment();
			const minDate = moment(donor.minDate);
			if (today.diff(minDate, 'days') < 7) {
				yearDropdownStore.value.id = 7;
				checkWeek(donor);
			} else if (today.diff(minDate, 'days') < 31) {
				yearDropdownStore.value.id = 30;
				checkMonth(donor);
			} else if (today.diff(minDate, 'days') < 366) {
				yearDropdownStore.value.id = donor.donationsPerYear[0].year;
				checkYear(donor);
			} else {
				let multipleYears = [];
				for (let i = 0; i < donor.donationsPerYear.length; i++) {
					multipleYears.push({ year: donor.donationsPerYear[i].year, grants: donor.donationsPerYear[i].grants.length > 0 ? donor.donationsPerYear[i].grants[donor.donationsPerYear[i].grants.length - 1] : 0, contributions: donor.donationsPerYear[i].contributions.length > 0 ? donor.donationsPerYear[i].contributions[donor.donationsPerYear[i].contributions.length - 1] : 0 });
					categoriesYears.push(donor.donationsPerYear[i].year);
					dataGrants.push(multipleYears[i].grants);
					dataContributions.push(multipleYears[i].contributions);
				}
			}
		}
		if (yearDropdownStore.value.id === 2) {
			const month = parseInt(moment().format("M"));
			if (month == 0) {
				yearDropdownStore.value.id = 30;
				checkMonth(donor);
			} else if (month == 11) {
				yearDropdownStore.value.id = new Date().getFullYear();
				checkYear(donor);
			} else {
				dataGrants = donor.donationsPerYear.find(c => c.year === (new Date()).getFullYear()).grants.slice(0, month);
				dataContributions = donor.donationsPerYear.find(c => c.year === (new Date()).getFullYear()).contributions.slice(0, month);
				categoriesYearToDate = categoriesMonths.slice(0, month);
			}
		}
	}

	if (yearDropdownStore && yearDropdownStore.value && yearDropdownStore.value.id != 1) {
		let previousYearGrants = 0, previousYearContributions = 0;
		if (donor && donor.donationsPerYear.length > 1) {
			if (yearDropdownStore.value.id > donor.donationsPerYear[0].year || yearDropdownStore.value.id == 2) {
				const previousYear = donor.donationsPerYear.find(c => c.year == (yearDropdownStore.value.id == 2 ? ((new Date().getFullYear()) - 1) : yearDropdownStore.value.id - 1));
				previousYearGrants = previousYear.grants[11] ? previousYear.grants[11] : 0;
				previousYearContributions = previousYear.contributions[11] ? previousYear.contributions[11] : 0;
			}
			if (dataGrants.length > 0)
				dataGrants = dataGrants.map(c => c - previousYearGrants);
			if (dataContributions.length > 0)
				dataContributions = dataContributions.map(c => c - previousYearContributions);

		} else {
			if (dataGrants.length > 0)
				dataGrants = dataGrants.map(c => dataGrants[dataGrants.length - 1] != (c - dataGrants[0]) ? (c - dataGrants[0]) : c);
			if (dataContributions.length > 0)
				dataContributions = dataContributions.map(c => dataContributions[dataContributions.length - 1] != (c - dataContributions[0]) ? (c - dataContributions[0]) : c);
		}
	}

	const labelVisual = (e) => {
		return `$${e.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
	};
	const currencyFormat = (e) => {
		return `$${e.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
	};

	let categoryDropDown = 0;
	if (donor && donor.isContributionMade) {
		if (yearDropdownStore.value.id && yearDropdownStore.value.id > 2000) {
			categoryDropDown = categoriesMonths;
		} else if (yearDropdownStore.value.id == 7 || yearDropdownStore.value.id == -7) {
			categoryDropDown = chartDays;
		} else if (yearDropdownStore.value.id === 1) {
			categoryDropDown = categoriesYears;
		} else if (yearDropdownStore.value.id === 2) {
			categoryDropDown = categoriesYearToDate
		} else {
			categoryDropDown = categoriesWeeks;
		}
	}

	const LineChartContainer = () => (
		<Chart style={{ height: 260 }}>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={categoryDropDown} />
			</ChartCategoryAxis>
			<ChartValueAxis>
				<ChartValueAxisItem labels={{ visible: true, content: labelVisual }} />
			</ChartValueAxis>
			<ChartTooltip
				render={({ point }) => (
					<FormatterResolver item={{ amount: point.value }} field="amount" format={{ type: 'currency' }} />
				)}
			/>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartSeries>
				<ChartSeriesItem color="#bc6d11" name={`Total contributed: ${dataContributions[dataContributions.length - 1] ? `${currencyFormat(dataContributions[dataContributions.length - 1])}` : '$' + (0).toFixed(2).toString()}`} type="line" data={dataContributions} />
				<ChartSeriesItem color="#223a5e" name={`Total granted: ${dataGrants[dataGrants.length - 1] ? `${currencyFormat(dataGrants[dataGrants.length - 1])}` : '$' + (0).toFixed(2).toString()}`} type="line" data={dataGrants} />
			</ChartSeries>
		</Chart>
	);

	return (
		<Content>
			<div className={`row u-mar--top--sml ${!showMoreOptions ? "u-mar--bottom--sml" : ""}`}>
				<div className="col col-sml-12 type--center">
					<button type="button" className={`btn btn--show btn--show--secondary type--wgt--medium ${showMoreOptions ? "show" : ""}`} onClick={onShowMoreOptionsClick}>
						<i className={!showMoreOptions ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
						{showMoreOptions ? 'HIDE EXPORT' : 'SHOW EXPORT'}
						<i className={!showMoreOptions ? "u-icon u-icon--base u-icon--arrow-down--primary" : "u-icon u-icon--base u-icon--arrow-down--primary u-rotate--180"}></i>
					</button>
				</div>
			</div>
			{showMoreOptions ?
				<div className={`card--primary card--med u-mar--bottom--sml ${showMoreOptions ? "show" : ""}`}>
					<Export config={exportConfig} hideLimit={true} />
				</div>
				: null}

			<div className="row">
				<div className="col col-sml-12 col-xxxlrg-8 u-mar--bottom--med">
					<div className="card--primary card--med">
						<div className="u-mar--bottom--med">
							<TableFilter colClassName={"col col-sml-12 col-lrg-12"} queryUtility={queryUtility}>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown store={charityDropdownStore} />
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown store={donationTypeDropdownStore} />
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown store={donationStatusDropdownStore} />
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="dollarRange"
										value={queryUtility.filter.dollarRange || ''}
										onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
										placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="grantMemo"
										className="input input--lrg"
										value={queryUtility.filter.grantMemo || ''}
										onChange={event => (queryUtility.filter.grantMemo = event.target.value)}
										placeholder="GRANT.LIST.FILTER.GRANT_MEMO_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="confirmationNumber"
										className="input input--lrg"
										value={queryUtility.filter.confirmationNumber || ''}
										onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
										placeholder="GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<NumberFormatInput
										className="input input--lrg"
										value={queryUtility.filter.bookletCertificateCode}
										onChange={event => (queryUtility.filter.bookletCertificateCode = event.formattedValue)}
										format="#####-##"
										mask=""
									/>
								</div>
								<div className="col col-sml-12 u-mar--bottom--sml">
									<div className="row row--form">
										<div className="col col-sml-12 col-lrg-8">
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
						<BaasicTable
							authorization={authorization}
							tableStore={tableStore}
							actionsComponent={renderActions} />
					</div>
				</div>
				<div className="col col-sml-12 col-xxxlrg-4 u-mar--bottom--med">
					<div className={`card--primary card--med ${!summaryData && "fullheight"}`}>
						<h4 className="type--med type--wgt--medium u-mar--bottom--med">
							{t('DONATION.PAST_GRANT.LIST.SUMMARY.TITLE')}
						</h4>
						{summaryData ? (
							<React.Fragment>
								<div className="summary__wrapper">
									<div className="summary__card summary__card--primary">
										<div className="summary__card__amount summary__card__amount--secondary--primary">
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

									<div className="summary__card summary__card--secondary">
										<div className="summary__card__amount summary__card__amount--secondary">
											{summaryData && (
												<FormatterResolver
													item={{ amount: upcomingGrants }}
													field="amount"
													format={{ type: 'currency' }}
												/>
											)}
											<p className="type--xsml type--wgt--medium type--color--note"> Total money upcoming this year</p>
										</div>
									</div>
								</div>

								<div className="u-mar--bottom--med">
									<ProgressLineTemplate summaryData={summaryData} />
									<DonutChartContainer />
									<div>
										<p className="type--base type--wgt--medium u-mar--bottom--sml">
											{t('DONATION.PAST_GRANT.LIST.SUMMARY.LINE_CHART_TITLE')}
										</p>
										<div className="u-display--flex row__align--center">
											<span className="type--sml type--wgt--medium u-mar--right--sml">Total Given</span>
											{donor && donor.isContributionMade &&
												<BaasicDropdown className="form-field--sml" store={yearDropdownStore} />
											}
										</div>
										<LineChartContainer />
									</div>
								</div>
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

PastGrantListTemplate.propTypes = {
	pastGrantViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onPreview, onCancel, onGrantAgain } = actions;
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
						icon="u-icon u-icon--cancel u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.CANCEL"
						onlyIcon={true}
						onClick={() => onCancel(item)}
					></BaasicButton>
				) : null}
				<BaasicButton
					className="btn btn--icon"
					onlyIconClassName="u-mar--right--tny"
					icon="u-icon u-icon--approve u-icon--base"
					label="Grant Again"
					onlyIcon={true}
					onClick={() => onGrantAgain(item)}
				></BaasicButton>
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

export default defaultTemplate(PastGrantListTemplate);
