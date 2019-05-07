import React from 'react';
import { BasicInput } from 'core/components';

function AddressTemplate({ field, title = null }) {
    return (
        <React.Fragment>
            {title &&
                <div className="form__group f-col f-col-lrg-12">
                    <h5>{title}</h5>
                </div>}
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('addressLine1')} />
            </div>
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field.$('addressLine2')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('city')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('state')} />
            </div>
            <div className="form__group f-col f-col-lrg-4">
                <BasicInput field={field.$('zipCode')} />
            </div>
            {field.has('description') &&
                <div className="form__group f-col f-col-lrg-4">
                    <BasicInput field={field.$('description')} />
                </div>}
        </React.Fragment>
    );
}

export default AddressTemplate;