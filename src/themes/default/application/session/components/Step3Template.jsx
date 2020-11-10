import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls,
    BaasicButton,
    BaasicInput,
    FormDebug
} from 'core/components';

function Step3Template({
    form,
    t,
    onPreviousStepClick,
    barcode,
    onBarcodeChange,
    sessionCertificates
}) {
    return (
        <React.Fragment>
            <div className="card--med">
                <div className="row">
                    <div className="col col-lrg-6">
                        <div className="card--primary card--med u-mar--bottom--sml">
                            <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">General Data</h3>
                            <div className="u-mar--bottom--lrg">
                                <div className="row">
                                    <div className="col col-lrg-3 type--base type--wgt--medium">
                                        {t('Certificate Number')}
                                    </div>
                                    <div className="col col-lrg-3 type--base type--wgt--medium">
                                        {t('Barcode')}
                                    </div>
                                    <div className="col col-lrg-3 type--base type--wgt--medium">
                                        {t('Denomination')}
                                    </div>
                                    <div className="col col-lrg-3 type--base type--wgt--medium">
                                        {t('Amount')}
                                    </div>
                                </div>
                                {sessionCertificates.map(c => {
                                    return (
                                        <div className="row" key={c.barcode}>
                                            <div className="col col-lrg-3 type--base type--wgt--medium">
                                                {c.bookletCode}-{c.certificateCode}
                                            </div>
                                            <div className="col col-lrg-3 type--base type--wgt--medium">
                                                {c.barcode}
                                            </div>
                                            <div className="col col-lrg-3 type--base type--wgt--medium">
                                                {`$${c.certificateValue}`} {c.insufficientFunds ? ` - maybe insufficient funds` : ''}
                                            </div>
                                            <div className="col col-lrg-3 type--base type--wgt--medium">
                                                ${c.certificateValue - c.deductionCertificateAmount}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="row">
                                <div className="col col-sml-12 col-lrg-4 u-mar--bottom--sml">
                                    <BaasicInput
                                        id='barcode'
                                        className="input input--med input--text"
                                        value={barcode}
                                        onChange={onBarcodeChange}
                                        maxLength={10}
                                    >
                                    </BaasicInput>
                                </div>
                            </div>

                            <div className="u-mar--bottom--med">
                                <BaasicButton
                                    className="btn btn--base btn--ghost u-mar--right--sml"
                                    onClick={onPreviousStepClick}
                                    label='SESSION.CREATE.STEP2.BUTTONS.BACK'
                                />
                                <BaasicFormControls
                                    form={form}
                                    onSubmit={form.onSubmit}
                                    // disableSave={sessionCertificates.length === 0}
                                    label='SESSION.CREATE.STEP2.BUTTONS.SAVE'
                                />
                            </div>
                            {/* <BaasicModal modalParams={blankCertificateModal} showClose={false}>
                                <BlankCertificateModal />
                            </BaasicModal> */}
                        </div>
                    </div>
                    <div className="col col-lrg-6">
                        <div className="card--primary card--med type--base type--wgt--regular u-mar--bottom--sml">
                            How to scan certificates
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Step3Template.propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    onPreviousStepClick: PropTypes.func.isRequired,
    barcode: PropTypes.string.isRequired,
    onBarcodeChange: PropTypes.func.isRequired,
    sessionCertificates: PropTypes.any.isRequired,
};

export default defaultTemplate(Step3Template);
