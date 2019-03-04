import React from 'react';
import { defaultTemplate } from 'core/utils';

const BasicCheckBoxTemplate = defaultTemplate(({ field, label = '' }) => {
    return (
        <div className="group">
            <div className="display--b pull">{label ? label : field.label}</div>
            <div className="display--b pull spc--left--sml">
                <input
                    {...field.bind()}
                    type="checkbox"
                />
                <label htmlFor={field.id}>&nbsp;</label>
            </div>
        </div>
    );
});

export default BasicCheckBoxTemplate;
