import React from 'react';
import { BasicFormatFieldInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

function BasicFormatFieldInput(props) {
    return <BasicFormatFieldInputTemplate {...props} />;
}

export default defaultTemplate(BasicFormatFieldInput);
