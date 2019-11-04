import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    BaasicModal,
    EmptyState,
    BaasicDropdown
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const SessionListTemplate = function ({ sessionViewStore, t }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectScannerModal,
        scannerDropdownStore,
        setScannerConnection
    } = sessionViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={sessionViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} >
                        </TableFilter>
                    </div>
                    <div className="card--form card--primary card--med">
                        <BaasicTable
                            authorization={authorization}
                            tableStore={tableStore}
                        />
                    </div>
                </Content>
                <BaasicModal modalParams={selectScannerModal}>
                    <section className='w--400--px'>
                        <h3 className="u-mar--bottom--med">{t('SESSION.LIST.SELECT_SCANNER')}</h3>
                        <div className="row">
                            <div className="form__group col col-lrg-12">
                                <BaasicDropdown store={scannerDropdownStore} />
                                <BaasicButton
                                    className="btn btn--primary"
                                    label='SESSION.LIST.BUTTON.SKIP_TO_CREATE_PAGE'
                                    onClick={() => setScannerConnection()}>
                                </BaasicButton>
                            </div>
                        </div>
                    </section>
                </BaasicModal>
            </ApplicationListLayout>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

SessionListTemplate.propTypes = {
    sessionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onCancel } = actions;
    if (!isSome(onEdit) && !isSome(onCancel)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = actionsRender.onCancelRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='SESSION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--close u-icon--sml'
                        label='SESSION.LIST.BUTTON.CANCEL'
                        onlyIcon={true}
                        onClick={() => onCancel(item)}>
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

export default defaultTemplate(SessionListTemplate);

