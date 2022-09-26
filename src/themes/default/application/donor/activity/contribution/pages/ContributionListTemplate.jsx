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
	FormatterResolver
} from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const ContributionListTemplate = function ({ contributionViewStore }) {
	const {
		tableStore,
		queryUtility,
		authorization,
		paymentTypeDropdownStore,
		contributionStatusDropdownStore,
		dateCreatedDateRangeQueryStore,
		depositTab,
		setDepositTab,
		timelineSummary
		//sumYear
	} = contributionViewStore;

	const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
 	];

	return (
		<Content>
			<div className="row">
				<div className="col col-sml-12">
					<div className="u-mar--top--sml u-mar--bottom--sml">
						<BaasicButton
							type="button"
							className={depositTab === 0 ? "btn btn--med btn--med--wide btn--primary u-mar--right--med u-mar--bottom--sml" : "btn btn--med btn--med--wide btn--tertiary u-mar--right--med u-mar--bottom--sml"}
							onClick={() => setDepositTab(0)}
							// onClick={onSubmitClick}
							// form={form} onSubmit={onSubmitClick}
							label="CONTRIBUTION.LIST.OVERVIEW-TRANSACTIONS" />
						<BaasicButton
							type="button"
							className={depositTab == 1 ? "btn btn--med btn--med--wide btn--primary u-mar--bottom--sml" : "btn btn--med btn--secondary btn--med--wide u-mar--bottom--sml"}
							onClick={() => setDepositTab(1)}
							// onClick={onSubmitClick}
							// form={form} onSubmit={onSubmitClick}
							label="CONTRIBUTION.LIST.BY-TIMELINE" />
					</div>
				</div>
				<div className="col col-sml-12 col-xxlrg-12 u-mar--bottom--med">
					{depositTab === 0 ? <div className="card--tertiary card--med u-mar--bottom--sml">
						<div className="u-mar--bottom--med">
							<TableFilter queryUtility={queryUtility}>
								<div className="row">
									<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
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
					</div> :
					<div className="card--tertiary card--med u-mar--bottom--sml">
						<table className="table--secondary u-mar--bottom--med">
                    <thead className="table--secondary__thead">
                        <tr>
                            <th className="table--secondary__th">Time Period</th>
                            <th className="table--secondary__th">Amount by Period</th>
                        </tr>
                    </thead>
                    <tbody className="table--secondary__tbody">
						{timelineSummary && timelineSummary.map(x =>
						//eslint-disable-next-line
							 <tr className="table--secondary__row" key={x.month} style={x.month == (new Date()).getFullYear() ? {borderTop: '3px solid #d4d4d4'} : null}>
                            <th className="table--secondary__th">{x.month <= 12 ? `${monthNames[x.month - 1]} ${(new Date()).getFullYear()}` : `Year of ${x.month}`}</th>
                            <td className="table--secondary__td">
							<div className="modal__list__amount">
								<FormatterResolver
									item={{ amount: x.sumByMonth }}
									field='amount'
									format={{ type: 'currency' }}
								/>
							</div>
							</td>
							{/* ${x.sumByMonth.toFixed(2)} */}
                        </tr>)
						}
                        
                    </tbody>
                    <tfoot className="table--secondary__tfoot">
                        <tr className="table--secondary__row">
                            <th className="table--secondary__th">
                                {/* Current timeline period: */}
                            </th>
                            <th className="table--secondary__th">
                                {/* {(new Date()).getFullYear()} */}
                            </th>
                        </tr>
                    </tfoot>
                </table>
					</div> 
					 }
				</div>
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
	if (isSome(actionsRender)) {
		if (actionsRender.oncancelRender) {
			cancelRender = actionsRender.oncancelRender(item);
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
