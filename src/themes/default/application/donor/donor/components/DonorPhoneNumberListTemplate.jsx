import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';
import { DonorPhoneNumberEditTemplate } from 'themes/application/donor/donor/components';

const DonorAddressListTemplate = function({ donorPhoneNumberViewStore, t }) {
	const { phoneNumbers, onEnableEditClick, onCancelEditClick, isEditEnabled, form, editId } = donorPhoneNumberViewStore;

	let primaryPhoneNumber = null;
	let secondaryPhoneNumber = null;
	if (phoneNumbers.length > 0) {
		primaryPhoneNumber = phoneNumbers.find(c => c.isPrimary);
		if (phoneNumbers.some(c => !c.isPrimary)) {
			secondaryPhoneNumber = phoneNumbers.find(c => !c.isPrimary);
		}
	}

	return (
		<React.Fragment>
			<div className="card--primary card--med u-mar--bottom--med">
				<h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PHONE_NUMBER')}</h3>

				<div
					className={`u-mar--bottom--sml ${
						(isEditEnabled && secondaryPhoneNumber === null && primaryPhoneNumber.id !== editId) ||
						(secondaryPhoneNumber && secondaryPhoneNumber.id === editId)
							? 'u-padd--x--med'
							: ''
					}`}
				>
					{isEditEnabled && primaryPhoneNumber && primaryPhoneNumber.id === editId ? (
						<DonorPhoneNumberEditTemplate
							form={form}
							title="Primary"
							onCancelEditClick={onCancelEditClick}
							isAssignableAsPrimary={false}
						/>
					) : (
						<div
							className="row info-card--scale"
							title="Click to edit"
							onClick={() => onEnableEditClick(primaryPhoneNumber)}
						>
							{primaryPhoneNumber && (
								<div className="col col-sml-12 col-lrg-9" title="Click to edit" onClick={onEnableEditClick}>
									<div className="row">
										<div className="col col-sml-6 col-xxlrg-4">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Number:</p>
											<p className="type--base type--wgt--bold">{primaryPhoneNumber.number}</p>
										</div>

										<div className="col col-sml-6 col-xxlrg-4">
											<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Primary</p>
											<p className="type--base type--wgt--bold">
												{primaryPhoneNumber.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ''}
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
				<div
					className={`${
						(isEditEnabled && primaryPhoneNumber === null) || (primaryPhoneNumber && primaryPhoneNumber.id === editId)
							? 'u-padd--x--med'
							: ''
					}`}
				>
					{isEditEnabled && ((secondaryPhoneNumber && secondaryPhoneNumber.id === editId) || undefined === editId) ? (
						<DonorPhoneNumberEditTemplate
							form={form}
							onCancelEditClick={onCancelEditClick}
							isAssignableAsPrimary={true}
						/>
					) : (
						<React.Fragment>
							<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
								Secondary Phone Number
							</p>
							<span
								className="cursor--pointer type--base type--wgt--bold"
								title={`Click to ${secondaryPhoneNumber ? 'edit' : 'insert'}`}
								onClick={() => onEnableEditClick(secondaryPhoneNumber)}
							>
								{secondaryPhoneNumber ? (
									<FormatterResolver item={secondaryPhoneNumber} field="number" format={{ type: 'phone-number' }} />
								) : (
									<span className="btn btn--link btn--sml">Add new phone number</span>
								)}
							</span>
						</React.Fragment>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

DonorAddressListTemplate.propTypes = {
	donorPhoneNumberViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorAddressListTemplate);
