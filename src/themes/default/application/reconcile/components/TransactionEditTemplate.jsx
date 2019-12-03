import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    BasicCheckbox,
    BaasicFormControls,
    BasicTextArea,
    SimpleBaasicTable
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const TransactionEditTemplate = function ({ transactionEditViewStore, t }) {
    const {
        form,
        cashedVariable,
        voidVariable,
        onChangeCashed,
        onChangeVoid,
        item,
        tableStore
    } = transactionEditViewStore;

    return (
        <form className='form'>
            <section className='w--600--px'>
                <div className="row">
                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Check number</label>
                            <span className={"input input--med input--text input--disabled"}>
                                {item && item.paymentNumber}
                            </span>
                        </div>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                        <h3>Voided checks</h3>
                        <SimpleBaasicTable tableStore={tableStore} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                        <BasicTextArea field={form.$('description')} rows={2} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                        <BasicCheckbox
                            id='1'
                            checked={cashedVariable}
                            onChange={(event) => onChangeCashed(event.target.checked)}
                            label='Cashed'
                        />
                        <BasicCheckbox
                            id='2'
                            checked={voidVariable}
                            onChange={(event) => onChangeVoid(event.target.checked)}
                            label='Void'
                        />
                    </div>
                    {form.$('checkCashed').value === false &&
                        <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                            <BasicInput field={form.$('newCheckNumber')} />
                        </div>}
                </div>
                {renderEditLayoutFooterContent({ form })}
            </section>
        </form>
    )
};

TransactionEditTemplate.propTypes = {
    transactionEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

function renderEditLayoutFooterContent({ form }) {
    return <div>
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>

}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(TransactionEditTemplate);
