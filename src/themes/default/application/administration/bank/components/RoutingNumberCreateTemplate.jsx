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

const RoutingNumberCreateTemplate = function ({ t, routingNumberCreateViewStore }) {
    const {
        loaderStore,
        form,
        id,
        bankDropdownStore
    } = routingNumberCreateViewStore;

    return (
        <section >
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className="u-mar--bottom--med">{t(id ? 'ROUTING_NUMBER.EDIT.TITLE' : 'ROUTING_NUMBER.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('region')} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <NumberFormatInputField field={form.$('number')} />
                    </div>
                    <div className="form__group col col-lrg-12">
                        <BaasicFieldDropdown field={form.$('bankId')} store={bankDropdownStore} />
                    </div>
                </div>
            </EditFormContent>
            <PageFooter>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </PageFooter>
        </section>
    )
}

RoutingNumberCreateTemplate.propTypes = {
    routingNumberCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(RoutingNumberCreateTemplate);
