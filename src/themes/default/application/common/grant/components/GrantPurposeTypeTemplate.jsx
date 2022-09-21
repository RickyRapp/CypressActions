import React from 'react';
import { defaultTemplate } from 'core/hoc'
import { BasicInput, BasicTextArea } from 'core/components';
import PropTypes from 'prop-types';

function GrantPurposeTypeTemplate({ grantPurposeType, form }
) {
    return (
        <React.Fragment>
            {grantPurposeType.abrv === 'in-honor-of' &&
               <BasicInput field={form.$('purposeName')} />}

            {grantPurposeType.abrv === 'solicited-by' &&
                <BasicInput field={form.$('purposeName')} />}

            {grantPurposeType.abrv === 'in-memory-of' &&
                <BasicInput field={form.$('purposeName')} />}

            {grantPurposeType.abrv === 'other' &&
                <BasicTextArea field={form.$('purposeNote')} />}
        </React.Fragment>
    )
} 

GrantPurposeTypeTemplate.propTypes = {
    grantPurposeType: PropTypes.object.isRequired,
    form: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(GrantPurposeTypeTemplate);