import React from 'react';
import { BasicFieldRecaptchaTemplate } from 'themes/components';
import { defaultTemplate } from "core/utils";

function BasicFieldRecaptcha(props) {
    return <BasicFieldRecaptchaTemplate {...props} />
}

export default defaultTemplate(BasicFieldRecaptcha);