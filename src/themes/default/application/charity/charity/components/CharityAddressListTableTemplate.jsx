/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Address } from 'core/components';
import { CharityAddressEditForm } from 'application/charity/charity/components';

const CharityAddressListTableTemplate = function({ charityAddressViewStore, t }) {
	const { addresses, onEnableEditClick, onCancelEditClick, isEditEnabled, form, editId } = charityAddressViewStore;

	let primaryAddress = null;
	let secondaryAddress = null;
	if (addresses.length > 0) {
		primaryAddress = addresses.find(c => c.isPrimary);
		if (addresses.some(c => !c.isPrimary)) {
			secondaryAddress = addresses.find(c => !c.isPrimary);
		}
	}

	return (
		<div className="card--primary card--med u-mar--bottom--med">
			<div className="card--primary__header">
				<h3 className=" u-mar--bottom--med">{t('CHARITY.EDIT.FIELDS.ADDRESS_TITLE')}</h3>
			</div>
			{isEditEnabled && primaryAddress && primaryAddress.id === editId ? (
				<CharityAddressEditForm
					className=" "
					form={form}
					title="Primary"
					onCancelEditClick={onCancelEditClick}
					isAssignableAsPrimary={false}
				/>
			) : (
				<div
					className={`u-mar--bottom--lrg`}
					title="Click to edit"
					onClick={() => onEnableEditClick(primaryAddress)}
				>
					{primaryAddress ? (
						// <Address value={primaryAddress} format='full' />
						<React.Fragment>
							<h3 className="title--secondary u-mar--bottom--sml">Primary Address</h3>
							<div className="info-card__container">
								<div className="info-card__item">
									<p className="info-card__label">Address Line 1:</p>
									<p className="info-card__value"> {primaryAddress.addressLine1} </p>
								</div>
								<div className="info-card__item">
									<p className="info-card__label">Address Line 2:</p>
									<p className="info-card__value"> {primaryAddress.addressLine2} </p>
								</div>
								<div className="info-card__item">
									<p className="info-card__label">City:</p>
									<p className="info-card__value">{primaryAddress.city}</p>
								</div>
								<div className="info-card__item">
									<p className="info-card__label">State:</p>
									<p className="info-card__value">{primaryAddress.state}</p>
								</div>
								<div className="info-card__item">
									<p className="info-card__label">Zip Code:</p>
									<p className="info-card__value">{primaryAddress.zipCode}</p>
								</div>
								<div className="info-card__item">
									<p className="info-card__label">Primary</p>
									<p className="info-card__value">
										{primaryAddress.isPrimary ? <i className="u-icon u-icon--approve u-icon--base"></i> : 'No'}
									</p>
								</div>
							</div>
						</React.Fragment>
					) : (
						''
					)}
				</div>
			)}

			<div className={`u-mar--top--sml`}>
				{isEditEnabled && ((secondaryAddress && secondaryAddress.id === editId) || undefined === editId) ? (
					<CharityAddressEditForm
						form={form}
						title="Secondary"
						onCancelEditClick={onCancelEditClick}
						isAssignableAsPrimary={true}
					/>
				) : (
					<React.Fragment>
						<h3 className="title--secondary u-mar--bottom--sml">Secondary Address</h3>
						<span
							className="cursor--pointer type--base type--wgt--bold"
							title={`Click to ${secondaryAddress ? 'edit' : 'insert'}`}
							onClick={() => onEnableEditClick(secondaryAddress)}
						>
							{secondaryAddress ? (
								<Address value={secondaryAddress} format="full" />
							) : (
								<button className="btn btn--link btn--sml">Add new address</button>
							)}
						</span>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

CharityAddressListTableTemplate.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
	authorization: PropTypes.any,
};

export default defaultTemplate(CharityAddressListTableTemplate);
