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
import { renderIf } from 'core/utils';

const TransactionEditTemplate = function ({ transactionEditViewStore }) {
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
            <section >
                <div className="row">
                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Check number</label>
                            <span className={"input input--lrg input--text input--disabled"}>
                                {item && item.paymentNumber}
                            </span>
                        </div>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                        <h3>Voided checks</h3>
                        <SimpleBaasicTable tableStore={tableStore} />
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
                        {renderIf(form.$('isCashed').localizedError)(<div className="type--tny type--color--warning u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>Select either Cashed or Void.</div>)}
                    </div>
                    {form.$('isCashed').value === false &&
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicInput field={form.$('newCheckNumber')} />
                        </div>}
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                        <BasicTextArea field={form.$('description')} rows={2} />
                    </div>
                </div>
                {renderEditLayoutFooterContent({ form })}
            </section>
        </form>
    )
};

TransactionEditTemplate.propTypes = {
    transactionEditViewStore: PropTypes.object.isRequired
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
