import React from 'react';
import { BasicFormatFieldInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

function PhoneNumberFieldInput(props) {
    return <BasicFormatFieldInputTemplate format="(###) ### ####" {...props} />;
}

export default defaultTemplate(PhoneNumberFieldInput);
