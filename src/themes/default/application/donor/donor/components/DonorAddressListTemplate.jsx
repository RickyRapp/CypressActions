import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Address } from 'core/components';
import { DonorAddressEditTemplate } from 'themes/application/donor/donor/components';

const DonorAddressListTemplate = function ({ donorAddressViewStore, t }) {
	const { addresses, onEnableEditClick, onCancelEditClick, isEditEnabled, form, editId } = donorAddressViewStore;

	let primaryAddress = null;
	let secondaryAddress = null;
	if (addresses.length > 0) {
		primaryAddress = addresses.find(c => c.isPrimary);
		if (addresses.some(c => !c.isPrimary)) {
			secondaryAddress = addresses.find(c => !c.isPrimary);
		}
	}

	return (
		<div>
			<div className="card--primary card--med u-mar--bottom--med">
				<h3	h3 className=" u-mar--bottom--sml">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_ADDRESS')}</h3>

				<DonorAddressEditTemplate
					form={form}
					title="Primary"
					onCancelEditClick={onCancelEditClick}
					isAssignableAsPrimary={false}
				/>

				{/* {isEditEnabled && primaryAddress && primaryAddress.id === editId ? (
						<DonorAddressEditTemplate
							form={form}
							title="Primary"
							onCancelEditClick={onCancelEditClick}
							isAssignableAsPrimary={false}
						/>
					) : (
						<div
							className={`type--base type--wgt--bold ${(isEditEnabled && secondaryAddress === null) || (secondaryAddress && secondaryAddress.id === editId) ? "u-padd--x--med" : ""}`}
							title="Click to edit"
							onClick={() => onEnableEditClick(primaryAddress)}
						>
							{primaryAddress ? (
								// <Address value={primaryAddress} format='full' />
								<div className="row info-card--scale">
									<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
										<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
											Address Line 1:
										</p>
										<p className="type--base type--wgt--bold"> {primaryAddress.addressLine1} </p>
									</div>
									<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
										<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
											Address Line 2:
										</p>
										<p className="type--base type--wgt--bold"> {primaryAddress.addressLine2} </p>
									</div>
									<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
										<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">City:</p>
										<p className="type--base type--wgt--bold">{primaryAddress.city}</p>
									</div>
									<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
										<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">State:</p>
										<p className="type--base type--wgt--bold">{primaryAddress.state}</p>
									</div>
									<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
										<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Zip Code:</p>
										<p className="type--base type--wgt--bold">{primaryAddress.zipCode}</p>
									</div>
									<div className="col col-sml-6 col-lrg-4 u-mar--bottom--med">
										<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
											Primary
										</p>
										<p className="type--base type--wgt--bold">{primaryAddress.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : 'No'}</p>
									</div>
								</div>
							) : (
								''
							)}
						</div>
					)} */}

				<div className={`u-mar--top--sml ${(isEditEnabled && primaryAddress === null) || (primaryAddress && primaryAddress.id === editId) ? "u-padd--x--med" : ""}`}>
					{isEditEnabled && ((secondaryAddress && secondaryAddress.id === editId) || undefined === editId) ? (
						<DonorAddressEditTemplate
							form={form}
							title="Secondary"
							onCancelEditClick={onCancelEditClick}
							isAssignableAsPrimary={true}
						/>
					) : (
						<React.Fragment>
							<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
								Secondary Address
							</p>
							<span
								className="cursor--pointer type--base type--wgt--bold"
								title={`Click to ${secondaryAddress ? 'edit' : 'insert'}`}
								onClick={() => onEnableEditClick(secondaryAddress)}
							>
								{secondaryAddress ? (
									< Address value={secondaryAddress} format="full" />
								) : (
									<button className="btn btn--link btn--sml">Add new address</button>
								)}
							</span>
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

DonorAddressListTemplate.propTypes = {
	donorAddressViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorAddressListTemplate);
