import React from 'react';
import { NumericInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/hoc';

const NumericInput = function(props) {
    return <NumericInputTemplate {...props} />
};

export default defaultTemplate(NumericInput);
