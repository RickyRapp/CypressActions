import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicButton,
    BasicInput
} from 'core/components'

const CharityResetPasswordTemplate = function ({ t, charityResetPasswordViewStore }) {
    const {
        loaderStore,
        form
    } = charityResetPasswordViewStore;

    return (
        <div>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
                formClassName={" "}
            >
                <h3 className="list--preferences__title">{t('CHARITY.CHANGE_PASSWORD.TITLE')}</h3>

                <div className="list--preferences">
                    <div className="list--preferences__label is-dropdown">
                        {t("PASSWORD_RECOVERY.DESCRIPTION")}
                    </div>
                    <div className="list--preferences__field">
                        <BasicInput showLabel={false} field={form.$('userName')} />
                    </div>
                    {form.error && (
                        <div>
                            <p className="type--color--warning">{form.error}</p>
                        </div>
                    )}
                </div>

                <div className="type--right">
                    <BaasicButton
                        className="btn btn--med btn--primary display--ib u-mar--right--sml"
                        type="submit"
                        label={t('PASSWORD_RECOVERY.RESET_BUTTON')}
                        disabled={form.submitting || form.validating}
                    />
                </div>
            </EditFormContent>
        </div>
    )
}

CharityResetPasswordTemplate.propTypes = {
    charityResetPasswordViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityResetPasswordTemplate);