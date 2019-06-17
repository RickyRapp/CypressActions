import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';

function GrantScheduledPaymentListTemplate({ grantScheduledPaymentListViewStore }) {
    const {
        loaderStore: { loading },
        queryUtility,
        tableStore,
        donorAccountSearchDropdownStore
    } = grantScheduledPaymentListViewStore;

    return (
        <ListLayout loading={loading}>
            {tableStore &&
                <React.Fragment>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                        </TableFilter>
                    </div>
                    <BaasicTable
                        tableStore={tableStore}
                        loading={loading}
                    />
                </React.Fragment>}
        </ListLayout>
    );
}

export default defaultTemplate(GrantScheduledPaymentListTemplate);
