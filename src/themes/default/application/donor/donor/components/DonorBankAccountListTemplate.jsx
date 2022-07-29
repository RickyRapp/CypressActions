import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { DonorBankAccountEdit } from 'application/donor/donor/components';

const DonorBankAcountListTemplate = function({ donorBankAccountViewStore, t }) {
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
			<div className="card--primary card--med u-mar--bottom--med">
				<h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_BANK_ACCOUNT')}</h3>
				{isEditEnabled && (
					<DonorBankAccountEdit
						editId={editId}
						onCancelEditClick={onCancelEditClick}
						onEditCompleted={onEditCompleted}
						bankAccountCount={bankAccounts.length}
					/>
				)}
				{bankAccounts
					.filter(c => c.id !== editId)
					.map(c => {
						return (
							<div key={c.id} className={`u-mar--bottom--sml u-padd--x--med`}>
								<div className="" title="Click to edit" onClick={() => onEnableEditClick(c)}>
									<div className="row info-card--scale">
										<div className="col col-sml-6 col-xxlrg-4 u-mar--bottom--med">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
												Routing Number:
											</p>
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

										{bankAccounts.length > 0 ? (
											<div className="col col-sml-6 col-xxlrg-4">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Primary</p>
												<p className="type--base type--wgt--bold">
													{c.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ''}
												</p>
											</div>
										) : null}
									</div>
								</div>
							</div>
						);
					})}
				<div className="">
					{!isEditEnabled && (
						<span className="cursor--pointer" title={'Click to insert'} onClick={() => onEnableEditClick(null)}>
							<button className="btn btn--link btn--sml">Add new bank account</button>
						</span>
					)}
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
