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
import { DonorAddressEditForm } from 'application/donor/components';

const DonorAddressListTemplate = function ({ donorAddressViewStore, t }) {
    const {
        tableStore,
        routes,
        addressModal,
        openAddressModal
    } = donorAddressViewStore;

    const maxAddressesEntered = tableStore.data && tableStore.data.length >= 2;

    return (
        <div>
            <ListContent>
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--tny">
                    {t('ADDRESS.LIST.TITLE')}
                    {maxAddressesEntered ?
                        <BaasicButton
                            className="btn btn--icon"
                            onlyIconClassName="u-mar--right--tny"
                            icon='u-icon u-icon--add u-icon--xxmed'
                            label='PHONE_NUMBER.LIST.BUTTON.CREATE'
                            onlyIcon={true}
                            onClick={() => openAddressModal()}>
                        </BaasicButton>
                        :
                        <BaasicButton
                            className="btn btn--icon"
                            onlyIconClassName="u-mar--right--tny"
                            icon='u-icon u-icon--add u-icon--xxmed'
                            label='PHONE_NUMBER.LIST.BUTTON.CREATE'
                            onlyIcon={true}
                            onClick={() => openAddressModal()}>
                        </BaasicButton>}
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <SimpleBaasicTable
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={addressModal}>
                <DonorAddressEditForm />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='ADDRESS.LIST.EMPTY_STATE.TITLE' actionLabel='ADDRESS.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorAddressListTemplate.propTypes = {
    donorAddressViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onMarkPrimary, onDelete } = actions;
    if (!isSome(onEdit, onMarkPrimary, onDelete)) return null;

    return (
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onMarkPrimary) && !item.isPrimary ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--approve u-icon--sml' //TODO replace icon with mark primary icon
                        label='ADDRESS.LIST.BUTTON.MARK_PRIMARY'
                        onlyIcon={true}
                        onClick={() => onMarkPrimary(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='ADDRESS.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onDelete) && !item.isPrimary ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--delete u-icon--sml'
                        label='ADDRESS.LIST.BUTTON.DELETE'
                        onlyIcon={true}
                        onClick={() => onDelete(item)}>
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

export default defaultTemplate(DonorAddressListTemplate);

