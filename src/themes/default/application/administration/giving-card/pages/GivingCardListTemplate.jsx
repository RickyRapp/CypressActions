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
						<TableFilter queryUtility={queryUtility}></TableFilter>
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

	const { onToggleLock } = actions;
	if (!isSome(onToggleLock)) return null;

	return (
		<td>
			<div className="type--right">
				{isSome(onToggleLock) ? (
					<BaasicButton
						className="btn btn--icon"
						icon={`u-icon u-icon--${item.isLockedOut ? 'unlock' : 'lock'} u-icon--sml`}
						label={`FIDELITY_RECOMMENDATION_CARD.LIST.BUTTON.${item.isLockedOut ? 'UNLOCK' : 'LOCK'}`}
						onlyIcon={true}
						onClick={() => onToggleLock(item)}
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

export default defaultTemplate(GivingCardListTemplate);
