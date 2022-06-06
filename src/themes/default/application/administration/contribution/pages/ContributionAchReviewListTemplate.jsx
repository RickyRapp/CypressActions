import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicModal,
	BaasicTable,
} from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { isSome } from 'core/utils';
import { ReconcilePreviewTemplate } from '../../reconcile/components';

const ContributionAchReviewListTemplate = function ({ contributionAchReviewListViewStore, t }) {
	const {
		authorization,
        tableStore,
		previewModal
	} = contributionAchReviewListViewStore;

	return (
		<React.Fragment>
			<ApplicationListLayout store={contributionAchReviewListViewStore} authorization={authorization} >
                <Content>
                    <div className="card--tertiary card--med u-mar--bottom--sml">
                     <BaasicTable
                        authorization={authorization} 
                        tableStore={tableStore} 
						actionsComponent={renderActions}
                    />
                    </div>
                </Content>
				
			</ApplicationListLayout>
		</React.Fragment>
	);
};

ContributionAchReviewListTemplate.propTypes = {
	contributionAchReviewListViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};



function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onConfirm, onPreview, onPrintReport } = actions;
	if (!isSome(onConfirm) && !isSome(onPreview) && !isSome(onPrintReport)) return null;


	let previewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPreviewRender) {
			previewRender = actionsRender.onPreviewRender(item);
		}
	}

	let confirmRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onConfirmRender) {
			confirmRender = actionsRender.onConfirmRender(item);
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
				{isSome(onPreview) && previewRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--preview u-icon--base"
						label="RECONCILE.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
				{isSome(onConfirm) && confirmRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--cash u-icon--money u-icon--base"
						label="RECONCILE.LIST.BUTTON.CASH"
						onlyIcon={true}
						onClick={() => onConfirm(item)}
					></BaasicButton>
				) : null}
				{isSome(onPrintReport) && printReportRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--print u-icon--base"
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

export default defaultTemplate(ContributionAchReviewListTemplate);
