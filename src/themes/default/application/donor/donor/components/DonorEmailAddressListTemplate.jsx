import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { DonorEmailAddressEditTemplate } from 'themes/application/donor/donor/components';
import { EmailAddress } from 'core/components';

const DonorEmailAddressListTableTemplate = function ({ donorEmailAddressViewStore, t }) {
    const {
        emailAddresses,
        onEnableEditClick,
        onCancelEditClick,
        isEditEnabled,
        form,
        editId
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
            <div className="row u-mar--bottom--sml">
                <div className="col col-sml-12 col-lrg-3">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_EMAIL_ADDRESS')}</h3>
                </div>
                <div className="col col-sml-12 col-lrg-9">
                    <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && primaryEmailAddress && primaryEmailAddress.id === editId ?
                                <DonorEmailAddressEditTemplate
                                    form={form}
                                    title="Primary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={false} />
                                :
                                <strong
                                    title='Click to edit'
                                    onClick={() => onEnableEditClick(primaryEmailAddress)}>
                                    {primaryEmailAddress ?
                                        <EmailAddress value={primaryEmailAddress} format='full' /> : ''}
                                </strong>}
                        </div>
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && (secondaryEmailAddress && secondaryEmailAddress.id === editId || undefined === editId) ?
                                <DonorEmailAddressEditTemplate
                                    form={form}
                                    title="Secondary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={true} />
                                :
                                <span
                                    title={`Click to ${secondaryEmailAddress ? 'edit' : 'insert'}`}
                                    onClick={() => onEnableEditClick(secondaryEmailAddress)}>
                                    {secondaryEmailAddress ?
                                        <EmailAddress value={secondaryEmailAddress} format='full' />
                                        :
                                        <span>Add new email address</span>}
                                </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

DonorEmailAddressListTableTemplate.propTypes = {
    donorEmailAddressViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorEmailAddressListTableTemplate);

