import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, BaasicInput, BaasicDropdown } from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const BookletListTemplate = function ({ bookletViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        denominationTypeDropdownStore
    } = bookletViewStore;

    return (
        <ApplicationListLayout store={bookletViewStore} authorization={authorization}>
            <Content>
                <div className="u-mar--bottom--sml">
                    <div className="card--tertiary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} >
                            <div className="col col-sml-12 col-lrg-6 u-mar--bottom--sml">
                                <div className="row">
                                    <div className="col col-sml-12 u-mar--bottom--sml">
                                        <BaasicInput
                                            id='codes'
                                            className='input input--lrg'
                                            value={queryUtility.filter.codes || ""}
                                            onChange={(event) => queryUtility.filter.codes = event.target.value}
                                            placeholder='BOOKLET.LIST.FILTER.CODES_PLACEHOLDER'
                                        />
                                    </div>
                                    <div className="col col-sml-12 u-mar--bottom--sml">
                                        <BaasicDropdown
                                            store={denominationTypeDropdownStore}
                                            placeholder='BOOKLET.LIST.FILTER.DENOMINATION_PLACEHOLDER'
                                        />
                                    </div>
                                </div>
                            </div>
                        </TableFilter>
                    </div>
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

BookletListTemplate.propTypes = {
    bookletViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    return (
        <td>
            <div className="type--right">
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

