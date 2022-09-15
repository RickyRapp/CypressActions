import React from 'react';
import { defaultTemplate } from 'core/hoc';
import {
    CharityAddressListTable,
    CharityBankAccount
} from 'application/administration/charity/components';

function CharityPersonalDataTemplate() {
    return (
        <div className="card--primary card--med u-mar--top--sml">
            <div className="u-mar--bottom--med">
                <CharityBankAccount />
            </div>
            <div className="u-mar--bottom--med">
                <CharityAddressListTable />
            </div>
        </div>
    )
}

CharityPersonalDataTemplate.propTypes = {
};

export default defaultTemplate(CharityPersonalDataTemplate);
