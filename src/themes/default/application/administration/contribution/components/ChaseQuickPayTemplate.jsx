import React from 'react';
import { BasicInput } from 'core/components';
import PropTypes from 'prop-types';

function ChaseQuickPayTemplate({ form }) {
    return (
        <div className="row row--form">
            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                <BasicInput field={form.$('transactionId')} />
            </div>
            <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                <BasicInput field={form.$('memo')} />
            </div>
        </div>
    );
}

ChaseQuickPayTemplate.propTypes = {
    form: PropTypes.object.isRequired
};

export default ChaseQuickPayTemplate;