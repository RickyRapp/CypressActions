import React from 'react';
import { BaasicRecaptchaTemplate } from 'themes/components';

function BaasicRecaptcha(props) {
    return <BaasicRecaptchaTemplate {...props} sitekey={ApplicationSettings.recaptchaSiteKey} />// eslint-disable-line
}

export default BaasicRecaptcha;