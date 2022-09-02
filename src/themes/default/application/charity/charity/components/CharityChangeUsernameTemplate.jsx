import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput
} from 'core/components'

const CharityChangeUsernameTemplate = function ({ t, charityChangeUsernameViewStore }) {

    const {
        loaderStore,
        form
    } = charityChangeUsernameViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
                formClassName={" "}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CHANGE_USERNAME.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">
                        {t("CHARITY.CHANGE_USERNAME.FIELDS.USERNAME")}
                    </div>
                    <div className="list--preferences__field">
                        <BasicInput showLabel={false} field={form.$('userName')} />
                    </div>
                </div>

                <div className="type--right">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </EditFormContent>
        </div>
    )
}

CharityChangeUsernameTemplate.propTypes = {
    charityChangeUsernameViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityChangeUsernameTemplate);