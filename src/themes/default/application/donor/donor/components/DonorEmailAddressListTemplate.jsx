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
		<div>
			<div className="row">
				<div className="col col-sml-12 col-lrg-3">
					<h3 className=" u-mar--bottom--med">
						{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_EMAIL_ADDRESS')}
					</h3>
				</div>
				<div
					className={`col col-sml-12 col-lrg-${
						(isEditEnabled && primaryEmailAddress && primaryEmailAddress.id === editId) ||
						((secondaryEmailAddress && secondaryEmailAddress.id === editId) || undefined === editId)
							? '12'
							: '9'
					}`}
				>
					<div className="row u-mar--bottom--sml">
						<div className="col col-sml-12 col-lrg-12">
							{isEditEnabled && primaryEmailAddress && primaryEmailAddress.id === editId ? (
								<DonorEmailAddressEditTemplate
									form={form}
									title="Primary"
									onCancelEditClick={onCancelEditClick}
									isAssignableAsPrimary={false}
								/>
							) : (
								<div
									className="info-card--scale"
									title="Click to edit"
									onClick={() => onEnableEditClick(primaryEmailAddress)}
								>
									{primaryEmailAddress ? (
										// <EmailAddress value={primaryEmailAddress} format='full' />
										<div className="row">
                                            <div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
											    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Email:</p>
                                                <p className="type--base type--wgt--bold"> {primaryEmailAddress.email} </p>
                                            </div>
                                            <div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
											    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Notifications</p>
                                                <p className="type--base type--wgt--bold">{primaryEmailAddress.isNotifyEnabled ? "On" : "Off"}</p>
                                            </div>
                                            <div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
                                                <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Primary</p>
                                                <p className="type--base type--wgt--bold">{primaryEmailAddress.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : ""}</p>
                                            </div>
										</div>
									) : (
										''
									)}
								</div>
							)}
						</div>
						<div className="col col-sml-12 col-lrg-12 u-mar--top--sml">
							{isEditEnabled &&
							((secondaryEmailAddress && secondaryEmailAddress.id === editId) || undefined === editId) ? (
								<DonorEmailAddressEditTemplate
									form={form}
									onCancelEditClick={onCancelEditClick}
									isAssignableAsPrimary={true}
								/>
							) : (
								<span
                                    className="cursor--pointer type--color--opaque type--sml"
									title={`Click to ${secondaryEmailAddress ? 'edit' : 'insert'}`}
									onClick={() => onEnableEditClick(secondaryEmailAddress)}
								>
									{secondaryEmailAddress ? (
										<EmailAddress value={secondaryEmailAddress} format="full" />
									) : (
										<button className="btn btn--link btn--sml">Add new email address</button>
									)}
								</span>
							)}
						</div>
					</div>
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
