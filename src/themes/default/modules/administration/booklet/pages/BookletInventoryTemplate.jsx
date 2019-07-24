import React from 'react';
import { defaultTemplate } from 'core/utils';
import { ListLayout } from 'core/layouts';
import { BaasicTable } from 'core/components';
import _ from 'lodash';

function BookletInventoryTemplate({ bookletInventoryViewStore }) {
    const {
        loaderStore: { loading },
        tableStore,
    } = bookletInventoryViewStore;

    return (
        <React.Fragment>
            <React.Fragment>
                <ListLayout loading={loading}>
                    {tableStore &&
                        <BaasicTable
                            tableStore={tableStore} />}
                </ListLayout>
            </React.Fragment>
        </React.Fragment>
    );
}

export default defaultTemplate(BookletInventoryTemplate);
