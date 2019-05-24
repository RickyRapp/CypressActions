import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter } from 'core/components';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { ListLayout } from 'core/layouts';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        routes: { create },
        charitySearchDropdownStore
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
                    />
                </React.Fragment>}
        </ListLayout>
    );
}

export default defaultTemplate(GrantListTemplate);
