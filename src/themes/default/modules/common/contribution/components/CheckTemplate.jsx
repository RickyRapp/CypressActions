import React from 'react';
import { BaasicFieldDropdown } from 'core/components';

function CheckTemplate({ field }) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-6">
                <BasicInput field={field} />
            </div>
        </div>
    );
}

export default CheckTemplate;


