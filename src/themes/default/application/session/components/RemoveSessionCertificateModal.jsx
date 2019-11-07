import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicInput,
    BasicCheckbox,
    BaasicDropdown
} from 'core/components'

const RemoveSessionCertificateModal = function ({ modalParams, t, makeRefund, makeRefundFee }) {
    const {
        sessionCertificate,
        certificateStatusDropdownStore,
        onRemove,
        onMakeRefundChange,
        onMakeRefundFeeChange
    } = modalParams.data;

    const bookletOrder = sessionCertificate.certificate.booklet.bookletOrderItemBooklets[0].bookletOrderItem.bookletOrder;

    const denominationType = sessionCertificate.certificate.booklet.denominationType;

    let total = 0;
    let totalFee = 0;
    if (makeRefund) {
        total = denominationType.value;
        if (makeRefundFee) {
            totalFee = total * bookletOrder.basicFeeCharge;
        }
    }

    certificateStatusDropdownStore.setValue(sessionCertificate.certificate.certificateStatus)

    return (
        <section className='w--400--px'>
            <h3 className="u-mar--bottom--med">{t('SESSION.EDIT.LIST.REMOVE_SESSION_CERTIFICATE')}</h3>
            <div className="row">
                {bookletOrder.accountType.abrv === 'premium' &&
                    <React.Fragment>
                        <div className="form__group col col-lrg-12">
                            <h5>{t('SESSION.EDIT.LIST.REMOVE_PREMIUM_SESSION_CERTIFICATE')}</h5>
                        </div>
                        <div className="form__group col col-lrg-12">
                            {t('SESSION.EDIT.LIST.PREMIUM_REFUND_MESSAGE')}
                        </div>
                        <div className="form__group col col-lrg-12">
                            <ul>
                                <li>{t('SESSION.EDIT.LIST.TOTAL_REFUND_CERTIFICATE')} ${denominationType.abrv === 'blank' ? sessionCertificate.blankCertificateValue : denominationType.value}</li>
                                <li>{t('SESSION.EDIT.LIST.TOTAL_REFUND_FEE')} ${(denominationType.abrv === 'blank' ? sessionCertificate.blankCertificateValue : denominationType.value) * sessionCertificate.premiumFeeCharge}</li>
                            </ul>
                        </div>
                    </React.Fragment>}
                {bookletOrder.accountType.abrv === 'basic' &&
                    <React.Fragment>
                        <div className="form__group col col-lrg-12">
                            <h5>{t('SESSION.EDIT.LIST.REMOVE_BASIC_SESSION_CERTIFICATE')}</h5>
                        </div>
                        <div className="form__group col col-lrg-3">
                            <BasicCheckbox
                                id='SESSION.EDIT.LIST.MAKE_REFUND'
                                checked={makeRefund}
                                onChange={(event) => onMakeRefundChange(event.target.checked)}
                                label='SESSION.EDIT.LIST.MAKE_REFUND'
                            />
                        </div>
                        {makeRefund &&
                            <React.Fragment>
                                <div className="form__group col col-lrg-4">
                                    <BasicCheckbox
                                        id='SESSION.EDIT.LIST.MAKE_REFUND_FEE'
                                        checked={makeRefundFee}
                                        onChange={(event) => onMakeRefundFeeChange(event.target.checked)}
                                        label='SESSION.EDIT.LIST.MAKE_REFUND_FEE'
                                    />
                                </div>
                                <div className="form__group col col-lrg-5">
                                    {t('SESSION.EDIT.LIST.TOTAL_REFUND')} ${total + totalFee}
                                </div>
                            </React.Fragment>}
                    </React.Fragment>}
            </div>
            <h5 className="u-mar--top--med">{t('SESSION.EDIT.LIST.CERTIFICATE_DETAILS')}</h5>
            <div className="row">
                <div className="form__group col col-lrg-12">
                    <div className='form__group__label'>{t('SESSION.EDIT.LIST.FIELDS.CERTIFICATE_STATUS_LABEL')}<span>*</span></div>
                    <BaasicDropdown
                        store={certificateStatusDropdownStore}
                        onChange={(event) => {
                            certificateStatusDropdownStore.setValue(event.target.value);
                            sessionCertificate.certificate.certificateStatusId = event.target.value.id;
                        }} />
                </div>
                <div className="form__group col col-lrg-12">
                    <BaasicInput
                        value={sessionCertificate.certificate.note}
                        onChange={(event) => sessionCertificate.certificate.note = event.target.value}
                        label='SESSION.EDIT.LIST.FIELDS.CERTIFICATE_NOTE_LABEL'
                        placeholder='SESSION.EDIT.LIST.FIELDS.CERTIFICATE_NOTE_PLACEHOLDER'>
                    </BaasicInput>
                </div>
                <div className="form__group col col-lrg-12">
                    <BasicCheckbox
                        id={sessionCertificate.id}
                        checked={sessionCertificate.certificate.isActive}
                        onChange={(event) => sessionCertificate.certificate.isActive = event.target.checked}
                        label='SESSION.EDIT.LIST.FIELDS.IS_ACTIVE_LABEL'
                    />
                </div>
                <div className="form__group col col-lrg-12 u-mar--top--med">
                    <BaasicButton
                        className="btn btn--base btn--primary"
                        label='SESSION.EDIT.LIST.BUTTON.REMOVE_SESSION_CERTIFICATE'
                        onClick={() => onRemove(sessionCertificate)}>
                    </BaasicButton>
                </div>
            </div>
        </section>
    )
}

RemoveSessionCertificateModal.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    makeRefund: PropTypes.bool.isRequired,
    makeRefundFee: PropTypes.bool.isRequired
};

export default defaultTemplate(RemoveSessionCertificateModal);
