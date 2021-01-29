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

const BankCreateTemplate = function ({ t, bankCreateViewStore }) {
    const {
        loaderStore,
        form,
        id
    } = bankCreateViewStore;

    return (
        <section >
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h3 className=" u-mar--bottom--med">{t(id ? 'BANK.EDIT.TITLE' : 'BANK.CREATE.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('name')} />
                    </div>
                    <div className="form__group col col-lrg-12">
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

BankCreateTemplate.propTypes = {
    bankCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BankCreateTemplate);
