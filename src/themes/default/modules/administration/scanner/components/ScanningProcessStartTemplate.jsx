import React from 'react';
import { defaultTemplate } from 'core/utils';
import { EditFormContent, BaasicFormControls, BaasicButton } from 'core/components';
import _ from 'lodash';

function ScanningProcessStart({ scanningProcessStartViewStore, t }) {
    const {
        form,
        certificates,
        addCertificate,
        barcode,
        onContinueLaterClick
    } = scanningProcessStartViewStore;

    return (
        <EditFormContent form={form}>
            <div className="f-row">
                {_.map(certificates, function (certificate) {
                    return (
                        <div key={certificate.certificateId} className="form__group f-col f-col-lrg-12">
                            {`${certificate.bookletCode}-${certificate.certificateCode} => ${certificate.certificateValue} => ${certificate.feeCertificateAmount} => ${certificate.deductionCertificateAmount}`}
                        </div>
                    )
                })}
            </div>
            <div>
                <input
                    className={barcode ? "input input--med input--text input--disabled" : "input input--med input--text"}
                    disabled={barcode !== ''}
                    value={barcode}
                    onChange={addCertificate}
                    autoFocus
                />
            </div>
            <div>
                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                <BaasicButton
                    type="button"
                    className="btn btn--sml btn--ghost spc--sml display--ib"
                    onClick={onContinueLaterClick}
                    label={t("CONTINUELATER")}
                />
            </div>
        </EditFormContent>
    );
}

export default defaultTemplate(ScanningProcessStart);
