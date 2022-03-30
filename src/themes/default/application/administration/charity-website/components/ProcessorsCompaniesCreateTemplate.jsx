import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput
} from 'core/components'
import { PageFooter } from 'core/layouts';
import AsyncSelect from 'react-select/async';

const ProcessorsCompaniesCreateTemplate = function ({ t, processorsCompaniesCreateViewStore }) {
    const {
        loaderStore,
        form,
        id,
    } = processorsCompaniesCreateViewStore;

    return (
        <section>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className=" u-mar--bottom--med">{t(id ? 'PROCESSING_COMPANY.EDIT.TITLE' : 'PROCESSING_COMPANY.CREATE.TITLE')}</h3>
                <div className="row row--form">
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="u-mar--bottom--sml col col-lrg-12">
                        <BasicInput field={form.$('description')} />
                    </div>
                </div>
            </EditFormContent>
            <PageFooter>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </PageFooter>
        </section>
    )
}

ProcessorsCompaniesCreateTemplate.propTypes = {
    processorsCompaniesCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ProcessorsCompaniesCreateTemplate);
