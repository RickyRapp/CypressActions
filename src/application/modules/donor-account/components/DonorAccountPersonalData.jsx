import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    DonorAccountAddressListTable,
    DonorAccountEmailAddressListTable,
    DonorAccountPhoneNumberListTable,
    DonorAccountBankAccountListTable
} from 'application/donor-account/components';

function DonorAccountPersonalDataTemplate() {
    return (
        <div className="card--form card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountBankAccountListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountAddressListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountEmailAddressListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAccountPhoneNumberListTable />
                </div>
            </div>
        </div>
    )
}

DonorAccountPersonalDataTemplate.propTypes = {
    t: PropTypes.func
};

export default defaultTemplate(DonorAccountPersonalDataTemplate);
