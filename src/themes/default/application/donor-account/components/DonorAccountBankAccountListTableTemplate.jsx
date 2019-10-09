import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicModal,
    BaasicTable,
    EmptyState,
    ListContent
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/components';

const DonorAccountBankAccountListTableTemplate = function ({ donorAccountBankAccountViewStore, t }) {
    const {
        tableStore,
        routes,
        authorization,
        bankAccountModal,
        openBankAccountModal,
        useDonorContactInformations
    } = donorAccountBankAccountViewStore;

    return (
        <div>
            <ListContent>
                <h3 className="u-mar--bottom--tny">
                    {t('BANK_ACCOUNT.LIST.TITLE')}
                    <BaasicButton
                        authorization={authorization ? authorization.create : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--locked u-icon--sml'
                        label='BANK_ACCOUNT.LIST.BUTTON.CREATE'
                        onlyIcon={true}
                        onClick={() => openBankAccountModal()}>
                    </BaasicButton>
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={bankAccountModal}>
                <DonorAccountBankAccountEditForm useDonorContactInformations={useDonorContactInformations} />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='BANK_ACCOUNT.LIST.EMPTY_STATE.TITLE' actionLabel='BANK_ACCOUNT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorAccountBankAccountListTableTemplate.propTypes = {
    donorAccountBankAccountViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='BANK_ACCOUNT.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
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

export default defaultTemplate(DonorAccountBankAccountListTableTemplate);

