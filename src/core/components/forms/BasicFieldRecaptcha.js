import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { BasicFieldRecaptchaTemplate } from 'themes/components';

function BasicFieldRecaptcha(props) {
    return <BasicFieldRecaptchaTemplate {...props} />
}

export default defaultTemplate(BasicFieldRecaptcha);