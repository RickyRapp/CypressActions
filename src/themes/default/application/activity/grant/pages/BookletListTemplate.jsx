import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, EmptyState, BaasicInput, BaasicDropdown } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const BookletListTemplate = function ({ bookletViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        denominationTypeDropdownStore
    } = bookletViewStore;

    return (
        <Content >
            <div className="u-mar--bottom--sml">
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} >
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter.codes || ""}
                                onChange={(event) => queryUtility.filter.codes = event.target.value}
                                placeholder='BOOKLET.LIST.FILTER.CODES_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={denominationTypeDropdownStore}
                                placeholder='BOOKLET.LIST.FILTER.DENOMINATION_PLACEHOLDER'
                            />
                        </div>
                    </TableFilter>
                </div>
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

