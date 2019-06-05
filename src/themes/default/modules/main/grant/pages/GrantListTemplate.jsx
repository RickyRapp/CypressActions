import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { ListLayout } from 'core/layouts';
import { GrantDetails } from 'modules/common/grant/pages';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        routes: { create },
        charitySearchDropdownStore,
        detailsGrantModalParams,
        grantId
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            {tableStore &&
                <React.Fragment>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="f-row">
                                <ListFilterTemplate
                                    queryUtility={queryUtility}
                                    charitySearchDropdownStore={charitySearchDropdownStore} />
                            </div>
                        </TableFilter>
                    </div>
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loaderStore.loading}
                        actionsComponent={renderActions}
                    />
                </React.Fragment>}
            <BaasicModal modalParams={detailsGrantModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantDetails id={grantId} />
                </div>
            </BaasicModal>
        </ListLayout>
    );
}

function renderActions({ item, actions, actionsConfig }) {
    if (!isSome(actions))
        return null;

    let { onEdit, onDetails } = actions;
    if (!isSome(onEdit) && !isSome(onDetails))
        return null;

    const { onEditConfig, onDetailsConfig } = actionsConfig;

    //edit config
    let editTitle = 'edit' // default
    if (isSome(onEditConfig)) {
        if (onEditConfig.title) {
            editTitle = onEditConfig.title;
        }

        if (onEditConfig.statuses) {
            if (!_.includes(onEditConfig.statuses, item.donationStatusId)) {
                onEdit = null
            }
        }
    }

    //details config
    let detailsTitle = 'details' // default
    if (isSome(onDetailsConfig)) {
        if (onDetailsConfig.title) {
            editTitle = onEditConfig.title;
        }

        if (onDetailsConfig.statuses) {
            if (!_.includes(onDetailsConfig.statuses, item.donationStatusId)) {
                onDetails = null
            }
        }
    }

    return (
        <td className="table__body--data right">
            {isSome(onEdit) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onEdit(item)}
                >
                    {editTitle}
                </i>
            ) : null}
            {isSome(onDetails) ? (
                <i
                    className="material-icons align--v--middle"
                    onClick={() => onDetails(item)}
                >
                    {detailsTitle}
                </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(GrantListTemplate);
