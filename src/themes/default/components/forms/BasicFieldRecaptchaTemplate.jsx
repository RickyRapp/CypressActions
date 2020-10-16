import React from 'react';
import { PropTypes } from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { renderIf, isSome } from 'core/utils';
import { BaasicRecaptcha } from 'core/components';

const BasicFieldRecaptchaTemplate = defaultTemplate(({ field, t }) => {
    return (
        <div className="recaptcha">
            <label className="form__group__label" htmlFor={field.id}>
                {t(field.label)}
            </label>
            <BaasicRecaptcha verifyCallback={response => field.set(response)} />
            {renderIf(isSome(field.localizedError))(<p className="type--tny type--color--warning u-mar--top--nano">{field.localizedError}</p>)}
        </div>
    );
});

BasicFieldRecaptchaTemplate.propTypes = {
    field: PropTypes.any,
    t: PropTypes.func,
};

export default BasicFieldRecaptchaTemplate;
