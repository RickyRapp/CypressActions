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
		<div className="card--primary card--med u-mar--bottom--med">
			<h3 className=" u-mar--bottom--med">
				{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_BANK_ACCOUNT')}
			</h3>
			{bankAccounts
				.filter(c => c.id !== editId)
				.map(c => {
					return (
						<div key={c.id}>
							<div
								className="info-card"
								title="Click to edit"
								onClick={() => onEnableEditClick(c)}
							>
								<div className="row">
									<div className="col col-sml-6 col-xxlrg-2">
										<p className="info-card__label">Routing Number:</p>
										<p className="info-card__value">{c.routingNumber}</p>
									</div>

									<div className="col col-sml-6 col-xxlrg-4">
										<p className="info-card__label">Name:</p>
										<p className="info-card__value">{c.name}</p>
									</div>

									<div className="col col-sml-6 col-xxlrg-2">
										<p className="info-card__label">
											Account Number:
										</p>
										<p className="info-card__value">{c.accountNumber}</p>
									</div>

									{bankAccounts.length > 0 ?
										<div className="col col-sml-6 col-xxlrg-1">
											<p className="info-card__label">
												Primary
											</p>
											<p className="info-card__value">{c.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ''}</p>
										</div> : null}

								</div>
							</div>
						</div>
					);
				})}
			<div className='u-mar--top--med'>
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
					<div className="type--right">
						<button className="btn btn--med btn--med--wide btn--secondary " title={'Click to insert'} onClick={() => onEnableEditClick(null)}>
							Connect your bank
						</button>
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
