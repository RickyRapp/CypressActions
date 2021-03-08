import React from 'react';
import { defaultTemplate } from 'core/hoc'
import { BasicInput, BasicTextArea, BasicFieldCheckbox } from 'core/components';
import PropTypes from 'prop-types';

function GrantPurposeTypeTemplate({ grantPurposeType, form, t }
) {
    return (
        <React.Fragment>
            {grantPurposeType.abrv === 'in-honor-of' &&
                <BasicInput field={form.$('purposeNote')} />}

            {grantPurposeType.abrv === 'solicited-by' &&
                <BasicInput field={form.$('purposeNote')} />}

            {grantPurposeType.abrv === 'other' &&
                <BasicTextArea field={form.$('purposeNote')} label="Note" placeholder="Note" />}
        </React.Fragment>
    )
}

GrantPurposeTypeTemplate.propTypes = {
    grantPurposeType: PropTypes.object.isRequired,
    form: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(GrantPurposeTypeTemplate);