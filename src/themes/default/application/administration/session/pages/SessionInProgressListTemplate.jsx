import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, TableFilter, EmptyState, BaasicButton } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { isSome } from 'core/utils';

const SessionInProgressListTemplate = function({ sessionInProgressViewStore }) {
	const { tableStore, routes, queryUtility, authorization } = sessionInProgressViewStore;

	return (
		<Content emptyRenderer={renderEmpty(routes)}>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="u-mar--bottom--med">
					<TableFilter queryUtility={queryUtility}></TableFilter>
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
			title="SESSION.LIST.IN_PROGRESS.EMPTY_STATE.TITLE"
			actionLabel="SESSION.LIST.IN_PROGRESS.EMPTY_STATE.ACTION"
			callToAction={routes.create}
		/>
	);
}

SessionInProgressListTemplate.propTypes = {
	sessionInProgressViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onSetInactive, onRemove } = actions;
	if (!isSome(onSetInactive) && !isSome(onRemove)) return null;

	let setInactiveRender = true;
	let removeFromCacheRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onSetInactiveRender) {
			setInactiveRender = actionsRender.onSetInactiveRender(item);
		}
		if (actionsRender.onRemoveFromCacheRender) {
			removeFromCacheRender = actionsRender.onRemoveFromCacheRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onSetInactive) && setInactiveRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--decline u-icon--sml"
						label="SESSION.LIST.IN_PROGRESS.BUTTON.SET_INACTIVE"
						onlyIcon={true}
						onClick={() => onSetInactive(item)}
					></BaasicButton>
				) : null}
				{isSome(onRemove) && removeFromCacheRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--delete u-icon--sml"
						label="SESSION.LIST.IN_PROGRESS.BUTTON.REMOVE_FROM_CACHE"
						onlyIcon={true}
						onClick={() => onRemove(item)}
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

export default defaultTemplate(SessionInProgressListTemplate);
