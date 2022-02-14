import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput
} from 'core/components'

const CharityChangePasswordTemplate = function ({t, charityChangePasswordViewStore}){
    const {
        loaderStore,
        form
    } = charityChangePasswordViewStore;

    return (
        <div>
        <EditFormContent form={form}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
        >
            <h3 className="list--preferences__title">{t('CHARITY.CHANGE_PASSWORD.TITLE')}</h3>
          
            <div className="list--preferences">
                <div className="list--preferences__label is-dropdown">
                    {t("CHARITY.CHANGE_PASSWORD.FIELDS.PASSWORD")}
                </div>
                <div className="list--preferences__field">
                    <BasicInput showLabel={false} field={form.$('charityChangePassword')} />
                </div>
            </div>

            <div className="type--right">
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </div>
        </EditFormContent>
        </div>
    )
}

CharityChangePasswordTemplate.propTypes = {
    charityChangePasswordViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityChangePasswordTemplate);