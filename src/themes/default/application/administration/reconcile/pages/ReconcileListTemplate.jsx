import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { isSome } from 'core/utils';
import { ReconcileEdit } from 'application/administration/reconcile/components';
import { ReconcilePreviewTemplate } from 'themes/application/administration/reconcile/components';

const ReconcileListTemplate = function ({ reconcileViewStore }) {
	const { tableStore, queryUtility, authorization, editModal, previewModal } = reconcileViewStore;

	return (
		<ApplicationListLayout store={reconcileViewStore} authorization={authorization}>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter queryUtility={queryUtility}></TableFilter>
					</div>
					<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
				</div>
			</Content>
			<BaasicModal modalParams={editModal}>
				<ReconcileEdit />
			</BaasicModal>
			<BaasicModal modalParams={previewModal}>
				<ReconcilePreviewTemplate />
			</BaasicModal>
		</ApplicationListLayout>
	);
};

ReconcileListTemplate.propTypes = {
	reconcileViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onPreview, onCash, onPrintReport } = actions;
	if (!isSome(onEdit) && !isSome(onPreview) && !isSome(onCash) && !isSome(onPrintReport)) return null;

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

	let cashRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onCashRender) {
			cashRender = actionsRender.onCashRender(item);
		}
	}

	let printReportRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPrintReportRender) {
			printReportRender = actionsRender.onPrintReportRender(item);
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
						label="RECONCILE.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onPreview) && previewRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--preview u-icon--base"
						label="RECONCILE.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
				{isSome(onCash) && cashRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base"
						label="RECONCILE.LIST.BUTTON.CASH"
						onlyIcon={true}
						onClick={() => onCash(item)}
					></BaasicButton>
				) : null}
				{isSome(onPrintReport) && printReportRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--approve u-icon--base"
						label="RECONCILE.LIST.BUTTON.PRINT"
						onlyIcon={true}
						onClick={() => onPrintReport(item)}
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

export default defaultTemplate(ReconcileListTemplate);
