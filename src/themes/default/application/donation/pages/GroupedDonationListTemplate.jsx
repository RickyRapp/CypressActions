import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const GroupedDonationListTemplate = function ({ groupedDonationViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        searchCharityDropdownStore
    } = groupedDonationViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={groupedDonationViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card--form card--secondary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown store={searchCharityDropdownStore} />
                            </div>
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
            </ApplicationListLayout>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='DONATION.LIST.EMPTY_STATE.TITLE' actionLabel='DONATION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

GroupedDonationListTemplate.propTypes = {
    groupedDonationViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONATION.LIST.BUTTON.EDIT'
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
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(GroupedDonationListTemplate);

