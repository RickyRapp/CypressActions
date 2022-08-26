import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { CharityBankAccountEdit } from 'application/charity/charity/components';

const CharityBankAccountListTemplate = function ({ charityBankAccountListViewStore, t }) {
	const {
		bankAccounts,
		onEnableEditClick,
		onCancelEditClick,
		onEditCompleted,
		isEditEnabled,
		editId,
		charity,
	} = charityBankAccountListViewStore;

	return (
		<div>
			<h3 className=" u-mar--bottom--med">
				{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_BANK_ACCOUNT')}
			</h3>
			{bankAccounts
				.filter(c => c.id !== editId)
				.map(c => {
					return (
						<div key={c.id}>
							<div
								className=""
								title="Click to edit"
								onClick={() => onEnableEditClick(c)}
							>
								<div className="row info-card--scale">
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

									{bankAccounts.length > 0 ?
										<div className="col col-sml-6 col-xxlrg-4">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
												Primary
											</p>
											<p className="type--base type--wgt--bold">{c.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ''}</p>
										</div> : null}

								</div>
							</div>
						</div>
					);
				})}
			<div className="">
				{isEditEnabled ? (<div>
					<CharityBankAccountEdit
						editId={editId}
						onCancelEditClick={onCancelEditClick}
						onEditCompleted={onEditCompleted}
						bankAccountCount={bankAccounts.length}
						charity={charity}
					/>

				</div>

				) : (
					<div className="cursor--pointer type--right" title={'Click to insert'} onClick={() => onEnableEditClick(null)}>
						<button className="btn btn--link btn--sml">Add new bank account</button>
					</div>
				)}
			</div>
		</div>
	);
};

CharityBankAccountListTemplate.propTypes = {
	charityBankAccountListViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityBankAccountListTemplate);
