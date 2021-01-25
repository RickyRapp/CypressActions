import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    Address
} from 'core/components';
import { DonorAddressEditTemplate } from 'themes/application/donor/donor/components';

const DonorAddressListTemplate = function ({ donorAddressViewStore, t }) {
    const {
        addresses,
        onEnableEditClick,
        onCancelEditClick,
        isEditEnabled,
        form,
        editId
    } = donorAddressViewStore;

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
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_ADDRESS')}</h3>
                </div>
                <div
					className={`col col-sml-12 col-lrg-${
						(isEditEnabled && primaryAddress && primaryAddress.id === editId) || undefined === editId ? '12' : '9'
					}`}
				>
                    <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && primaryAddress && primaryAddress.id === editId ?
                                <DonorAddressEditTemplate
                                    form={form}
                                    title="Primary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={false} />
                                :
                                <p
									className="type--base type--wgt--medium scale"
                                    title='Click to edit'
                                    onClick={() => onEnableEditClick(primaryAddress)}>
                                    {primaryAddress ?
                                        <Address value={primaryAddress} format='full' /> : ''}
                                </p>}
                        </div>
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && (secondaryAddress && secondaryAddress.id === editId || undefined === editId) ?
                                <DonorAddressEditTemplate
                                    form={form}
                                    title="Secondary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={true} />
                                :
                                <span
                                    title={`Click to ${secondaryAddress ? 'edit' : 'insert'}`}
                                    onClick={() => onEnableEditClick(secondaryAddress)}>
                                    {secondaryAddress ?
                                        <Address value={secondaryAddress} format='full' />
                                        :
                                        <span>Add new address</span>}
                                </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

DonorAddressListTemplate.propTypes = {
	donorAddressViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorAddressListTemplate);
