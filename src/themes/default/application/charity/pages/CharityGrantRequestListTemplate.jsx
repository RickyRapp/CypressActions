import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicModal
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageNavigation } from 'core/layouts';
import { CharityGrantRequestCreate } from 'application/charity/pages';

const CharityGrantRequestListTemplate = function ({ charityGrantRequestViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        createModal,
        id,
        onAfterAction
    } = charityGrantRequestViewStore;

    return (
        <ApplicationListLayout store={charityGrantRequestViewStore} authorization={authorization}>
            <PageNavigation>
                <BaasicButton
                    authorization={authorization.update}
                    className="btn btn--base btn--primary"
                    label={'LIST_LAYOUT.CREATE_BUTTON'}
                    onClick={routes.create} />
            </PageNavigation>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                    </TableFilter>
                </div>
                <div className="card--form card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
            <BaasicModal modalParams={createModal}>
                <CharityGrantRequestCreate
                    onAfterAction={onAfterAction}
                    charityId={id} />
            </BaasicModal>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='CHARITY.LIST.EMPTY_STATE.TITLE' actionLabel='CHARITY.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityGrantRequestListTemplate.propTypes = {
    charityGrantRequestViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender, authorization }) {
    if (!isSome(actions)) return null;

    const { onCancel } = actions;
    if (!isSome(onCancel)) return null;

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = actionsRender.onCancelRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--close u-icon--sml'
                        label='CHARITY.LIST.BUTTON.CANCEL'
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

export default defaultTemplate(CharityGrantRequestListTemplate);

