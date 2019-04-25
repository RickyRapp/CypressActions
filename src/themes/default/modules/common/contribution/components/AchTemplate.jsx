import React from 'react';
import { BaasicFieldDropdown } from 'core/components';

function AchTemplate({ bankAccountDropdownStore, field, label = null }) {
    if (!label) {
        <label>Bank Account <a className="btn btn--xsml btn--tertiary" onClick={() => addBankAccountModalParams.open()}>Add new</a> </label>
    }
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BaasicFieldDropdown field={field} store={bankAccountDropdownStore} label={label} />
            </div>
        </div>
    );
}

export default AchTemplate;


