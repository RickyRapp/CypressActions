import React from 'react';
import { BaasicFieldDropdown, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

const AchTemplate = ({ bankAccountDropdownStore, field, openBankAccountModal }) => {
    const addButton = <BaasicButton
        className="btn btn--icon"
        icon='u-icon u-icon--unlocked u-icon--sml' //TODO replace with add icon
        label='CONTRIBUTION.CREATE.FIELDS.ADD_BANK_ACCOUNT_LABEL'
        onlyIcon={true}
        onClick={openBankAccountModal}>
    </BaasicButton>

    return (
        <div className="row">
            <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                <BaasicFieldDropdown field={field} store={bankAccountDropdownStore} additionalLabel={addButton} />
            </div>
        </div>
    );
};

AchTemplate.propTypes = {
    field: PropTypes.object.isRequired,
    bankAccountDropdownStore: PropTypes.object.isRequired,
    openBankAccountModal: PropTypes.func.isRequired
};

export default defaultTemplate(AchTemplate);