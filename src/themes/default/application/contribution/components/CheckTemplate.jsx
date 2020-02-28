import React from 'react';
import { BasicInput } from 'core/components';
import PropTypes from 'prop-types';

function CheckTemplate({ field }) {
    return (
        <div className="row">
            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                <BasicInput field={field} />
            </div>
        </div>
    );
}

CheckTemplate.propTypes = {
    field: PropTypes.object.isRequired
};

export default CheckTemplate;