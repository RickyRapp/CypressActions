import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls,
    EditFormContent,
    BaasicButton,
    BaasicModal,
    BaasicInput
} from 'core/components';
import { BlankCertificateModal } from 'themes/application/session/components';
import _ from 'lodash';

function Step3Template({ step3ViewStore }) {
    const {
        form,
        session,
        previousStep,
        barcode,
        addCertificate,
        blankCertificateModal,
        connectionEstablished
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
                                                {`$${item.certificateValue}`}
                                            </div>
                                            <div className="form__group col col-lrg-3">
                                                ${item.certificateValue - item.deductionCertificateAmount}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row">
                                <div className="form__group col col-lrg-4">
                                    <BaasicInput
                                        className={barcode ? "input input--med input--text input--disabled" : "input input--med input--text"}
                                        disabled={barcode !== '' || !connectionEstablished}
                                        value={barcode}
                                        onChange={addCertificate}
                                    >
                                    </BaasicInput>
                                </div>
                            </div>
                            {renderEditLayoutFooterContent({
                                form,
                                previousStep,
                                connectionEstablished
                            })}
                        </EditFormContent>
                        <BaasicModal modalParams={blankCertificateModal} showClose={false}>
                            <BlankCertificateModal />
                        </BaasicModal>
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

function renderEditLayoutFooterContent({ form, previousStep, connectionEstablished }) {
    return (
        <div className="u-mar--bottom--med">
            <BaasicButton
                className="btn btn--base btn--ghost u-mar--right--sml"
                onClick={previousStep}
                label='SESSION.CREATE.STEP2.BUTTONS.BACK'
                disabled={!connectionEstablished}
            />
            <BaasicFormControls
                form={form}
                onSubmit={form.onSubmit}
                label='SESSION.CREATE.STEP2.BUTTONS.SAVE'
                disabled={!connectionEstablished} />
        </div>
    )
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any.isRequired,
    previousStep: PropTypes.func.isRequired,
    connectionEstablished: PropTypes.bool.isRequired
};

export default defaultTemplate(Step3Template);
