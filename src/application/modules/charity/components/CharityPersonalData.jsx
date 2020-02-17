import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    CharityAddressListTable,
    CharityBankAccountEdit
} from 'application/charity/components';

function CharityPersonalDataTemplate() {
    return (
        <div className="card--form card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityBankAccountEdit />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityAddressListTable />
                </div>
            </div>
        </div>
    )
}

CharityPersonalDataTemplate.propTypes = {
    t: PropTypes.func
};

export default defaultTemplate(CharityPersonalDataTemplate);
