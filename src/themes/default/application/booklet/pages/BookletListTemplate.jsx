import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const BookletListTemplate = function ({ bookletViewStore, t }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = bookletViewStore;

    return (
        <Content emptyRenderer={renderEmpty(routes)} >
            <BaasicButton t={t}
                className="btn btn--base btn--primary" label={'LIST_LAYOUT.CREATE_BUTTON'} onClick={routes.create} />
            <div className="u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} >
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
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='BOOKLET.LIST.EMPTY_STATE.TITLE' actionLabel='BOOKLET.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

BookletListTemplate.propTypes = {
    bookletViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
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
                        label='BOOKLET.LIST.BUTTON.EDIT'
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

export default defaultTemplate(BookletListTemplate);

