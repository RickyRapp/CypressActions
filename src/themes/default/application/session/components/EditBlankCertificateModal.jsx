import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    NumericInput,
    BaasicButton
} from 'core/components'
import { renderIf } from 'core/utils';

const EditBlankCertificateModal = function ({ modalParams, t, maxAmountError }) {
    const {
        sessionCertificate,
        onSubmit
    } = modalParams.data;

    return (
        <section className='w--400--px'>
            <h3 className="u-mar--bottom--med">{t('SESSION.EDIT.BLANK_CERTIFICATE_ENTER_AMOUNT')}</h3>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <div>
                        <label className="form__group__label">{t('SESSION.EDIT.BLANK_CERTIFICATE_CODE')}</label>
                        <span className={"input input--med input--text input--disabled"}>{sessionCertificate.certificate.booklet.code}-{sessionCertificate.certificate.code}</span>
                    </div>
                </div>
                <div className="form__group col col-lrg-12">
                    <NumericInput
                        value={sessionCertificate.blankCertificateValue}
                        onChange={(event) => sessionCertificate.blankCertificateValue = event.target.value}
                        label='SESSION.EDIT.CERTIFICATE_VALUE_LABEL'
                        placeholder='SESSION.EDIT.CERTIFICATE_VALUE_PLACEHOLDER'
                        showLabel={true}
                        required={true}>
                    </NumericInput>
                    {renderIf(maxAmountError)(<div
                        className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{t('SESSION.EDIT.MAX_BLANK_CERTIFICATE_AMOUNT_ERROR')}</div>)}
                </div>
                <div className="form__group col col-lrg-12 u-mar--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        label='SESSION.EDIT.SET_BLANK_CERTIFICATE_VALUE'
                        onClick={() => onSubmit({
                            id: sessionCertificate.id,
                            certificateValue: sessionCertificate.blankCertificateValue
                        })}>
                    </BaasicButton>
                </div>
            </div>
        </section>
    )
}

EditBlankCertificateModal.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    maxAmountError: PropTypes.bool.isRequired,
};

export default defaultTemplate(EditBlankCertificateModal);
