import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, BaasicDropdown, DateRangeQueryPicker, BaasicInput, TableFilter, EmptyState, FormatterResolver } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { BaasicSwitchTemplate } from 'themes/components';


const ScheduledGrantListTemplate = function ({ scheduledGrantViewStore }) {
	const { tableStore, routes, queryUtility, authorization, dateCreatedDateRangeQueryStore, charityDropdownStore,fetchSwitchType,summaryData } = scheduledGrantViewStore;
	var totalAmount = 0;
	if (summaryData) {
		summaryData.forEach(c =>
			{
				totalAmount+=c.amount;
			})
	}
	return (
		<Content emptyRenderer={renderEmpty(routes)}>
			<div className="row row--form">
				<div className="col col-sml-12 col-xxxlrg-8 u-mar--bottom--med">
					<div className="card--primary card--med">
						<div className="u-mar--bottom--med">
							<TableFilter
								colClassName={"col col-sml-12 col-lrg-8"}
								queryUtility={queryUtility}
								secondColClassName={"col col-sml-12 col-lrg-4"}
								additionalComponent={
									<BaasicSwitchTemplate secondarySwitch firstLabel={"Finished"} secondLabel={"Active"} value={queryUtility.filter.done}
									 onChange={()=>{fetchSwitchType()}} />
								}
							>
								{<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown store={charityDropdownStore} />
								</div>}
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="dollarRange"
										value={queryUtility.filter.dollarRange || ''}
										onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
										placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
									/>
								</div>
								{<div className="col col-sml-12 u-mar--bottom--sml">
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
								</div>}
							</TableFilter>
						</div>
						<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
					</div>
				</div>
					<div className="col col-sml-12 col-xxxlrg-4 u-mar--bottom--med">
					<div className={`card--primary card--med ${!summaryData && "fullheight"}`}>
						<h4 className="type--med type--wgt--medium u-mar--bottom--med">
							 {/* {t('DONATION.PAST_GRANT.LIST.SUMMARY.TITLE')}   */}
							 Summary
						</h4>
						 {summaryData ? (
							<React.Fragment>
								<div className="summary__wrapper">
									<div className="summary__card summary__card--secondary">
										<div className="summary__card__amount summary__card__amount--secondary--secondary">
											{summaryData && (
												<FormatterResolver
													item={{ amount: totalAmount }}
													field="amount"
													format={{ type: 'currency' }}
												/>
											)}
											<p className="type--xsml type--wgt--medium type--color--text">Total money given this year</p>
										</div>
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

function renderEmpty(routes) {
	return (
		<EmptyState
			image={EmptyIcon}
			title="SCHEDULED_GRANT.LIST.EMPTY_STATE.TITLE"
			actionLabel="SCHEDULED_GRANT.LIST.EMPTY_STATE.ACTION"
			callToAction={routes.create}
		/>
	);
}

ScheduledGrantListTemplate.propTypes = {
	scheduledGrantViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onPreview, onEdit, onCancel } = actions;
	if (!isSome(onEdit) && !isSome(onPreview) && !isSome(onCancel)) return null;

	let previewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPreviewRender) {
			previewRender = actionsRender.onPreviewRender(item);
		}
	}

	let editRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onEditRender) {
			editRender = actionsRender.onEditRender(item);
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
				{isSome(onPreview) && previewRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--preview u-icon--base"
						label="SCHEDULED_GRANT.LIST.BUTTON.VIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base"
						label="SCHEDULED_GRANT.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--cancel u-icon--base u-mar--left--sml"
						label="SCHEDULED_GRANT.LIST.BUTTON.CANCEL"
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

export default defaultTemplate(ScheduledGrantListTemplate);
