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

const SessionListTemplate = function ({ sessionViewStore }) {
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
    } = sessionViewStore;

	let promiseOptions = (inputValue) =>
	new Promise(resolve => {
			inputValue.length >= 3 ? debouncedSearchCharities(inputValue, resolve) : resolve(null);
	});

	return (
		<ApplicationListLayout store={sessionViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter queryUtility={queryUtility}>
							<div className="row">
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									{/* <BaasicDropdown store={searchCharityDropdownStore} /> */}
									<AsyncSelect onChange={e => setCharityId(e.value)} cacheOptions defaultOptions={true} loadOptions={promiseOptions} classNamePrefix="react-select" />
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="confirmationNumber"
										className="input input--lrg"
										value={queryUtility.filter.confirmationNumber || ''}
										onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
										placeholder="SESSION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="paymentNumber"
										className="input input--lrg"
										value={queryUtility.filter.paymentNumber || ''}
										onChange={event => (queryUtility.filter.paymentNumber = event.target.value)}
										placeholder="SESSION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown
										store={paymentTypeDropdownStore}
										placeholder="SESSION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown
										store={donationStatusDropdownStore}
										placeholder="SESSION.LIST.FILTER.SESSION_STATUS_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<NumberFormatInput
										className="input input--lrg"
										value={queryUtility.filter.bookletCertificateCode}
										onChange={event => (queryUtility.filter.bookletCertificateCode = event.formattedValue)}
										format="######-##"
										mask=""
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="dollarRange"
										value={queryUtility.filter.dollarRange || ''}
										onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
										placeholder="SESSION.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="fundraiserName"
										value={queryUtility.filter.fundraiserName || ''}
										onChange={event => (queryUtility.filter.fundraiserName = event.target.value)}
										placeholder="SESSION.LIST.FILTER.FUNDRAISER_NAME_PLACEHOLDER"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<NumberFormatInput
										id="phoneNumber"
										value={queryUtility.filter.phoneNumber}
										onChange={event => (queryUtility.filter.phoneNumber = event.formattedValue)}
										placeholder="SESSION.LIST.FILTER.PHONE_NUMBER_PLACEHOLDER"
										format="(###)(###)-(####)"
									/>
								</div>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="sessionEmail"
										value={queryUtility.filter.sessionEmail || ''}
										onChange={event => (queryUtility.filter.sessionEmail = event.target.value)}
										placeholder="SESSION.LIST.FILTER.EMAIL_PLACEHOLDER"
									/>
								</div>
								{/* <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicInput
										id="usernameCreatedSession"
										value={queryUtility.filter.usernameCreatedSession || ''}
										onChange={event => (queryUtility.filter.usernameCreatedSession = event.target.value)}
										placeholder="SESSION.LIST.FILTER.USERNAME_CREATED_SESSION_PLACEHOLDER"
									/>
								</div> */}
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown store={searchDonorDropdownStore} />
								</div>
								<div className="col col-sml-12 col-lrg-8 u-mar--bottom--sml">
									<DateRangeQueryPicker
										queryUtility={queryUtility}
										store={dateCreatedDateRangeQueryStore}
										fromPropertyName="dateCreatedFrom"
										toPropertyName="dateCreatedTo"
									/>
								</div>
							</div>
						</TableFilter>
					</div>
					<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
				</div>
			</Content>
		</ApplicationListLayout>
	);
};

SessionListTemplate.propTypes = {
	sessionViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onCancel, onPreview } = actions;
	if (!isSome(onEdit) && !isSome(onCancel) && !isSome(onPreview)) return null;

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
						label="SESSION.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--cancel u-icon--base u-mar--left--sml"
						label="SESSION.LIST.BUTTON.CANCEL"
						onlyIcon={true}
						onClick={() => onCancel(item)}
					></BaasicButton>
				) : null}
				{isSome(onPreview) ? (
					<BaasicButton
						authorization="theDonorsFundSessionSection.read"
						className="btn btn--icon"
						icon="u-icon u-icon--preview u-icon--base u-mar--left--sml"
						label="SESSION.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
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

export default defaultTemplate(SessionListTemplate);
