import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf } from 'core/utils';

const BasicTextAreaTemplate = defaultTemplate(({ field, t }) => {
    const { placeholder, ...otherProps } = field.bind();
    
    if(otherProps.value){
        otherProps.value = otherProps.value.replace(/\s+/g, ' ');
    } else {
        otherProps.value = '';
    }

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    return (
        <div>
            <label className="form__group__label" htmlFor={field.id}>{t(field.label)}{requiredMark}</label>
            <textarea className="input input--med input--textarea"
                {...otherProps}
                placeholder={t(placeholder)}
            // onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            {renderIf(field.localizedError)(<p className="type--tiny type--color--error">{field.localizedError}</p>)}
        </div>
    )
});

export default BasicTextAreaTemplate;
