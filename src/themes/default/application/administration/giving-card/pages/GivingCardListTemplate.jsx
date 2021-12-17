import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const GivingCardListTemplate = function({ givingCardViewStore }) {
	const { tableStore, authorization, queryUtility } = givingCardViewStore;

	return (
		<ApplicationListLayout store={givingCardViewStore} authorization={authorization}>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter colClassName={"col col-sml-12 col-lrg-6"} queryUtility={queryUtility}></TableFilter>
					</div>

					<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
				</div>
			</Content>
		</ApplicationListLayout>
	);
};

GivingCardListTemplate.propTypes = {
	givingCardViewStore: PropTypes.object.isRequired,
};

function renderActions({ item, actions }) {
	if (!isSome(actions)) return null;

	const { onToggleLock, onToggleActivate } = actions;
	if (!isSome(onToggleLock) && !isSome(onToggleActivate)) return null;
	if (!isSome(onToggleLock)) return null;

	return (
		<td>
			<div className="type--right">
				{isSome(onToggleLock) ? (
					<BaasicButton
						className="btn btn--icon"
						icon={`u-icon u-icon--${item.isLockedOut ? 'unlock' : 'lock'} u-icon--base`}
						label={`${item.isLockedOut ? 'UNLOCK' : 'LOCK'}`}
						onlyIcon={true}
						onClick={() => onToggleLock(item)}
					></BaasicButton>
				) : null}
				{
					item.donorGivingCardSetting &&item.donorGivingCardSetting.donor && item.donorGivingCardSetting.donor.id ? (
						<BaasicButton
						className="btn btn--icon"
						icon={`u-icon u-icon--${item.isActivated ? 'decline' : 'approve'} u-icon--base`}
						label={`${item.isActivated ? 'INACTIVATE' : 'ACTIVATE'}`}
						onlyIcon={true}
						onClick={() => onToggleActivate(item)}
					></BaasicButton>
					) : null
				}
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

export default defaultTemplate(GivingCardListTemplate);
