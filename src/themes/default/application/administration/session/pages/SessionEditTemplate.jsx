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
    BaasicButton,
    NumberFormatInputField
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { EditFormLayout, PageFooter } from 'core/layouts';
import _ from 'lodash';
import { EditBlankCertificate, RemoveSessionCertificate } from 'application/administration/session/components';
import { CharityAdvancedSearch } from 'application/administration/charity/components';

const SessionEditTemplate = function ({ sessionEditViewStore, t }) {
    const {
        contentLoading,
        form,
        charityDropdownStore,
        item,
        tableStore,
        removeSessionCertificateModal,
        editBlankSessionCertificateModal,
        onCharitySelected,
        advancedSearchModal,
        openAdvancedSearchModal
    } = sessionEditViewStore;

    return (
        <EditFormLayout
            store={sessionEditViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={contentLoading}
            layoutFooterVisible={false}
        >
            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">General Data</h3>
                <div className="row">
                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                        <BaasicFieldDropdown field={form.$('charityId')} store={charityDropdownStore} />
                        {!form.$('charityId').disabled && <BaasicButton
                            className="btn btn--icon"
                            icon={`u-icon u-icon--preview u-icon--base`} //TODO: advanced search icon
                            label={t('GRANT.CREATE.ADVANCED_CHARITY_FILTER_BUTTON')}
                            onlyIcon={true}
                            onClick={openAdvancedSearchModal}
                        />}
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--med">
                        <BasicInput field={form.$('fullName')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                        <NumberFormatInputField field={form.$('phoneNumber')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                        <BasicInput field={form.$('email')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Confirmation Number</label>
                            {item &&
                                <span className={"input input--lrg input--text input--disabled"}>{item.confirmationNumber}</span>}
                        </div>
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                        <div>
                            <label className="form__group__label">Created on</label>
                            {item &&
                                <span className={"input input--lrg input--text input--disabled"}><Date format="full" value={item.dateCreated} /></span>}
                        </div>
                    </div>
                </div>

                {renderEditLayoutFooterContent({ form })}
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">Certificates</h3>
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                />
                <div className="row u-mar--top--lrg">
                    <div className="form__group col col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT')} ${item && (_.sumBy(item.grants, (grant) => { return grant.certificate.denominationType.abrv === 'blank' ? grant.certificate.openCertificateAmount : grant.certificate.denominationType.value }))}
                    </div>
                    <div className="form__group col col-lrg-12">
                        {t('SESSION.EDIT.TOTAL_AMOUNT_AFTER_DEDUCTION')} ${item && item.amount}
                    </div>
                </div>
            </div>

            <BaasicModal modalParams={removeSessionCertificateModal}>
                <RemoveSessionCertificate />
            </BaasicModal>

            <BaasicModal modalParams={editBlankSessionCertificateModal}>
                <EditBlankCertificate />
            </BaasicModal>

            <BaasicModal modalParams={advancedSearchModal}>
                <CharityAdvancedSearch onSelected={onCharitySelected} />
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

function renderActions({ item, actions, actionsRender, t }) {
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
        <td>
            <div className="type--right">
                {item.isApproved ? (
                    <span className={'u-icon u-icon--approve u-icon--base'} title={t('SESSION.EDIT.LIST.BLANK_SESSION_APPROVED')} />
                ) : null}
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
						onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--edit u-icon--base'
                        label='SESSION.EDIT.LIST.BUTTON.EDIT_SESSION_CERTIFICATE'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onRemove) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--decline u-icon--base'
                        label='SESSION.EDIT.LIST.BUTTON.REMOVE_SESSION_CERTIFICATE'
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
    authorization: PropTypes.any,
    t: PropTypes.func
};

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(SessionEditTemplate);
