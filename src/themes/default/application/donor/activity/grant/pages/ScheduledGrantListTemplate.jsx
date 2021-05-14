import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, BaasicDropdown, DateRangeQueryPicker, BaasicInput, TableFilter, EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const ScheduledGrantListTemplate = function ({ scheduledGrantViewStore }) {
	const { tableStore, routes, queryUtility, authorization, dateCreatedDateRangeQueryStore, charityDropdownStore } = scheduledGrantViewStore;

	return (
		<Content emptyRenderer={renderEmpty(routes)}>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="u-mar--bottom--med">
					<TableFilter queryUtility={queryUtility}>
						{/* <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicDropdown store={charityDropdownStore} />
						</div> */}
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicInput
								id="dollarRange"
								value={queryUtility.filter.dollarRange || ''}
								onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
								placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
							/>
						</div>
						{/* <div className="col col-sml-12 u-mar--bottom--sml">
							<div className="row">
								<div className="col col-sml-12 col-lrg-8">
									<DateRangeQueryPicker
										queryUtility={queryUtility}
										store={dateCreatedDateRangeQueryStore}
										fromPropertyName="dateCreatedFrom"
										toPropertyName="dateCreatedTo"
									/>
								</div>
							</div>
						</div> */}
					</TableFilter>
				</div>
				<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
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

	const { onEdit, onCancel } = actions;
	if (!isSome(onEdit) && !isSome(onCancel)) return null;

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
						icon="u-icon u-icon--close u-icon--base"
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
