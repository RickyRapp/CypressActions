import React from 'react';
import { defaultTemplate } from 'core/hoc'
import { BasicInput, BasicTextArea, BasicFieldCheckbox } from 'core/components';
import PropTypes from 'prop-types';

function GrantPurposeTypeTemplate({ store, form, t }
) {
    return (
        <React.Fragment>
            {store.value.abrv === 'in-honor-of' &&
                <BasicInput field={form.$('purposeNote')} />}

            {store.value.abrv === 'solicited-by' &&
                <BasicInput field={form.$('purposeNote')} />}

            {store.value.abrv === 'other' &&
                <BasicTextArea field={form.$('purposeNote')} label="Note" placeholder="Note"/>}
        </React.Fragment>
    )
}

GrantPurposeTypeTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    form: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(GrantPurposeTypeTemplate);