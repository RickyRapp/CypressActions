import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf } from 'core/utils';

const BasicTextAreaTemplate = defaultTemplate(({ field, t, label = null, placeholder = null, rows = 3 }) => {
    console.log(field);
    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span className="type--color--note u-mar--left--tny">*</span> : null;

    return (
        <div>
            <label className="form__group__label" htmlFor={field.id}>
                {t(label || field.label)}
                {requiredMark}
            </label>
            <textarea
                className={`input input--textarea input--textarea--vertical`}
                {...field.bind()}
                placeholder={t(placeholder || field.placeholder)}
                autoFocus={field.initialSetup.autoFocus}
                // onChange={(e) => onChange(e.target.name, e.target.value)}
                rows={rows}
            />
            {renderIf(field.localizedError)(
                <p className="validation__message">{field.localizedError}</p>
            )}
        </div>
    );
});

export default BasicTextAreaTemplate;
