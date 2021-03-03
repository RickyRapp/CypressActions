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
	BaasicModal,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';
import { SelectDonor } from 'application/administration/donor/components';

const BookletOrderListTemplate = function ({ bookletOrderViewStore }) {
	const {
		routes,
		tableStore,
		queryUtility,
		authorization,
		searchDonorDropdownStore,
		deliveryMethodTypeDropdownStore,
		bookletOrderStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		selectDonorModal,
	} = bookletOrderViewStore;

	return (
		<ApplicationListLayout store={bookletOrderViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter queryUtility={queryUtility} visibleByDefault={false}>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown store={searchDonorDropdownStore} />
							</div>

							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="bookletCodes"
									className="input input--lrg"
									value={queryUtility.filter.bookletCodes || ''}
									onChange={event => (queryUtility.filter.bookletCodes = event.target.value)}
									placeholder="BOOKLET_ORDER.LIST.FILTER.BOOKLET_CODES_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="confirmationNumber"
									className="input input--lrg"
									value={queryUtility.filter.confirmationNumber || ''}
									onChange={event => (queryUtility.filter.confirmationNumber = event.target.value)}
									placeholder="BOOKLET_ORDER.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="trackingNumber"
									className="input input--lrg"
									value={queryUtility.filter.trackingNumber || ''}
									onChange={event => (queryUtility.filter.trackingNumber = event.target.value)}
									placeholder="BOOKLET_ORDER.LIST.FILTER.TRACKING_NUMBER_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={deliveryMethodTypeDropdownStore}
									placeholder="BOOKLET_ORDER.LIST.FILTER.DELIVERY_TYPE_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={bookletOrderStatusDropdownStore}
									placeholder="BOOKLET_ORDER.LIST.FILTER.BOOKLET_ORDER_STATUS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 u-mar--bottom--sml">
								<div className="row">
									<div className="col col-sml-8">
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
			<BaasicModal modalParams={selectDonorModal}>
				<SelectDonor />
			</BaasicModal>
		</ApplicationListLayout>
	);
};

BookletOrderListTemplate.propTypes = {
	bookletOrderViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onReview, onDetails } = actions;
	if (!isSome(onEdit) && !isSome(onReview) && !isSome(onDetails)) return null;

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

	let detailsRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDetailsRender) {
			detailsRender = actionsRender.onDetailsRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base"
						label="BOOKLET_ORDER.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onReview) && reviewRender ? (
					<BaasicButton
						authorization="theDonorsFundAdministrationSection.update"
						className="btn btn--icon"
						icon="u-icon u-icon--approve u-icon--base"
						label="BOOKLET_ORDER.LIST.BUTTON.REVIEW"
						onlyIcon={true}
						onClick={() => onReview(item.id)}
					></BaasicButton>
				) : null}
				{isSome(onDetails) && detailsRender ? (
					<BaasicButton
						authorization="theDonorsFundAdministrationSection.read"
						className="btn btn--icon"
						icon="u-icon u-icon--preview u-icon--base"
						label="BOOKLET_ORDER.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onDetails(item.id)}
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

export default defaultTemplate(BookletOrderListTemplate);
