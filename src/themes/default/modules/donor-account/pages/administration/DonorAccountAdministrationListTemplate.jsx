import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, InputFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';

function DonorAccountAdministrationListTemplate({ donorAccountAdministrationListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create }
    } = donorAccountAdministrationListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="pos--rel display--ib  spc--right--sml">
                        <InputFilter
                            queryUtility={queryUtility}
                            name="firstName"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="pos--rel display--ib  spc--right--sml">
                        <InputFilter
                            queryUtility={queryUtility}
                            name="lastName"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="pos--rel display--ib  spc--right--sml">
                        <InputFilter
                            queryUtility={queryUtility}
                            name="emails"
                            placeholder="Emails (separate by ,)"
                        />
                    </div>
                    {/* TODO: three state toggle switch
                    <div className="pos--rel display--ib  spc--right--sml">
                        <DropdownFilter
                            queryUtility={queryUtility}
                            name="lastName"
                            placeholder="Last Name"
                        />
                    </div> */}
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
                actionsComponent={renderActions}
            />
        </ListLayout>
    );
}

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit))
        return null;

    return (
        <td className="table__body--data right">
            {isSome(onEdit) ? (
                <i className="material-icons align--v--middle" onClick={() => onEdit(item)} >
                    edit
                </i>
            ) : null}
        </td>
    );
}

export default defaultTemplate(DonorAccountAdministrationListTemplate);