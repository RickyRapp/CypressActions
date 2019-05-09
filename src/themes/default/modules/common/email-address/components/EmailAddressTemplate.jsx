import React from 'react';
import { BasicInput } from 'core/components';

function EmailAddressTemplate({
    field,
    title = null,
    emailColumn = 6,
    descriptionColumn = 4
}) {

    return (
        <React.Fragment>
            {title &&
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
                </div>}
            <div className={`form__group f-col f-col-lrg-${emailColumn}`}>
                <BasicInput field={field.$('email')} />
            </div>
            {field.has('description') &&
                <div className={`form__group f-col f-col-lrg-${descriptionColumn}`}>
                    <BasicInput field={field.$('description')} />
                </div>}
        </React.Fragment>
    );
}

export default EmailAddressTemplate;