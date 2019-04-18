import React from 'react';
import { defaultTemplate, renderIf, isSome } from 'core/utils';

const BasicCheckBoxTemplate = defaultTemplate(({ field, onChange = null, label = '' }) => {
    return (
        <div className="inputgroup">
            <label htmlFor={field.id}>{label ? label : field.label} <strong>{field.disabled ? 'Disabled' : ''}</strong></label>
            <div className="display--b pull spc--left--sml">
                <input
                    {...field.bind()}
                    onChange={onChange || field.sync}
                />
                {renderIf(isSome(field.error))(
                    <p className="type--tiny type--color--error">{field.error}</p>
                )}
            </div>
        </div>
    );
});

export default BasicCheckBoxTemplate;
