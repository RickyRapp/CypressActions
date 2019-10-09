import React from 'react';
import { BaasicRecaptchaTemplate } from 'themes/components';

function BaasicRecaptcha(props) {
    return <BaasicRecaptchaTemplate {...props} sitekey={ApplicationSettings.recaptchaSiteKey} />
}

export default BaasicRecaptcha;