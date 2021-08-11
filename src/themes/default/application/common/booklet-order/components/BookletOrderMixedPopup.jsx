import React from 'react';
import { BaasicButton, BaasicFormControls, FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function GrantConfirmTemplate({ modalParams, t }) {
    const {
        form,
        bookletAmount,
        onCancel
    } = modalParams.data;

    return (
        <div className="modal__list__wrap">

            <h3 className="u-mar--bottom--med">Mixed booklets ${bookletAmount}</h3>
            <section className="modal__list u-mar--bottom--med">
                <div>Denomination</div>
                <div className="modal__list__divider"></div>
                <div className="modal__list__amount">Amount of Checks</div>
            </section>

            <div className="u-display--flex">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label='CLOSE'
                    onClick={onCancel}
                />

                {/* <div className="u-mar--left--auto">
                    <BaasicFormControls label='CONFIRM' />
                </div> */}
            </div>
        </div>
    );
}

GrantConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(GrantConfirmTemplate);
