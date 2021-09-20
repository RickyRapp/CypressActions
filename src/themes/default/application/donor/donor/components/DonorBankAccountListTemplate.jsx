import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { DonorBankAccountEdit } from 'application/donor/donor/components';

const DonorBankAcountListTemplate = function ({ donorBankAccountViewStore, t }) {
	const {
		bankAccounts,
		onEnableEditClick,
		onCancelEditClick,
		onEditCompleted,
		isEditEnabled,
		editId,
	} = donorBankAccountViewStore;

	return (
		<div>
			<div className="row">
				<div className="col col-sml-12 col-lrg-3">
					<h3 className=" u-mar--bottom--med">
						{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_BANK_ACCOUNT')}
					</h3>
				</div>
				<div className={`col col-sml-12 col-lrg-${isEditEnabled ? '12' : '9'}`}>
					<div className="row">
						{bankAccounts
							.filter(c => c.id !== editId)
							.map(c => {
								return (
									<div key={c.id} className="col col-sml-12 col-lrg-12 u-mar--bottom--sml">
										<div
											className="info-card--scale"
											title="Click to edit"
											onClick={() => onEnableEditClick(c)}
										>
											<div className="row">
												<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
													<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Routing Number:</p>
													<p className="type--base type--wgt--bold">{c.routingNumber}</p>
												</div>

												<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
													<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Name:</p>
													<p className="type--base type--wgt--bold">{c.name}</p>
												</div>

												<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
													<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
														Account Number:
													</p>
													<p className="type--base type--wgt--bold">{c.accountNumber}</p>
												</div>

												<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
													<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
														Description:
													</p>
													<p className="type--base type--wgt--bold">{c.description}</p>
												</div>

												<div className="col col-sml-6 col-xxlrg-4">
													<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
														Primary
													</p>
													<p className="type--base type--wgt--bold">{c.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ''}</p>
												</div>

											</div>
										</div>
									</div>
								);
							})}
						<div className="col col-sml-12 col-lrg-12">
							{isEditEnabled ? (
								<DonorBankAccountEdit
									editId={editId}
									onCancelEditClick={onCancelEditClick}
									onEditCompleted={onEditCompleted}
								/>
							) : (
								<span className="cursor--pointer" title={'Click to insert'} onClick={() => onEnableEditClick(null)}>
									<button className="btn btn--link btn--sml">Add new bank account</button>
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

DonorBankAcountListTemplate.propTypes = {
	donorBankAccountViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorBankAcountListTemplate);
