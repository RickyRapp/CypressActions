import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, BaasicDropdown, BaasicModal } from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const ScheduledGrantListTemplate = function ({ scheduledGrantViewStore }) {
	const {
		tableStore,
		routes,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		selectDonorModal,
	} = scheduledGrantViewStore;

	return (
		<Content>
			<div className="card--tertiary card--med u-mar--bottom--med">
				<div className="row u-mar--bottom--med">
					<div className="col col-sml-12 col-med-10 col-lrg-10">
						<TableFilter queryUtility={queryUtility}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchDonorDropdownStore} />
							</div>
						</TableFilter>
					</div>
					<div className="col col-sml-12 col-med-2 col-lrg-2">
						<BaasicButton
							className="btn btn--med btn--primary u-mar--right--sml"
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
						label="GRANT.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--delete u-icon--base" //TODO: change with redirect icon
						label="GRANT.LIST.BUTTON.REDIRECT"
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
