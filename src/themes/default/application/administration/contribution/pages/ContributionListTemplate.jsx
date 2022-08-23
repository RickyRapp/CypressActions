import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	BaasicTable,
	TableFilter,
	BaasicModal,
	BaasicDropdown,
	BaasicInput,
	DateRangeQueryPicker,
	BasicInput,
	FormatterResolver,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';
import { ContributionReview } from 'application/administration/contribution/components';
import { SelectDonor } from 'application/administration/donor/components';

const ContributionListTemplate = function({ contributionViewStore, t }) {
	const {
		routes,
		tableStore,
		queryUtility,
		authorization,
		selectDonorModal,
		searchDonorDropdownStore,
		searchCharityDropdownStore,
		paymentTypeDropdownStore,
		reviewModal,
		contributionStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		userTypeDropdownStore,
		selectedItemsSum,
		submitPending,
		onAchNextPaymentNumberClick,
		achBatchCurrentNumber,
		form,
	} = contributionViewStore;

	return (
		<React.Fragment>
			<ApplicationListLayout store={contributionViewStore} authorization={authorization}>
				<PageHeader routes={routes}></PageHeader>
				<Content>
					<div>
						<div className="container--base u-mar--bottom--med">
							<div className="card--tertiary card--med u-mar--bottom--med">
								<div className="">
									<TableFilter queryUtility={queryUtility}>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicDropdown store={searchDonorDropdownStore} />
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicDropdown store={searchCharityDropdownStore} />
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicDropdown store={userTypeDropdownStore} />
										</div>
										<div className="u-mar--bottom--sml col col-sml-12 col-med-6 col-xxxlrg-4">
											<BaasicInput
												id="confirmationNumber"
												className="input input--lrg"
												value={queryUtility.filter.confirmationNumber || ''}
												onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
												placeholder="CONTRIBUTION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
											/>
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicInput
												id="paymentNumber"
												className="input input--lrg"
												value={queryUtility.filter.paymentNumber || ''}
												onChange={event => (queryUtility.filter.paymentNumber = event.target.value)}
												placeholder="CONTRIBUTION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER"
											/>
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicDropdown
												store={paymentTypeDropdownStore}
												placeholder="CONTRIBUTION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER"
											/>
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicDropdown
												store={contributionStatusDropdownStore}
												placeholder="CONTRIBUTION.LIST.FILTER.CONTRIBUTION_STATUS_PLACEHOLDER"
											/>
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicInput
												id="nameOnCheck"
												className="input input--lrg"
												value={queryUtility.filter.nameOnCheck || ''}
												onChange={event => (queryUtility.filter.nameOnCheck = event.target.value)}
												placeholder="CONTRIBUTION.LIST.FILTER.NAME_ON_CHECK_PLACEHOLDER"
											/>
										</div>
										<div className="col col-sml-12 col-med-6 col-xxxlrg-4 u-mar--bottom--sml">
											<BaasicInput
												id="dollarRange"
												className="input input--lrg"
												value={queryUtility.filter.dollarRange || ''}
												onChange={event => (queryUtility.filter.dollarRange = event.target.value)}
												placeholder="CONTRIBUTION.LIST.FILTER.DOLLAR_RANGE_PLACEHOLDER"
											/>
										</div>
										<div className="col col-sml-12 col-xxxlrg-8 u-mar--bottom--sml">
											<DateRangeQueryPicker
												queryUtility={queryUtility}
												store={dateCreatedDateRangeQueryStore}
												fromPropertyName="dateCreatedFrom"
												toPropertyName="dateCreatedTo"
											/>
										</div>
									</TableFilter>
								</div>
							</div>

							<div className="card--primary card--med">
								<div className="u-display--flex u-display--flex--wrap u-display--flex--justify--space-between w--100">
									<div>
										<BasicInput field={form.$('paymentNumber')} />

										<span className="u-display--flex u-display--flex--align--center">
											<span className="type--sml">Next ACH batch number:</span>
											<span className="btn btn--base btn--link u-mar--left--tny" onClick={onAchNextPaymentNumberClick}>
												{achBatchCurrentNumber + 1}
											</span>
										</span>
									</div>

									<div>
										<p className="form__group__label">Sum of selected items:</p>
										<p className="type--xxxlrg">
											{
												<FormatterResolver
													item={{ amount: selectedItemsSum }}
													field="amount"
													format={{ type: 'currency' }}
												/>
											}
										</p>
									</div>

									<div className="u-mar--left--med u-mar--top--med">
										<BaasicButton
											className="btn btn--med btn--ghost"
											label={t('ACTIVITY.DEPOSIT_TAB.CSV_BUTTON')}
											onClick={submitPending}
										/>
									</div>

									<div className="col col-sml-12 col-lrg-6 col-xxlrg-4"></div>
								</div>
							</div>
						</div>

						<div className="card--primary card--med">
							<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
						</div>
					</div>
				</Content>
			</ApplicationListLayout>
			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
			<BaasicModal modalParams={reviewModal}>
				<ContributionReview />
			</BaasicModal>
		</React.Fragment>
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

	let reviewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onReviewRender) {
			reviewRender = actionsRender.onReviewRender(item);
		}
	}

	let previewRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPreviewRender) {
			previewRender = actionsRender.onPreviewRender(item);
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
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--edit u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onReview) && reviewRender ? (
					<BaasicButton
						authorization="theDonorsFundAdministrationSection.update"
						className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
						icon="u-icon u-icon--approve u-icon--base"
						label="CONTRIBUTION.LIST.BUTTON.REVIEW"
						onlyIcon={true}
						onClick={() => onReview(item)}
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
						icon="u-icon u-icon--close--secondary u-icon--base"
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
