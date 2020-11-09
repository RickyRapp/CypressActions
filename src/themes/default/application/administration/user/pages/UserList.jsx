import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const UserListTemplate = function ({ userViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = userViewStore;

    return (
        <ApplicationListLayout store={userViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} />
                </div>
                <div className="card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='USER.LIST.EMPTY_STATE.TITLE' actionLabel='USER.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

UserListTemplate.propTypes = {
    userViewStore: PropTypes.object.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit, onLock, onUnlock, onApprove, onDisapprove } = actions;
    if (!isSome(onEdit) && !isSome(onLock) && !isSome(onUnlock) && !isSome(onApprove) && !isSome(onDisapprove)) return null;

    return (
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='Edit'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {(item.isApproved) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--unapproved u-icon--sml'
                        label='Disapprove'
                        onlyIcon={true}
                        onClick={() => onDisapprove(item)}>
                    </BaasicButton>
                ) : (
                        <BaasicButton
                            authorization={authorization ? authorization.update : null}
                            className="btn btn--icon"
                            onlyIconClassName="u-mar--right--tny"
                            icon='u-icon u-icon--approve u-icon--sml'
                            label='Approve'
                            onlyIcon={true}
                            onClick={() => onApprove(item)}>
                        </BaasicButton>
                    )}
                {(item.isLockedOut) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        onlyIconClassName="u-mar--right--tny"
                        icon='u-icon u-icon--unlocked u-icon--sml'
                        label='Unlock'
                        onlyIcon={true}
                        onClick={() => onUnlock(item)}>
                    </BaasicButton>
                ) : (
                        <BaasicButton
                            authorization={authorization ? authorization.update : null}
                            className="btn btn--icon"
                            onlyIconClassName="u-mar--right--tny"
                            icon='u-icon u-icon--locked u-icon--sml'
                            label='Lock'
                            onlyIcon={true}
                            onClick={() => onLock(item)}>
                        </BaasicButton>
                    )}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(UserListTemplate);

