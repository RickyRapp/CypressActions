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
	DateRangeQueryPicker,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { GrantDeclineTemplate } from 'application/administration/grant/components';
import AsyncSelect from 'react-select/async';
import { SelectCharity } from 'application/administration/charity/components';

const WithdrawFundListTemplate = function ({ withdrawFundViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		donationStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		declineModal,
		debouncedSearchCharities,
        setCharityId,
		routes,
		selectCharityModal
	} = withdrawFundViewStore;
 
	let promiseOptions = (inputValue) =>
	new Promise(resolve => {
			inputValue.length >= 3 ? debouncedSearchCharities(inputValue, resolve) : resolve(null);
	});

	return (
        <ApplicationListLayout store={withdrawFundViewStore} authorization={authorization}>
            <Content>
			<div className="card--tertiary card--med u-mar--bottom--sml">
				<div className="row row--form u-mar--bottom--med">
					<div className="col col-sml-12 col-xxlrg-9">
						<TableFilter colClassName={"col col-sml-12 col-xxlrg-9"} btnClassName={"col col-sml-6 col-med-4 col-xxlrg-3"} queryUtility={queryUtility}>
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
									placeholder="GRANT.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="dollarRange"
									className="input input--lrg"
									value={queryUtility.filter.dollarRange || ''}
									onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
									placeholder="GRANT.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={donationStatusDropdownStore}
									placeholder="GRANT.LIST.FILTER.GRANT_STATUS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 u-mar--bottom--sml">
								<div className="row row--form">
									<div className="col col-sml-12 col-lrg-8">
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
					<div className="col col-sml-12 col-xxlrg-3 type--right">
						<BaasicButton
							className="btn btn--med btn--primary"
							label={'LIST_LAYOUT.CREATE_BUTTON'}
							onClick={routes.create}
						/>
					</div>

				</div>
				<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
			</div>

			<BaasicModal modalParams={selectCharityModal}>
				<SelectCharity />
			</BaasicModal>

			<BaasicModal modalParams={declineModal}>
                <GrantDeclineTemplate />
            </BaasicModal>
		</Content>
    </ApplicationListLayout>

	);
};

WithdrawFundListTemplate.propTypes = {
	withdrawFundViewStore: PropTypes.object.isRequired,
	onDeclineClick: PropTypes.func,
    declineModal: PropTypes.any,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;
	
	const {  onRedirect, onPreview, onApprove, onCancel, onDecline, onDonorDeclined, onDonorReview } = actions;

	if (!isSome(onDonorReview) && !isSome(onRedirect) && !isSome(onPreview) && !isSome(onApprove) && !isSome(onCancel) && !isSome(onDecline)) return null;

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

	let declineRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDeclineRender) {
			declineRender = actionsRender.onDeclineRender(item);
		}
	}

	let cancelRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onCancelRender) {
			cancelRender = actionsRender.onCancelRender(item);
		}
	}

	let donorDeclinedRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDonorDeclinedRender) {
			donorDeclinedRender = actionsRender.onDonorDeclinedRender(item);
		}
	}

	let donorReviewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDonorReviewRender) {
			donorReviewRender = actionsRender.onDonorReviewRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onRedirect) && redirectRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base" //TODO: change with redirect icon
						label="GRANT.LIST.BUTTON.DELETE"
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
				{isSome(onDecline) && declineRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--decline u-icon--base"
						label="GRANT.LIST.BUTTON.DECLINE"
						onlyIcon={true}
						onClick={() => onDecline(item)}
					></BaasicButton>
				) : null}
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--delete u-icon--base"
						label="GRANT.LIST.BUTTON.CANCEL"
						onlyIcon={true}
						onClick={() => onCancel(item)}
					></BaasicButton>
				) : null}
				{isSome(onDonorDeclined) && donorDeclinedRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--clipboard u-icon--base"
						label="Donor declination review"
						onlyIcon={true}
						onClick={() => onDonorDeclined(item)}
					></BaasicButton>
				) : null}
				{isSome(onDonorReview) && donorReviewRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base"
						label="Donor declination review"
						onlyIcon={true}
						onClick={() => onDonorReview(item)}
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

export default defaultTemplate(WithdrawFundListTemplate);
