import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFormControls,
    BaasicButton,
    BaasicInput
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
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <div className="card card--form card--primary card--med u-mar--bottom--sml">
                        <h3 className="u-mar--bottom--med">General Data</h3>
                        <div className="u-mar--bottom--lrg">
                            <div className="row">
                                <div className="form__group col col-lrg-3">
                                    {t('Certificate Number')}
                                </div>
                                <div className="form__group col col-lrg-3">
                                    {t('Barcode')}
                                </div>
                                <div className="form__group col col-lrg-3">
                                    {t('Denomination')}
                                </div>
                                <div className="form__group col col-lrg-3">
                                    {t('Amount')}
                                </div>
                            </div>
                            {sessionCertificates.map(c => {
                                return (
                                    <div className="row" key={c.barcode}>
                                        <div className="form__group col col-lrg-3">
                                            {c.bookletCode}-{c.certificateCode}
                                        </div>
                                        <div className="form__group col col-lrg-3">
                                            {c.barcode}
                                        </div>
                                        <div className="form__group col col-lrg-3">
                                            {`$${c.certificateValue}`} {c.insufficientFunds ? ` - maybe insufficient funds` : ''}
                                        </div>
                                        <div className="form__group col col-lrg-3">
                                            ${c.certificateValue - c.deductionCertificateAmount}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="row">
                            <div className="form__group col col-sml-12 col-lrg-4">
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
                                disableSave={sessionCertificates.length === 0}
                                label='SESSION.CREATE.STEP2.BUTTONS.SAVE'
                            />
                        </div>
                        {/* <BaasicModal modalParams={blankCertificateModal} showClose={false}>
                            <BlankCertificateModal />
                        </BaasicModal> */}
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
    t: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    onPreviousStepClick: PropTypes.func.isRequired,
    barcode: PropTypes.string.isRequired,
    onBarcodeChange: PropTypes.func.isRequired,
    sessionCertificates: PropTypes.any.isRequired,
};

export default defaultTemplate(Step3Template);
