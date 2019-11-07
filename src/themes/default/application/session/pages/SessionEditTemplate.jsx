import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BasicInput,
    Date,
    BaasicModal,
    BaasicFormControls,
    SimpleBaasicTable,
    ApplicationEmptyState,
    BaasicButton
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { EditFormLayout, PageFooter } from 'core/layouts';
import { RemoveSessionCertificateModal, EditBlankCertificateModal } from 'themes/application/session/components';
import _ from 'lodash';

const SessionEditTemplate = function ({ sessionEditViewStore, t }) {
    const {
        contentLoading,
        form,
        charityDropdownStore,
        item,
        tableStore,
        removeSessionCertificateModal,
        editBlankSessionCertificateModal,
        maxAmountError,
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
                        <BaasicFieldDropdown field={form.$('charity')} store={charityDropdownStore} />
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
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                />
                <div className="row u-mar--top--lrg">
                    <div className="form__group col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT')} ${item && (_.sumBy(item.sessionCertificates, (sessionCert) => {
                            return (sessionCert.certificate.booklet.denominationType.abrv === 'blank' ? sessionCert.blankCertificateValue : sessionCert.certificate.booklet.denominationType.value) * 100
                        })) / 100}
                    </div>
                    <div className="form__group col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_DEDUCTION')} ${item && item.amount}
                    </div>
                </div>
            </div>

            <BaasicModal modalParams={removeSessionCertificateModal}>
                <RemoveSessionCertificateModal
                    makeRefundFee={makeRefundFee}
                    makeRefund={makeRefund}
                />
            </BaasicModal>

            <BaasicModal modalParams={editBlankSessionCertificateModal}>
                <EditBlankCertificateModal
                    maxAmountError={maxAmountError}
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

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onRemove, onEdit } = actions;
    if (!isSome(onRemove) && !isSome(onEdit)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='SESSION.EDIT.LIST.EDIT_SESSION_CERTIFICATE'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onRemove) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--unapproved u-icon--sml'
                        label='SESSION.EDIT.LIST.REMOVE_SESSION_CERTIFICATE'
                        onlyIcon={true}
                        onClick={() => onRemove(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(SessionEditTemplate);
