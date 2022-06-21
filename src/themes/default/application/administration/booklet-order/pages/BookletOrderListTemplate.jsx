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
	BaasicTableWithRowDetails,
	BasicFieldCheckbox,
	BasicCheckbox,
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
		selectDefaults,
		exportList,
		mailModel
	} = bookletOrderViewStore;

	const DetailComponent = ({ dataItem }) => {
        {
			console.log(dataItem, tableStore);
            return (
                <table>
                    <thead>
                        <tr>
                            <th>For additional information go to details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {dataItem 
                            && dataItem.grants
                            && dataItem.grants.map((item) => { 
                            return (
                                <tr key={item.id}>
                                    <td>{item.donorName}</td>
                                    <td><FormatterResolver
                                        item={{amount: item.amount}}
                                        field='amount'
                                        format={{type: 'currency'}}
                                    /></td>
                                    <td>
                                        {item.confirmationNumber}
                                    </td>
                                    <td> {item.donorName.includes('Session') ?
                                     <FormatterResolver
                                        item={{ dateCreated: item.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                     : ''} </td>
                                </tr>
                            );
                        })} */}
                    </tbody>
                </table>)
        }
    }

	return (
		<ApplicationListLayout store={bookletOrderViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter colClassName={"col col-sml-12 col-lrg-8"} queryUtility={queryUtility} visibleByDefault={false}>
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
								<div className="row row--form">
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
							<div className="col col-sml-12 u-mar--bottom--sml">
									<BasicCheckbox
                                            checked={queryUtility.filter.orderFolder}
											id="folder"
											onChange={(e) => queryUtility.filter.orderFolder = e.target.checked}
                                            label="Booklet Folder"
                                            showLabel={true}
                                        />
								</div>
						</TableFilter>
						<BaasicButton className="btn btn--med btn--primary u-mar--right--med" label="Select defaults"onClick={selectDefaults} />
						<BaasicButton className="btn btn--med btn--primary" label="Export" onClick={() => exportList(false)}/>
						{/* <BaasicInput className="input input--lrg u-mar--top--med u-mar--bottom--sml" field={mailModel.sendTo} onChange={e => mailModel.sendTo = e.target.value}/> */}
						<BaasicInput
									id="sendTo"
									className="input input--lrg u-mar--top--med u-mar--bottom--sml"
									value={queryUtility.filter.sendTo}
									onChange={event => (queryUtility.filter.sendTo = event.target.value)}
									placeholder="Enter e-mail..."
								/>
						<BaasicButton className="btn btn--med btn--primary" label="Send CSV" onClick={() => exportList(true)}/>
					</div>

					<div className="table--dragrow--expandable-row">
                        <BaasicTableWithRowDetails
                            tableStore={tableStore}
                            detailComponent={DetailComponent}
                            loading={tableStore.loading}
                            className="k-grid--actions"
							actionsComponent={renderActions}
                        />
                    </div>
					{/* <BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} /> */}
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

	const { onEdit, onReview, onDetails, onCancel } = actions;
	if (!isSome(onEdit) && !isSome(onReview) && !isSome(onDetails) && isSome(onCancel)) return null;

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

	let cancelRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onCancelRender) {
			cancelRender = actionsRender.onCancelRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onCancel) && cancelRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--cancel u-icon--base u-mar--right--tny"
						label="BOOKLET_ORDER.LIST.BUTTON.CANCEL"
						onlyIcon={true}
						onClick={() => onCancel(item)}
					></BaasicButton>
				) : null
				}
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base u-mar--right--tny"
						label="BOOKLET_ORDER.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onReview) && reviewRender ? (
					<BaasicButton
						authorization="theDonorsFundAdministrationSection.update"
						className="btn btn--icon"
						icon="u-icon u-icon--approve u-icon--base u-mar--right--tny"
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
