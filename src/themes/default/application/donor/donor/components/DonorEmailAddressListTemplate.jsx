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
                <div className={`col col-sml-12 col-lrg-${isEditEnabled && primaryEmailAddress && primaryEmailAddress.id === editId || (secondaryEmailAddress && secondaryEmailAddress.id === editId || undefined === editId) ? "12" : "9"}`}>
                    <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && primaryEmailAddress && primaryEmailAddress.id === editId ?
                                <DonorEmailAddressEditTemplate
                                    form={form}
                                    title="Primary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={false} />
                                :
                                <p
                                className="type--base type--wgt--bold scale"
                                    title='Click to edit'
                                    onClick={() => onEnableEditClick(primaryEmailAddress)}>
                                    {primaryEmailAddress ?
                                        <EmailAddress value={primaryEmailAddress} format='full' /> : ''}
                                </p>}
                        </div>
                        <div className="col col-sml-12 col-lrg-12 u-mar--top--sml">
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
                                        <button className="btn btn--link btn--sml">Add new email address</button>}
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

