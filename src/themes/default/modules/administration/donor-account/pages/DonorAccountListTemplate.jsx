import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, InputFilter } from 'core/components';
import { isSome } from 'core/utils';
import { ListLayout } from 'core/layouts';

function DonorAccountListTemplate({ donorAccountListViewStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create }
    } = donorAccountListViewStore;

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
                </TableFilter>
            </div>
            {tableStore &&
                <BaasicTable
                    tableStore={tableStore}
                    loading={loaderStore.loading}
                />}
        </ListLayout>
    );
}

export default defaultTemplate(DonorAccountListTemplate);