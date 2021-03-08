import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	Export,
	BaasicModal,
} from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const GrantListTemplate = function ({ grantViewStore }) {
	const {
		tableStore,
		routes,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		donationStatusDropdownStore,
		exportConfig,
		selectDonorModal,
	} = grantViewStore;

	return (
		<Content>
			<div className="card--primary card--med u-mar--bottom--sml">
				<Export config={exportConfig} />
			</div>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="row u-mar--bottom--med">
					<div className="col col-sml-12 col-xxlrg-10">
						<TableFilter queryUtility={queryUtility}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchDonorDropdownStore} />
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="confirmationNumber"
									className="input input--lrg"
									value={queryUtility.filter.confirmationNumber || ''}
									onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
									placeholder="GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={donationStatusDropdownStore}
									placeholder="GRANT.LIST.FILTER.GRANT_STATUS_PLACEHOLDER"
								/>
							</div>
						</TableFilter>
					</div>
					<div className="col col-sml-12 col-xxlrg-2 type--right">
						<BaasicButton
							className="btn btn--med btn--primary"
							label={'LIST_LAYOUT.CREATE_BUTTON'}
							onClick={routes.create}
						/>
					</div>
				</div>

				<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
			</div>

			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
		</Content>
	);
};

GrantListTemplate.propTypes = {
	grantViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onRedirect, onPreview, onApprove } = actions;
	if (!isSome(onEdit) && !isSome(onRedirect) && !isSome(onPreview) && !isSome(onApprove)) return null;

	let editRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onEditRender) {
			editRender = actionsRender.onEditRender(item);
		}
	}

	let redirectRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onRedirectRender) {
			redirectRender = actionsRender.onRedirectRender(item);
		}
	}

	let approveRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onApproveRender) {
			approveRender = actionsRender.onApproveRender(item);
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
						label="GRANT.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onRedirect) && redirectRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base" //TODO: change with redirect icon
						label="GRANT.LIST.BUTTON.REDIRECT"
						onlyIcon={true}
						onClick={() => onRedirect(item)}
					></BaasicButton>
				) : null}
				{isSome(onPreview) ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--preview u-icon--base"
						label="GRANT.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
				{isSome(onApprove) && approveRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base"
						label="GRANT.LIST.BUTTON.REVIEW"
						onlyIcon={true}
						onClick={() => onApprove(item)}
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

export default defaultTemplate(GrantListTemplate);
