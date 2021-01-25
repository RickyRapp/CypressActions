import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';
import { DonorPhoneNumberEditTemplate } from 'themes/application/donor/donor/components';

const DonorAddressListTemplate = function ({ donorPhoneNumberViewStore, t }) {
    const {
        phoneNumbers,
        onEnableEditClick,
        onCancelEditClick,
        isEditEnabled,
        form,
        editId
    } = donorPhoneNumberViewStore;

    let primaryPhoneNumber = null;
    let secondaryPhoneNumber = null;
    if (phoneNumbers.length > 0) {
        primaryPhoneNumber = phoneNumbers.find(c => c.isPrimary);
        if (phoneNumbers.some(c => !c.isPrimary)) {
            secondaryPhoneNumber = phoneNumbers.find(c => !c.isPrimary);
        }
    }

    return (
        <div>
            <div className="row u-mar--bottom--sml">
                <div className="col col-sml-12 col-lrg-3">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t('DONOR.ACCOUNT_INFORMATION_FIELDS.TITLE_PHONE_NUMBER')}</h3>
                </div>
                <div
                    className={`col col-sml-12 col-lrg-${(isEditEnabled && primaryPhoneNumber && primaryPhoneNumber.id === editId) || undefined === editId ? '12' : '9'
                        }`}
                >
                    <div className="row u-mar--bottom--sml">
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && primaryPhoneNumber && primaryPhoneNumber.id === editId ?
                                <DonorPhoneNumberEditTemplate
                                    form={form}
                                    title="Primary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={false} />
                                :
                                <p
                                    className="type--base type--wgt--medium scale"
                                    title='Click to edit'
                                    onClick={() => onEnableEditClick(primaryPhoneNumber)}>
                                    {primaryPhoneNumber &&
                                        <FormatterResolver
                                            item={primaryPhoneNumber}
                                            field="number"
                                            format={{ type: 'phone-number' }}
                                        />}
                                </p>}
                        </div>
                        <div className="col col-sml-12 col-lrg-12">
                            {isEditEnabled && (secondaryPhoneNumber && secondaryPhoneNumber.id === editId || undefined === editId) ?
                                <DonorPhoneNumberEditTemplate
                                    form={form}
                                    title="Secondary"
                                    onCancelEditClick={onCancelEditClick}
                                    isAssignableAsPrimary={true} />
                                :
                                <span
                                    title={`Click to ${secondaryPhoneNumber ? 'edit' : 'insert'}`}
                                    onClick={() => onEnableEditClick(secondaryPhoneNumber)}>
                                    {secondaryPhoneNumber ?
                                        <FormatterResolver
                                            item={secondaryPhoneNumber}
                                            field="number"
                                            format={{ type: 'phone-number' }}
                                        />
                                        :
                                        <span>Add new phone number</span>}
                                </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

DonorAddressListTemplate.propTypes = {
    donorPhoneNumberViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default defaultTemplate(DonorAddressListTemplate);
