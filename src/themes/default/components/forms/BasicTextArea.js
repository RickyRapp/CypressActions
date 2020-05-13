import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf } from 'core/utils';

const BasicTextAreaTemplate = defaultTemplate(({ field, t, rows }) => {
    const { placeholder, ...otherProps } = field.bind();

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    return (
        <div>
            <label className="form__group__label" htmlFor={field.id}>{t(field.label)}{requiredMark}</label>
            <textarea className="input input--textarea"
                {...otherProps}
                rows={rows}
                placeholder={t(placeholder)}
            // onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            {renderIf(field.localizedError)(<div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>)}
        </div>
    )
});

export default BasicTextAreaTemplate;
