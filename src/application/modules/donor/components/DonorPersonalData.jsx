import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    DonorAddressListTable,
    DonorEmailAddressListTable,
    DonorPhoneNumberListTable,
    DonorBankAccountListTable
} from 'application/donor/components';

function DonorPersonalDataTemplate() {
    return (
        <div className="card--form card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorBankAccountListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAddressListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorEmailAddressListTable />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorPhoneNumberListTable />
                </div>
            </div>
        </div>
    )
}

DonorPersonalDataTemplate.propTypes = {
    t: PropTypes.func
};

export default defaultTemplate(DonorPersonalDataTemplate);
