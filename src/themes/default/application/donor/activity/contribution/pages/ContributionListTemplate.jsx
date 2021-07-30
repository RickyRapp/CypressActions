import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	DateRangeQueryPicker,
} from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const ContributionListTemplate = function({ contributionViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		paymentTypeDropdownStore,
		contributionStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
	} = contributionViewStore;

	return (
		<Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="u-mar--bottom--med">
					<TableFilter queryUtility={queryUtility}>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml ">
							<BaasicInput
								id="confirmationNumber"
								className="input input--lrg"
								value={queryUtility.filter.confirmationNumber || ''}
								onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
								placeholder="CONTRIBUTION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicInput
								id="paymentNumber"
								className="input input--lrg"
								value={queryUtility.filter.paymentNumber || ''}
								onChange={event => (queryUtility.filter.paymentNumber = event.target.value)}
								placeholder="CONTRIBUTION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicDropdown
								store={paymentTypeDropdownStore}
								placeholder="CONTRIBUTION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicDropdown
								store={contributionStatusDropdownStore}
								placeholder="CONTRIBUTION.LIST.FILTER.CONTRIBUTION_STATUS_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
							<BaasicInput
								id="nameOnCheck"
								className="input input--lrg"
								value={queryUtility.filter.nameOnCheck || ''}
								onChange={event => (queryUtility.filter.nameOnCheck = event.target.value)}
								placeholder="CONTRIBUTION.LIST.FILTER.NAME_ON_CHECK_PLACEHOLDER"
							/>
						</div>
						<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="dollarRange"
										value={queryUtility.filter.dollarRange || ''}
										onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
										placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
									/>
								</div>
						<div className="col col-sml-12 u-mar--bottom--sml">
							<div className="row row--form">
								<div className="col col-sml-12 col-lrg-6">
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
				<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
			</div>
		</Content>
	);
};

ContributionListTemplate.propTypes = {
	contributionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onReview, onPreview, onCancel } = actions;
	if (!isSome(onEdit) && !isSome(onReview) && !isSome(onPreview) && !isSome(onCancel)) return null;

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
	// added Cancel per ticket #74959
	if (isSome(actionsRender)) {
		if (actionsRender.onCancelRender) {
			cancelRender = (item.contributionStatus.abrv === 'pending');
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
						icon="u-icon u-icon--close u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.CANCEL"
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

export default defaultTemplate(ContributionListTemplate);
