import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput,
    NumberFormatInputField,
} from 'core/components'
import { PageFooter } from 'core/layouts';

const ThirdPartyWebsiteCreateTemplate = function ({ modalParams, t, thirdPartyWebsiteCreateViewStore }) {
    const {
        loaderStore,
        form,
        id,
        validateIPaddress
    } = thirdPartyWebsiteCreateViewStore;

    return (
        <section className='w--400--px'>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="u-mar--bottom--med">{t(id ? 'THIRD_PARTY_WEBSITE.EDIT.TITLE' : 'THIRD_PARTY_WEBSITE.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <NumberFormatInputField field={form.$('ip')} onBlur={validateIPaddress} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('url')} />
                    </div>
                </div>
            </EditFormContent>
            <PageFooter>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </PageFooter>
        </section>
    )
}

ThirdPartyWebsiteCreateTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    thirdPartyWebsiteCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ThirdPartyWebsiteCreateTemplate);
