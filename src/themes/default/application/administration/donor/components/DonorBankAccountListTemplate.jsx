import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicModal,
    SimpleBaasicTable,
    EmptyState,
    ListContent
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { DonorBankAccountEdit } from 'application/administration/donor/components';

const DonorBankAccountListTableTemplate = function ({ donorBankAccountViewStore, t }) {
    const {
        tableStore,
        routes,
        bankAccountModal,
        openBankAccountModal,
        bankAccountNumberModal
    } = donorBankAccountViewStore;

    return (
        <div>
            <ListContent>
                <h3 className=" u-mar--bottom--tny">
                    {t('BANK_ACCOUNT.LIST.TITLE')}
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--left--tny"
                        icon='u-icon u-icon--add u-icon--base'
                        label='BANK_ACCOUNT.LIST.BUTTON.CREATE'
                        onlyIcon={true}
                        onClick={() => openBankAccountModal()}>
                    </BaasicButton>
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <SimpleBaasicTable
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={bankAccountModal}>
                <DonorBankAccountEdit />
            </BaasicModal>
            <BaasicModal modalParams={bankAccountNumberModal}>
                <div>{bankAccountNumberModal && bankAccountNumberModal.data && bankAccountNumberModal.data.accountNumber}</div>
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='BANK_ACCOUNT.LIST.EMPTY_STATE.TITLE' actionLabel='BANK_ACCOUNT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorBankAccountListTableTemplate.propTypes = {
    donorBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onDelete, onGetAccountNumber } = actions;
    if (!isSome(onEdit) && !isSome(onDelete) && !isSome(onGetAccountNumber)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--edit u-icon--base'
                        label='BANK_ACCOUNT.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onDelete) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--delete u-icon--base'
                        label='BANK_ACCOUNT.LIST.BUTTON.DELETE'
                        onlyIcon={true}
                        onClick={() => onDelete(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onGetAccountNumber) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--preview u-icon--base'
                        label='BANK_ACCOUNT.LIST.BUTTON.GET_ACCOUNT_NUMBER'
                        onlyIcon={true}
                        onClick={() => onGetAccountNumber(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(DonorBankAccountListTableTemplate);

