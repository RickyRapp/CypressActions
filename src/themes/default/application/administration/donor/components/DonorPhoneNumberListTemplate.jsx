import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicModal,
    EmptyState,
    ListContent,
    SimpleBaasicTable
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { DonorPhoneNumberEditForm } from 'application/administration/donor/components';

const DonorPhoneNumberListTableTemplate = function ({ donorPhoneNumberViewStore, t }) {
    const {
        tableStore,
        routes,
        phoneNumberModal,
        openPhoneNumberModal
    } = donorPhoneNumberViewStore;

    const maxPhoneNumbersEntered = tableStore.data && tableStore.data.length >= 2;

    return (
        <div>
            <ListContent>
                <h3 className="type--lrg type--wgt--medium u-mar--bottom--tny">
                    {t('PHONE_NUMBER.LIST.TITLE')}
                    {maxPhoneNumbersEntered ?
                        <span className="u-icon u-icon--add u-icon--xxmed u-mar--left--tny" />
                        :
                        <BaasicButton
                            className="btn btn--icon"
                            onlyIconClassName="u-mar--right--tny"
                            icon='u-icon u-icon--add u-icon--xxmed'
                            label='PHONE_NUMBER.LIST.BUTTON.CREATE'
                            onlyIcon={true}
                            onClick={() => openPhoneNumberModal()}>
                        </BaasicButton>}
                </h3>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <SimpleBaasicTable
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </Content>
            </ListContent>
            <BaasicModal modalParams={phoneNumberModal}>
                <DonorPhoneNumberEditForm />
            </BaasicModal>
        </div>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='PHONE_NUMBER.LIST.EMPTY_STATE.TITLE' actionLabel='PHONE_NUMBER.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorPhoneNumberListTableTemplate.propTypes = {
    donorPhoneNumberViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onMarkPrimary, onDelete } = actions;
    if (!isSome(onEdit) && !isSome(onMarkPrimary) && !isSome(onDelete)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onMarkPrimary) && !item.isPrimary ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--approve u-icon--sml' //TODO replace icon with mark primary icon
                        label='PHONE_NUMBER.LIST.BUTTON.MARK_PRIMARY'
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
                        label='PHONE_NUMBER.LIST.BUTTON.EDIT'
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
                        label='PHONE_NUMBER.LIST.BUTTON.DELETE'
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

export default defaultTemplate(DonorPhoneNumberListTableTemplate);

