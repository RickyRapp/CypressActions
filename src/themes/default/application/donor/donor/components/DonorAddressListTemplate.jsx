import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Address } from 'core/components';
import { DonorAddressEditTemplate } from 'themes/application/donor/donor/components';

const DonorAddressListTemplate = function({ donorAddressViewStore, t }) {
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
			<div className="row u-mar--bottom--sml">
				<div className="col col-sml-12 col-lrg-3">
					<h3 className="type--lrg type--wgt--medium u-mar--bottom--med">
						{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_ADDRESS')}
					</h3>
				</div>
				<div
					className={`col col-sml-12 col-lrg-${
						(isEditEnabled && primaryAddress && primaryAddress.id === editId) || undefined === editId ? '12' : '9'
					}`}
				>
					<div className="row">
						<div className="col col-sml-12 col-lrg-12">
							{isEditEnabled && primaryAddress && primaryAddress.id === editId ? (
								<DonorAddressEditTemplate
									form={form}
									title="Primary"
									onCancelEditClick={onCancelEditClick}
									isAssignableAsPrimary={false}
								/>
							) : (
								<div
									className="type--base type--wgt--bold scale"
									title="Click to edit"
									onClick={() => onEnableEditClick(primaryAddress)}
								>
									{primaryAddress ? (
										// <Address value={primaryAddress} format='full' />
										<div className="row">
											<div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
													Address Line 1:
												</p>
												<p className="type--base type--wgt--bold"> {primaryAddress.addressLine1} </p>
											</div>
											<div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
													Address Line 2:
												</p>
												<p className="type--base type--wgt--bold"> {primaryAddress.addressLine2} </p>
											</div>
											<div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">City:</p>
												<p className="type--base type--wgt--bold">{primaryAddress.city}</p>
											</div>
											<div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">State:</p>
												<p className="type--base type--wgt--bold">{primaryAddress.state}</p>
											</div>
											<div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Zip Code:</p>
												<p className="type--base type--wgt--bold">{primaryAddress.zipCode}</p>
											</div>
											<div className="col col-sml-6 col-lrg-4 u-mar--bottom--sml">
												<p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Is primary?</p>
												<p className="type--base type--wgt--bold">{primaryAddress.isPrimary ? "Yes" : "No"}</p>
											</div>
										</div>
									) : (
										''
									)}
								</div>
							)}
						</div>
						<div className="col col-sml-12 col-lrg-12 u-mar--top--sml">
							{isEditEnabled && ((secondaryAddress && secondaryAddress.id === editId) || undefined === editId) ? (
								<DonorAddressEditTemplate
									form={form}
									title="Secondary"
									onCancelEditClick={onCancelEditClick}
									isAssignableAsPrimary={true}
								/>
							) : (
								<span
									title={`Click to ${secondaryAddress ? 'edit' : 'insert'}`}
									onClick={() => onEnableEditClick(secondaryAddress)}
								>
									{secondaryAddress ? (
										<Address value={secondaryAddress} format="full" />
									) : (
										<button className="btn btn--link btn--sml">Add new address</button>
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

DonorAddressListTemplate.propTypes = {
	donorAddressViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorAddressListTemplate);
