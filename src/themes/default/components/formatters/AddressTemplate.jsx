import React from 'react';
import PropTypes from 'prop-types';
import { addressFormatter } from 'core/utils';
import { defaultTemplate } from 'core/hoc';

function AddressTemplate({ format, value }) {
    if (format === 'booklet-order') {
        return (
            <React.Fragment>
                <div className="col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
                        Address Line 1:
												</p>
                    <p className="type--base type--wgt--bold"> {value.addressLine1} </p>
                </div>
                <div className="col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">
                        Address Line 2:
												</p>
                    <p className="type--base type--wgt--bold"> {value.addressLine2} </p>
                </div>
                <div className="col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">City:</p>
                    <p className="type--base type--wgt--bold">{value.city}</p>
                </div>
                <div className="col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">State:</p>
                    <p className="type--base type--wgt--bold">{value.state}</p>
                </div>
                <div className="col col-sml-12 col-lrg-2 u-mar--bottom--sml">
                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Zip Code:</p>
                    <p className="type--base type--wgt--bold">{value.zipCode}</p>
                </div>
            </React.Fragment>
        )
    }
    return addressFormatter.format(value, format);
}

AddressTemplate.propTypes = {
    format: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired
};

export default defaultTemplate(AddressTemplate);
