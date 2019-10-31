import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls,
    EditFormContent,
    BaasicButton
} from 'core/components';
import _ from 'lodash';

function Step3Template({ step3ViewStore }) {
    const {
        form,
        session,
        previousStep,
        barcode,
        addCertificate,
        denominationTypes
    } = step3ViewStore;

    return (
        <React.Fragment>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <div className="card card--form card--primary card--med u-mar--bottom--sml">
                        <EditFormContent form={form}>
                            <h3 className="u-mar--bottom--med">General Data</h3>
                            <div className="u-mar--bottom--lrg">
                                <div className="row">
                                    <div className="form__group col col-lrg-3">
                                        Certificate Number
                </div>
                                    <div className="form__group col col-lrg-3">
                                        Barcode
                </div>
                                    <div className="form__group col col-lrg-3">
                                        Denomination
                </div>
                                    <div className="form__group col col-lrg-3">
                                        Amount
                </div>
                                </div>
                                {session && session.sessionCertificates && _.map(session.sessionCertificates, function (item) {
                                    return (
                                        <div className="row" key={item.barcode}>
                                            <div className="form__group col col-lrg-3">
                                                {item.bookletCode}-{item.certificateCode}
                                            </div>
                                            <div className="form__group col col-lrg-3">
                                                {item.barcode}
                                            </div>
                                            <div className="form__group col col-lrg-3">
                                                {denominationTypes && _.find(denominationTypes, { id: item.denominationId }).name}
                                            </div>
                                            <div className="form__group col col-lrg-3">
                                                {item.deductionCertificateAmount}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    <input
                                        className={barcode ? "input input--med input--text input--disabled" : "input input--med input--text"}
                                        disabled={barcode !== ''}
                                        value={barcode}
                                        onChange={addCertificate}
                                    />
                                </div>
                            </div>
                            {renderEditLayoutFooterContent({
                                form,
                                previousStep,
                            })}
                        </EditFormContent>
                    </div>
                </div>
                <div className="form__group col col-lrg-6">
                    <div className="card card--form card--primary card--med u-mar--bottom--sml">
                        How to scan certificates
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Step3Template.propTypes = {
    step3ViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEditLayoutFooterContent({ form, previousStep }) {
    return (
        <div className="u-mar--bottom--med">
            <BaasicButton
                className="btn btn--base btn--ghost u-mar--right--sml"
                onClick={previousStep}
                label='SESSION.CREATE.STEP2.BUTTONS.BACK'
            />
            <BaasicFormControls
                form={form}
                onSubmit={form.onSubmit}
                label='SESSION.CREATE.STEP2.BUTTONS.SAVE' />
        </div>
    )
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any.isRequired,
    previousStep: PropTypes.func.isRequired
};

export default defaultTemplate(Step3Template);
