import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BaasicFormControls,
    BasicTextArea,
    SimpleBaasicTable,
    EditFormContent,
    BasicRadio
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const ReconcileEditTemplate = function ({ reconcileEditViewStore }) {
    const {
        form,
        item,
        tableStore
    } = reconcileEditViewStore;

    return (
        <EditFormContent form={form} >
            <div className="">
                <div className="row">
                    <div className="form__group col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Check number</label>
                            <span className={"input input--lrg input--text input--disabled"}>
                                {item && item.paymentNumber}
                            </span>
                        </div>
                    </div>
                </div>
                {tableStore &&
                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                            <h3 className="">Voided checks</h3>
                            <SimpleBaasicTable tableStore={tableStore} />
                        </div>
                    </div>}

                <div className="row">
                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                        <BasicRadio
                            label={'Cashed'}
                            value={'true'}
                            field={form.$('isCashed')}
                        />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                        <BasicRadio
                            label={'Voided'}
                            value={'false'}
                            field={form.$('isCashed')}
                        />
                    </div>

                    {form.$('isCashed').value === 'false' &&
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicInput field={form.$('newCheckNumber')} />
                        </div>}
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                        <BasicTextArea field={form.$('description')} rows={2} />
                    </div>
                </div>
                {renderEditLayoutFooterContent({ form })}
            </div>
        </EditFormContent >
    )
};

ReconcileEditTemplate.propTypes = {
    reconcileEditViewStore: PropTypes.object.isRequired
};

function renderEditLayoutFooterContent({ form }) {
    return <div>
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(ReconcileEditTemplate);
