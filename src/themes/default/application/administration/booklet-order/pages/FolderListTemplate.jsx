import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable } from 'core/components';
import { isSome } from 'core/utils';
import { Content, PageHeader } from 'core/layouts';

const FolderListTemplate = function({ folderListViewStore }) {
	const { routes, tableStore } = folderListViewStore;

	return (
		<React.Fragment>
			<PageHeader routes={routes}></PageHeader>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<BaasicTable
						tableStore={tableStore}
						loading={tableStore.loading}
						className="k-grid--actions"
						actionsComponent={renderActions}
					/>
					{/* <BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} /> */}
				</div>
			</Content>
			{/* <BaasicModal modalParams={selectDonorModal}>
					<SelectDonor />
				</BaasicModal> */}
		</React.Fragment>
	);
};

FolderListTemplate.propTypes = {
	bookletOrderViewStore: PropTypes.object.isRequired,
	folderListViewStore: PropTypes.any,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onReview, onDetails, onCancel } = actions;
	if (!isSome(onEdit) && !isSome(onReview) && !isSome(onDetails) && isSome(onCancel)) return null;

	let editRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onEditRender) {
			editRender = actionsRender.onEditRender(item);
		}
	}

	let reviewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onReviewRender) {
			reviewRender = actionsRender.onReviewRender(item);
		}
	}

	let detailsRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDetailsRender) {
			detailsRender = actionsRender.onDetailsRender(item);
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
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--cancel u-icon--base"
						label="BOOKLET_ORDER.LIST.BUTTON.CANCEL"
						onlyIcon={true}
						onClick={() => onCancel(item)}
					></BaasicButton>
				) : null}
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base u-mar--left--tny"
						label="BOOKLET_ORDER.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onReview) && reviewRender ? (
					<BaasicButton
						authorization="theDonorsFundAdministrationSection.update"
						className="btn btn--icon"
						icon="u-icon u-icon--approve u-icon--base u-mar--left--tny"
						label="BOOKLET_ORDER.LIST.BUTTON.REVIEW"
						onlyIcon={true}
						onClick={() => onReview(item.id)}
					></BaasicButton>
				) : null}
				{isSome(onDetails) && detailsRender ? (
					<BaasicButton
						authorization="theDonorsFundAdministrationSection.read"
						className="btn btn--icon"
						icon="u-icon u-icon--preview u-icon--base u-mar--left--tny"
						label="BOOKLET_ORDER.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onDetails(item.id)}
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

export default defaultTemplate(FolderListTemplate);
