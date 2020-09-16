import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    DonorAddressListTable,
    DonorEmailAddressListTable,
    DonorPhoneNumberListTable,
    DonorBankAccountListTable
} from 'application/donor/components';

function DonorPersonalDataTemplate({ donorId }) {
    return (
        <div className="card--form card--primary card--med">
            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorBankAccountListTable donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorAddressListTable donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorEmailAddressListTable donorId={donorId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <DonorPhoneNumberListTable donorId={donorId} />
                </div>
            </div>
        </div>
    )
}

DonorPersonalDataTemplate.propTypes = {
    donorId: PropTypes.string.isRequired
};

export default defaultTemplate(DonorPersonalDataTemplate);
