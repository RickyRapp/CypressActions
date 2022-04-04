import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicDropdown,
	BaasicInput,
	NumberFormatInput,
	DateRangeQueryPicker,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';
import AsyncSelect from 'react-select/async';

const SessionForDonorReviewTemplate = function ({ sessionForDonorReviewViewStore }) {
	const {
		routes,
		tableStore,
		queryUtility,
		authorization,
		paymentTypeDropdownStore,
		donationStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		searchDonorDropdownStore,
		debouncedSearchCharities,
        setCharityId,
    } = sessionForDonorReviewViewStore;

	let promiseOptions = (inputValue) =>
	new Promise(resolve => {
			inputValue.length >= 3 ? debouncedSearchCharities(inputValue, resolve) : resolve(null);
	});

	return (
		<ApplicationListLayout store={sessionForDonorReviewViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
				</div>
			</Content>
		</ApplicationListLayout>
	);
};

SessionForDonorReviewTemplate.propTypes = {
	sessionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit } = actions;
	if (!isSome(onEdit)) return null;

	let editRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onEditRender) {
			editRender = actionsRender.onEditRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base"
						label="SESSION.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
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

export default defaultTemplate(SessionForDonorReviewTemplate);
