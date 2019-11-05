import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BasicInput,
    Date,
    BaasicModal,
    BaasicFormControls,
    BaasicButton,
    ApplicationEmptyState
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { EditFormLayout, Content, PageFooter } from 'core/layouts';
import { RemoveSessionCertificateDialog } from 'themes/application/session/components';
import _ from 'lodash';

const SessionEditTemplate = function ({ sessionEditViewStore, t }) {
    const {
        contentLoading,
        form,
        charityDropdownStore,
        item,
        openRemoveSessionCertificate,
        removeSessionCertificateModal,
        makeRefund,
        makeRefundFee
    } = sessionEditViewStore;

    return (
        <EditFormLayout
            store={sessionEditViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={contentLoading}
            layoutFooterVisible={false}
        >
            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">General Data</h3>
                <div className="row u-mar--bottom--lrg">
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Organization Name/Email/Tax ID</label>
                            {item &&
                                <span className={"input input--med input--text input--disabled"}>{item.charityName} / {item.charityEmail || '-'} / {item.taxId || '-'}</span>}
                        </div>
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <BasicInput field={form.$('fullName')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <BasicInput field={form.$('phoneNumber')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <BasicInput field={form.$('email')} />
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Confirmation Number</label>
                            {item &&
                                <span className={"input input--med input--text input--disabled"}>{item.confirmationNumber}</span>}
                        </div>
                    </div>
                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Created on</label>
                            {item &&
                                <span className={"input input--med input--text input--disabled"}><Date format="full" value={item.dateCreated} /></span>}
                        </div>
                    </div>
                </div>

                {renderEditLayoutFooterContent({ form })}
            </div>

            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">Certificates</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Barcode</th>
                            <th>Value</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item && item.sessionCertificates.map((sessionCertificate) => {
                            return (
                                <tr key={sessionCertificate.id}>
                                    <td>
                                        {sessionCertificate.certificate.booklet.code}-{sessionCertificate.certificate.code}
                                    </td>
                                    <td>
                                        {sessionCertificate.certificate.barcode}
                                    </td>
                                    <td>
                                        ${sessionCertificate.certificate.booklet.denominationType.value}
                                    </td>
                                    <td>
                                        ${sessionCertificate.deductionAmount}
                                    </td>
                                    <td>
                                        <BaasicButton
                                            className="btn btn--icon"
                                            icon='u-icon u-icon--unapproved u-icon--sml'
                                            label='SESSION.EDIT.BUTTON.REMOVE_SESSION_CERTIFICATE'
                                            onlyIcon={true}
                                            onClick={() => openRemoveSessionCertificate(sessionCertificate)}>
                                        </BaasicButton>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>

            <BaasicModal modalParams={removeSessionCertificateModal}>
                <RemoveSessionCertificateDialog
                    makeRefundFee={makeRefundFee}
                    makeRefund={makeRefund}

                />
            </BaasicModal>
        </EditFormLayout >
    )
};

SessionEditTemplate.propTypes = {
    sessionEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEditLayoutFooterContent({ form }) {
    return <PageFooter>
        <div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
        </div>
    </PageFooter>

}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(SessionEditTemplate);
