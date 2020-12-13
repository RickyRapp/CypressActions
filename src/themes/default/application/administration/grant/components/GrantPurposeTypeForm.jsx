import React from 'react';
import { defaultTemplate } from 'core/hoc'
import { BasicInput, BasicTextArea, BasicFieldCheckbox } from 'core/components';
import PropTypes from 'prop-types';

function GrantPurposeTypeForm({ store, form, t }
) {
    return (
        <React.Fragment>
            {store.value.abrv === 'in-memory-of' &&
                <BasicInput field={form.$('purposeMemberName')} />}

            {store.value.abrv === 'in-honor-of' &&
                <BasicInput field={form.$('purposeMemberName')} />}

            {store.value.abrv === 'sponsor-a-friend' &&
                <BasicInput field={form.$('purposeMemberName')} />}

            {store.value.abrv === 'other' &&
                <BasicTextArea field={form.$('additionalInformation')} />}

            {store.value.abrv === 'charity-event' &&
                <React.Fragment>
                    <BasicFieldCheckbox field={form.$('charityEventAttending')} />
                    {form.$('charityEventAttending').value === true ?
                        <div className="form__group col col-lrg-12">
                            {t("GRANT.CREATE.FIELDS.CHARITY_EVENT_ATTENDING_MESSAGE")}
                        </div>
                        :
                        <div className="form__group col col-lrg-12">
                            {t("GRANT.CREATE.FIELDS.CHARITY_EVENT_NOT_ATTENDING_MESSAGE")}
                        </div>}
                </React.Fragment>}

            {store.value.abrv === 'membership' &&
                t("GRANT.CREATE.FIELDS.MEMBERSHIP_LABEL")}

            {store.value.abrv === 'non-binding-pledge' &&
                t("GRANT.CREATE.FIELDS.NON_BINDING_PLEDGE_LABEL")}
        </React.Fragment>
    )
}

GrantPurposeTypeForm.propTypes = {
    store: PropTypes.object.isRequired,
    form: PropTypes.object,
    t: PropTypes.func
};

export default defaultTemplate(GrantPurposeTypeForm);