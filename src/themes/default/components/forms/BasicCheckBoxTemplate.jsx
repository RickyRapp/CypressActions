import React from 'react';
import { defaultTemplate, renderIf, isSome } from 'core/utils';

const BasicCheckBoxTemplate = defaultTemplate(({ field, onChange = null, label = '' }) => {


    return (
        <div className="inputgroup">
            <label htmlFor={field.id}>{label ? label : field.label}</label>
            <div className="display--b pull spc--left--sml">
                <input
                    {...field.bind()}
                    onChange={(event) => { field.sync(event); onChange ? onChange(event) : null }}
                />
                {renderIf(isSome(field.error))(
                    <p className="type--tiny type--color--error">{field.error}</p>
                )}
            </div>
        </div>
    );
});

export default BasicCheckBoxTemplate;
