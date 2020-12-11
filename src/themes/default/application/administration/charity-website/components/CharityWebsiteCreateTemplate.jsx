import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput,
    NumberFormatInputField,
    BaasicFieldDropdown,
} from 'core/components'
import { PageFooter } from 'core/layouts';

const CharityWebsiteCreateTemplate = function ({ t, charityWebsiteCreateViewStore }) {
    const {
        loaderStore,
        form,
        id,
        validateIPaddress,
        charityDropdownStore
    } = charityWebsiteCreateViewStore;

    return (
        <section>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">{t(id ? 'CHARITY_WEBSITE.EDIT.TITLE' : 'CHARITY_WEBSITE.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <NumberFormatInputField field={form.$('ip')} onBlur={validateIPaddress} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BasicInput field={form.$('url')} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BaasicFieldDropdown
                            field={form.$('charityId')}
                            store={charityDropdownStore}
                        />
                    </div>
                </div>
            </EditFormContent>
            <PageFooter>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </PageFooter>
        </section>
    )
}

CharityWebsiteCreateTemplate.propTypes = {
    charityWebsiteCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityWebsiteCreateTemplate);
