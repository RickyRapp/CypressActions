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
import { CharityAddressEditForm } from 'application/administration/charity/components';

const CharityAddressListTableTemplate = function ({ charityAddressViewStore, t }) {
    const {
        tableStore,
        routes,
        authorization,
        addressModal,
        openAddressModal
    } = charityAddressViewStore;

    const maxAddressesEntered = tableStore.data && tableStore.data.length >= 2;

    return (
        <div>
            <ListContent>
                <h3 className="u-mar--bottom--sml">
                    {t('CHARITY.EDIT.FIELDS.ADDRESS_TITLE')}
                    {maxAddressesEntered ?
                        <span className="u-icon u-icon--lock u-icon--base u-mar--left--tny" />
                        :
                        <BaasicButton
                            authorization={authorization ? authorization.create : null}
                            className="btn btn--icon"
                            icon='u-icon u-icon--unlock u-icon--base u-mar--left--tny'
                            label='ADDRESS.LIST.BUTTON.CREATE'
                            onlyIcon={true}
                            onClick={() => openAddressModal()}>
                        </BaasicButton>}
                </h3>
                <Content emptyRenderer={renderEmpty(routes)}>
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={addressModal}>
                <CharityAddressEditForm />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='ADDRESS.LIST.EMPTY_STATE.TITLE' actionLabel='ADDRESS.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityAddressListTableTemplate.propTypes = {
    charityAddressViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onMarkPrimary } = actions;
    if (!isSome(onEdit, onMarkPrimary)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onMarkPrimary) && !item.isPrimary ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--base' //TODO replace icon with mark primary icon
                        label='ADDRESS.LIST.BUTTON.MARK_PRIMARY'
                        onlyIcon={true}
                        onClick={() => onMarkPrimary(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--base'
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

export default defaultTemplate(CharityAddressListTableTemplate);

