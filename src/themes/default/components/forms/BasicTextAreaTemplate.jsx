import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf } from 'core/utils';

const BasicTextAreaTemplate = defaultTemplate(({ field, t, rows = 3 }) => {
    const { placeholder, ...otherProps } = field.bind();

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    return (
        <div>
            <label className="form__group__label" htmlFor={field.id}>
                {t(field.label)}
                {requiredMark}
            </label>
            <textarea
                className={`input input--textarea input--textarea--vertical`}
                {...otherProps}
                placeholder={t(placeholder)}
                autoFocus={field.initialSetup.autoFocus}
                // onChange={(e) => onChange(e.target.name, e.target.value)}
                rows={rows}
            />
            {renderIf(field.localizedError)(
                <p className="type--tny type--color--warning u-mar--top--nano">{field.localizedError}</p>
            )}
        </div>
    );
});

export default BasicTextAreaTemplate;
