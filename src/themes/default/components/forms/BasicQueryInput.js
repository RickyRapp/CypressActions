import React from 'react';
import { defaultTemplate } from 'core/hoc';

const BasicQueryInput = defaultTemplate(({ id, label, type, queryUtility, propertyName, t }) => {
    return (
        <div>
            {label && (
                <div className="form__group__label" htmlFor={id}>
                    {t(label)}
                </div>
            )}
            <input
                id={id}
                type={type}
                className="input input--med input--text"
                value={queryUtility.filter[propertyName] || ''}
                onChange={e => {
                    queryUtility.filter.set(propertyName, e.target.value);
                }}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        queryUtility.fetch();
                    }
                }}
            />
        </div>
    );
});

export default BasicQueryInput;
