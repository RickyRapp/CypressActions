import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const UserListTemplate = function ({ userViewStore }) {
	const { tableStore, queryUtility, authorization, routes } = userViewStore;

	return (
		<ApplicationListLayout store={userViewStore} authorization={authorization}>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="row u-mar--bottom--med">
						<div className="col col-sml-12 col-xxlrg-10">
							<TableFilter colClassName={"col col-sml-12 col-lrg-6"} queryUtility={queryUtility} />
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
			</Content>
		</ApplicationListLayout>
	);
};

UserListTemplate.propTypes = {
	userViewStore: PropTypes.object.isRequired,
};

function renderActions({ item, actions, authorization }) {
	if (!isSome(actions)) return null;

	const { onEdit, onLock, onUnlock, onApprove, onDisapprove } = actions;
	if (!isSome(onEdit) && !isSome(onLock) && !isSome(onUnlock) && !isSome(onApprove) && !isSome(onDisapprove))
		return null;

	return (
		<td>
			<div className="type--right">
				{isSome(onEdit) ? (
					<BaasicButton
						authorization={authorization ? authorization.update : null}
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--edit u-icon--base"
						label="Edit"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{item.isApproved ? (
					<BaasicButton
						authorization={authorization ? authorization.update : null}
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--decline u-icon--base"
						label="Disapprove"
						onlyIcon={true}
						onClick={() => onDisapprove(item)}
					></BaasicButton>
				) : (
						<BaasicButton
							authorization={authorization ? authorization.update : null}
							className="btn btn--icon"
							onlyIconClassName="u-mar--right--tny"
							icon="u-icon u-icon--approve u-icon--base"
							label="Approve"
							onlyIcon={true}
							onClick={() => onApprove(item)}
						></BaasicButton>
					)}
				{item.isLockedOut ? (
					<BaasicButton
						authorization={authorization ? authorization.update : null}
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--unlock u-icon--base"
						label="Unlock"
						onlyIcon={true}
						onClick={() => onUnlock(item)}
					></BaasicButton>
				) : (
						<BaasicButton
							authorization={authorization ? authorization.update : null}
							className="btn btn--icon"
							onlyIconClassName="u-mar--right--tny"
							icon="u-icon u-icon--lock u-icon--base"
							label="Lock"
							onlyIcon={true}
							onClick={() => onLock(item)}
						></BaasicButton>
					)}
			</div>
		</td>
	);
}

renderActions.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
	authorization: PropTypes.any,
};

export default defaultTemplate(UserListTemplate);
