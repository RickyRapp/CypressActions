import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    CharityAddressListTable,
    CharityBankAccount
} from 'application/administration/charity/components';

function CharityPersonalDataTemplate() {
    return (
        <div className="card--primary card--med u-mar--top--sml">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityBankAccount />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityAddressListTable />
                </div>
            </div>
        </div>
    )
}

CharityPersonalDataTemplate.propTypes = {
};

export default defaultTemplate(CharityPersonalDataTemplate);
