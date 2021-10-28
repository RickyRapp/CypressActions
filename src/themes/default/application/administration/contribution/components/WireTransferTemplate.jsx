import React from 'react';
import { BaasicFieldDropdown, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

const WireTransferTemplate = ({ bankAccountDropdownStore, field, openBankAccountModal = null }) => {
    const addButton = <BaasicButton
        className="btn btn--icon"
        icon='u-icon u-icon--unlock u-icon--base' //TODO replace with add icon
        label='CONTRIBUTION.CREATE.FIELDS.ADD_BANK_ACCOUNT_LABEL'
        onlyIcon={true}
        onClick={openBankAccountModal}>
    </BaasicButton>

    return (
        <div className="row">
            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                <BaasicFieldDropdown field={field} store={bankAccountDropdownStore} additionalLabel={addButton} />
            </div>
        </div>
    );
};

WireTransferTemplate.propTypes = {
    field: PropTypes.object.isRequired,
    bankAccountDropdownStore: PropTypes.object.isRequired,
    openBankAccountModal: PropTypes.func.isRequired
};

export default defaultTemplate(WireTransferTemplate);