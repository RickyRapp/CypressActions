import React from 'react';
import { BaasicFieldDropdown } from 'core/components';
import { defaultTemplate } from 'core/utils';

const AchTemplate = defaultTemplate(({ bankAccountDropdownStore, t, field, addBankAccountModalParams = null, syncBankAccounts = null }) => {
    let label = null;
    if (addBankAccountModalParams && syncBankAccounts)
        label = <label>{field.label} <span title={t('ADD')} className="icomoon icon-add tiny spc--left--tny" onClick={() => addBankAccountModalParams.open()} /> <span title={t('SYNC')} className="icomoon icon-synchronize-arrows-1 tiny spc--left--tny" onClick={() => syncBankAccounts()} /></label>
    else if (addBankAccountModalParams)
        label = <label>{field.label} <span title={t('ADD')} className="icomoon icon-add tiny spc--left--tny" onClick={() => addBankAccountModalParams.open()} /> </label>
    else if (syncBankAccounts)
        label = <label>{field.label} <span title={t('SYNC')} className="icomoon icon-synchronize-arrows-1 tiny spc--left--tny" onClick={() => syncBankAccounts()} /></label>

    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BaasicFieldDropdown field={field} store={bankAccountDropdownStore} label={label} />
            </div>
        </div>
    );
});

export default AchTemplate;


