import React from 'react';
import { BasicInput } from 'core/components';

function AddressTemplate({
    field,
    title = null,
    addressLine1Column = 6,
    addressLine2Column = 6,
    cityColumn = 4,
    stateColumn = 4,
    zipCodeColumn = 4,
    descriptionColumn = 4
}) {

    return (
        <React.Fragment>
            {title &&
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
                </div>}
            <div className={`form__group f-col f-col-lrg-${addressLine1Column}`}>
                <BasicInput field={field.$('addressLine1')} />
            </div>
            <div className={`form__group f-col f-col-lrg-${addressLine2Column}`}>
                <BasicInput field={field.$('addressLine2')} />
            </div>
            <div className={`form__group f-col f-col-lrg-${cityColumn}`}>
                <BasicInput field={field.$('city')} />
            </div>
            <div className={`form__group f-col f-col-lrg-${stateColumn}`}>
                <BasicInput field={field.$('state')} />
            </div>
            <div className={`form__group f-col f-col-lrg-${zipCodeColumn}`}>
                <BasicInput field={field.$('zipCode')} />
            </div>
            {field.has('description') &&
                <div className={`form__group f-col f-col-lrg-${descriptionColumn}`}>
                    <BasicInput field={field.$('description')} />
                </div>}
        </React.Fragment>
    );
}

export default AddressTemplate;