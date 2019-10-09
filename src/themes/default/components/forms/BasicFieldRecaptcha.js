import React from 'react';
import { PropTypes } from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { renderIf, isSome } from 'core/utils';
import { BaasicRecaptcha } from 'core/components';

const BasicFieldRecaptchaTemplate = defaultTemplate(({ field }) => {
    return (
        <div className="recaptcha">
            <label className="form__group__label" htmlFor={field.id}>{field.label}</label>
            <BaasicRecaptcha verifyCallback={(response) => field.set(response)} />
            {renderIf(isSome(field.localizedError))(<p className="type--tiny type--color--error">{field.localizedError}</p>)}
        </div>
    )
});

BasicFieldRecaptchaTemplate.propTypes = {
    field: PropTypes.any
}

export default BasicFieldRecaptchaTemplate;