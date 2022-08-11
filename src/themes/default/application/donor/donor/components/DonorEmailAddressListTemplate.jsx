import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { DonorEmailAddressEditTemplate } from 'themes/application/donor/donor/components';
import { EmailAddress } from 'core/components';

const DonorEmailAddressListTableTemplate = function({ donorEmailAddressViewStore, t }) {
	const {
		emailAddresses,
		onEnableEditClick,
		onCancelEditClick,
		isEditEnabled,
		form,
		editId,
	} = donorEmailAddressViewStore;

	let primaryEmailAddress = null;
	let secondaryEmailAddress = null;
	if (emailAddresses.length > 0) {
		primaryEmailAddress = emailAddresses.find(c => c.isPrimary);
		if (emailAddresses.some(c => !c.isPrimary)) {
			secondaryEmailAddress = emailAddresses.find(c => !c.isPrimary);
		}
	}

	return (
		<div className="card--med card--primary u-mar--bottom--med">
			<h3 className=" u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_EMAIL_ADDRESS')}</h3>

			<div className="u-mar--bottom--sml">
				{isEditEnabled && primaryEmailAddress && primaryEmailAddress.id === editId ? (
					<DonorEmailAddressEditTemplate
						form={form}
						title="Primary"
						onCancelEditClick={onCancelEditClick}
						isAssignableAsPrimary={false}
					/>
				) : (
					<div
						className={`info-card--scale ${
							(isEditEnabled && secondaryEmailAddress === null) ||
							(secondaryEmailAddress && secondaryEmailAddress.id === editId)
								? 'u-padd--x--med'
								: ''
						}`}
						title="Click to edit"
						onClick={() => onEnableEditClick(primaryEmailAddress)}
					>
						{primaryEmailAddress ? (
							// <EmailAddress value={primaryEmailAddress} format='full' />
							<div className="row">
								<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Email:</p>
									<p className="type--base type--wgt--bold type--break--all"> {primaryEmailAddress.email} </p>
								</div>
								<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Notifications</p>
									<p className="type--base type--wgt--bold">{primaryEmailAddress.isNotifyEnabled ? 'On' : 'Off'}</p>
								</div>
								<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
									<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Primary</p>
									<p className="type--base type--wgt--bold">
										{primaryEmailAddress.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ''}
									</p>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				)}

				<div
					className={`u-mar--top--sml ${
						(isEditEnabled && primaryEmailAddress === null) ||
						(primaryEmailAddress && primaryEmailAddress.id === editId)
							? 'u-padd--x--med'
							: ''
					}`}
				>
					{isEditEnabled && ((secondaryEmailAddress && secondaryEmailAddress.id === editId) || undefined === editId) ? (
						<DonorEmailAddressEditTemplate
							form={form}
							onCancelEditClick={onCancelEditClick}
							isAssignableAsPrimary={true}
						/>
					) : (
						<React.Fragment>
							<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
								Secondary Email Address
							</p>
							<span
								className="cursor--pointer type--base type--wgt--bold"
								title={`Click to ${secondaryEmailAddress ? 'edit' : 'insert'}`}
								onClick={() => onEnableEditClick(secondaryEmailAddress)}
							>
								{secondaryEmailAddress ? (
									<EmailAddress value={secondaryEmailAddress} format="full" />
								) : (
									<button className="btn btn--link btn--sml">Add new email address</button>
								)}
							</span>
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

DonorEmailAddressListTableTemplate.propTypes = {
	donorEmailAddressViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorEmailAddressListTableTemplate);
