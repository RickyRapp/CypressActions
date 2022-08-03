import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, TableFilter, BaasicModal, BaasicDropdown, BaasicTableWithRowDetails, FormatterResolver } from 'core/components';
import { ApplicationListLayout, Content } from 'core/layouts';
import { isSome } from 'core/utils';
import { ReconcileEdit } from 'application/administration/reconcile/components';
import { ReconcilePreviewTemplate } from 'themes/application/administration/reconcile/components';
import { ReconcileUploadFile } from 'application/administration/reconcile/components';

const ReconcileListTemplate = function ({ reconcileViewStore, t }) {
	const { 
		tableStore, 
		queryUtility, 
		paymentTypeDropdownStore, 
		authorization, 
		editModal, 
		previewModal, 
		uploadFileTemplateModal, 
		openUploadFileTemplateModal
	 } = reconcileViewStore;


	 const DetailComponent = ({ dataItem }) => { 
        {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.DONOR_NAME')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.CHARITY_AMOUNT')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.GRANT_CONFIRMATION_NUMBER')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.DATE_CREATED')}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataItem 
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
                        })}
                    </tbody>
                </table>)
        }
    }

    DetailComponent.propTypes = {
        dataItem: PropTypes.object.isRequired
    };

	return (
		<ApplicationListLayout store={reconcileViewStore} authorization={authorization}>
			<Content>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="row u-mar--bottom--med">
						<div className="col col-sml-12 col-xxlrg-10">
							<TableFilter colClassName={"col col-sml-12 col-lrg-6"} queryUtility={queryUtility}>
								<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
									<BaasicDropdown
										store={paymentTypeDropdownStore}
										placeholder="RECONCILE.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER"
									/>
								</div>
							</TableFilter>
						</div>
						<div className="col col-sml-12 col-xxlrg-2 type--right">
							<BaasicButton
								className="btn btn--med btn--primary"
								label={'DROPZONE.TITLE'}
								onClick={openUploadFileTemplateModal}
							/>
						</div>
					</div>
					<BaasicTableWithRowDetails 
						authorization={authorization} 
						tableStore={tableStore} 
						actionsComponent={renderActions} 
						detailComponent={DetailComponent}
                        loading={tableStore.loading}
					/>
				</div>
			</Content>
			<BaasicModal modalParams={editModal}>
				<ReconcileEdit />
			</BaasicModal>
			<BaasicModal modalParams={previewModal}>
				<ReconcilePreviewTemplate />
			</BaasicModal>
			<BaasicModal modalParams={uploadFileTemplateModal}>
				<ReconcileUploadFile />
			</BaasicModal>
			
		</ApplicationListLayout>
	);
};

ReconcileListTemplate.propTypes = {
	reconcileViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

function renderActions({ item, actions, actionsRender }) {
	if (!isSome(actions)) return null;

	const { onEdit, onPreview, onCash, onPrintReport } = actions;
	if (!isSome(onEdit) && !isSome(onPreview) && !isSome(onCash) && !isSome(onPrintReport)) return null;

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

	let cashRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onCashRender) {
			cashRender = actionsRender.onCashRender(item);
		}
	}

	let printReportRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onPrintReportRender) {
			printReportRender = actionsRender.onPrintReportRender(item);
		}
	}

	return (
		<td>
			<div className="type--right">
				{isSome(onEdit) && editRender ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--base"
						label="RECONCILE.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
				{isSome(onPreview) && previewRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--preview u-icon--base"
						label="RECONCILE.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onPreview(item)}
					></BaasicButton>
				) : null}
				{isSome(onCash) && cashRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--cash u-icon--money u-icon--base"
						label="RECONCILE.LIST.BUTTON.CASH"
						onlyIcon={true}
						onClick={() => onCash(item)}
					></BaasicButton>
				) : null}
				{isSome(onPrintReport) && printReportRender ? (
					<BaasicButton
						className="btn btn--icon"
						onlyIconClassName="u-mar--left--sml"
						icon="u-icon u-icon--print u-icon--base"
						label="RECONCILE.LIST.BUTTON.PRINT"
						onlyIcon={true}
						onClick={() => onPrintReport(item)}
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

export default defaultTemplate(ReconcileListTemplate);
