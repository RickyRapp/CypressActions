import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const CharityPaymentOptionsTemplate = function ({t, charityPaymentOptionsViewStore}){
    return (
        <div>
        </div>
    )
}

CharityPaymentOptionsTemplate.propTypes = {
    charityPaymentOptionsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityPaymentOptionsTemplate);