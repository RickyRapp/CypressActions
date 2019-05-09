import React from 'react';
import { BasicInput, BasicFormatFieldInput } from 'core/components';

function PhoneNumberTemplate({
    field,
    title = null,
    numberColumn = 6,
    descriptionColumn = 4
}) {

    return (
        <React.Fragment>
            {title &&
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
                </div>}
            <div className={`form__group f-col f-col-lrg-${numberColumn}`}>
                <BasicFormatFieldInput field={field.$('number')} format="(###) ### ####" />
            </div>
            {field.has('description') &&
                <div className={`form__group f-col f-col-lrg-${descriptionColumn}`}>
                    <BasicInput field={field.$('description')} />
                </div>}
        </React.Fragment>
    );
}

export default PhoneNumberTemplate;