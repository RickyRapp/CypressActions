import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    NumberFormatInputField,
    NumericInputField,
    EditFormContent,
    ApplicationEmptyState,
    BaasicFormControls,
} from 'core/components'
import { PageFooter } from 'core/layouts';

const CharityGrantRequestCreateTemplate = function ({ t, charityGrantRequestCreateViewStore }) {
    const {
        loaderStore,
        form,
        phoneNumberExist
    } = charityGrantRequestCreateViewStore;

    return (
        <section>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="u-mar--bottom--med">{t('GRANT_REQUEST.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <NumberFormatInputField field={form.$('phoneNumber')} onBlur={phoneNumberExist} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <NumericInputField field={form.$('amount')} />
                    </div>
                </div>
            </EditFormContent>
            <PageFooter>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </PageFooter>
        </section >
    )
}

CharityGrantRequestCreateTemplate.propTypes = {
    charityGrantRequestCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityGrantRequestCreateTemplate);
