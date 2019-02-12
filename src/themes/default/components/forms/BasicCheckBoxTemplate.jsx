import React from 'react';
import { defaultTemplate } from 'core/utils';

const BasicCheckBoxTemplate = defaultTemplate(({ field, onChange }) => {
    return (
        <div className="group">
            <div className="display--b pull">{field.label}</div>
            <div className="display--b pull spc--left--sml">
                <input id={field.id} onChange={onChange} checked={field.value} className="input--toggle input--toggle--secondary" type="checkbox" />
                <label htmlFor={field.id}>&nbsp;</label>
            </div>
        </div>
    );
});

export default BasicCheckBoxTemplate;
