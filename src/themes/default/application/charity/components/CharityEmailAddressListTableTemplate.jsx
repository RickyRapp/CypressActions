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
import { CharityEmailAddressEditForm } from 'application/charity/components';

const CharityEmailAddressListTableTemplate = function ({ charityEmailAddressViewStore, t }) {
    const {
        tableStore,
        routes,
        authorization,
        emailAddressModal,
        openEmailAddressModal
    } = charityEmailAddressViewStore;

    const maxEmailAddressesEntered = tableStore.data && tableStore.data.length >= 2;

    return (
        <div>
            <ListContent>
                <h3 className="u-mar--bottom--tny">
                    {t('EMAIL_ADDRESS.LIST.TITLE')}
                    {!maxEmailAddressesEntered &&
                        <BaasicButton
                            authorization={authorization ? authorization.create : null}
                            className="btn btn--icon"
                            icon='u-icon u-icon--locked u-icon--sml'
                            label='EMAIL_ADDRESS.LIST.BUTTON.CREATE'
                            onlyIcon={true}
                            onClick={() => openEmailAddressModal()}>
                        </BaasicButton>}
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card--form card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                        />
                    </div>
                </Content>
            </ListContent>
            <BaasicModal modalParams={emailAddressModal}>
                <CharityEmailAddressEditForm />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='EMAIL_ADDRESS.LIST.EMPTY_STATE.TITLE' actionLabel='EMAIL_ADDRESS.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityEmailAddressListTableTemplate.propTypes = {
    charityEmailAddressViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onMarkPrimary } = actions;
    if (!isSome(onEdit, onMarkPrimary)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onMarkPrimary) && !item.charityEmailAddresses[0].primary ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml' //TODO replace icon with mark primary icon
                        label='EMAIL_ADDRESS.LIST.BUTTON.MARK_PRIMARY'
                        onlyIcon={true}
                        onClick={() => onMarkPrimary(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='EMAIL_ADDRESS.LIST.BUTTON.EDIT'
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

export default defaultTemplate(CharityEmailAddressListTableTemplate);

