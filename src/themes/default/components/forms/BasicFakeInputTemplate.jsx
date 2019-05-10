import React from 'react';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

const BasicFakeInputTemplate = defaultTemplate(({ field, t, label = null }) => {
    return (
        <div className="inputgroup">
            <label htmlFor={field.id}>{label ? t(label) : t(field.label)} </label>
            <span className="input input--text input--med padd--top--tny input--disabled">
                {field.value}
            </span>
        </div>
    )
});

export default BasicFakeInputTemplate;