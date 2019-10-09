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
import { DonorAccountAddressEditForm } from 'application/donor-account/components';

const DonorAccountAddressListTableTemplate = function ({ donorAccountAddressViewStore, t }) {
    const {
        tableStore,
        routes,
        authorization,
        addressModal,
        openAddressModal
    } = donorAccountAddressViewStore;

    const maxAddressesEntered = tableStore.data && tableStore.data.length >= 2;

    return (
        <div>
            <ListContent>
                <h3 className="u-mar--bottom--tny">
                    {t('ADDRESS.LIST.TITLE')}
                    {!maxAddressesEntered &&
                        <BaasicButton
                            authorization={authorization ? authorization.create : null}
                            className="btn btn--icon"
                            icon='u-icon u-icon--locked u-icon--sml'
                            label='ADDRESS.LIST.BUTTON.CREATE'
                            onlyIcon={true}
                            onClick={() => openAddressModal()}>
                        </BaasicButton>}
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={addressModal}>
                <DonorAccountAddressEditForm />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='ADDRESS.LIST.EMPTY_STATE.TITLE' actionLabel='ADDRESS.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorAccountAddressListTableTemplate.propTypes = {
    donorAccountAddressViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onMarkPrimary } = actions;
    if (!isSome(onEdit, onMarkPrimary)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onMarkPrimary) && !item.donorAccountAddresses[0].primary ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml' //TODO replace icon with mark primary icon
                        label='ADDRESS.LIST.BUTTON.MARK_PRIMARY'
                        onlyIcon={true}
                        onClick={() => onMarkPrimary(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='ADDRESS.LIST.BUTTON.EDIT'
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

export default defaultTemplate(DonorAccountAddressListTableTemplate);

