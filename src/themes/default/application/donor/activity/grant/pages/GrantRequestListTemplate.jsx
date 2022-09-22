import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { GrantCreateOverviewTemplate } from 'themes/application/donor/grant/components';

const GrantRequestListTemplate = function({ grantRequestViewStore, t }) {
	const { tableStore, queryUtility, authorization, grantCreateOverviewModal, onConfirm } = grantRequestViewStore;

	return (
		<Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="u-mar--bottom--med">
					<TableFilter colClassName={""} queryUtility={queryUtility}></TableFilter>
				</div>
				<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
			</div>
			<BaasicModal modalParams={grantCreateOverviewModal}>
				<GrantCreateOverviewTemplate>
					<BaasicButton
						type="button"
						className="btn btn--base btn--primary u-mar--right--sml"
						onClick={onConfirm}
						label={t('FORM_CONTROLS.CONFIRM_BUTTON')}
					/>
				</GrantCreateOverviewTemplate>
			</BaasicModal>
		</Content>
	);
};

GrantRequestListTemplate.propTypes = {
	grantRequestViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onComplete, onDecline } = actions;
	if (!isSome(onEdit) && !isSome(onComplete) && !isSome(onDecline)) return null;

	let editRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onEditRender) {
			editRender = actionsRender.onEditRender(item);
		}
	}

	let completeRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onCompleteRender) {
			completeRender = actionsRender.onCompleteRender(item);
		}
	}

	let declineRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDeclineRender) {
			declineRender = actionsRender.onDeclineRender(item);
		}
	}

	return (
		<td>
			<div className="u-push">
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--edit u-icon--base"
						label="GRANT_REQUEST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onComplete) && completeRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base"
						label="GRANT_REQUEST.BUTTON.COMPLETE"
						onlyIcon={true}
						onClick={() => onComplete(item)}
					></BaasicButton>
				) : null}
				{isSome(onDecline) && declineRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--decline u-icon--base"
						label="GRANT_REQUEST.BUTTON.DECLINE"
						onlyIcon={true}
						onClick={() => onDecline(item)}
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

export default defaultTemplate(GrantRequestListTemplate);
