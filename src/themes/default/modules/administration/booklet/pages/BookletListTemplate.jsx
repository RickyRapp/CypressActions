import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { BaasicTable, TableFilter, Export, DropdownAsyncFilter, BaasicModal } from 'core/components';
import { BookletListFilterTemplate } from 'themes/modules/common/booklet/components';
import _ from 'lodash';

function BookletListTemplate({ bookletListViewStore }) {
    const {
        queryUtility,
        loaderStore: { loading },
        tableStore,
        routes: { create },
        bookletStatusDropdownStore,
        denominationTypeDropdownStore
    } = bookletListViewStore;

    return (
        <React.Fragment>
            <React.Fragment>
                <ListLayout onCreate={create} loading={loading}>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="f-row">
                                {/* <div className="f-col f-col-lrg-3 input--multiselect">
                                    {donorAccountSearchDropdownStore &&
                                        <DropdownAsyncFilter
                                            queryUtility={queryUtility}
                                            name="donorAccountId"
                                            store={donorAccountSearchDropdownStore}
                                        />}
                                </div> */}
                                <BookletListFilterTemplate
                                    queryUtility={queryUtility}
                                    bookletStatusDropdownStore={bookletStatusDropdownStore}
                                    denominationTypeDropdownStore={denominationTypeDropdownStore} />
                            </div>
                        </TableFilter>
                    </div>
                    {tableStore &&
                        <BaasicTable
                            tableStore={tableStore} />}
                </ListLayout>
            </React.Fragment>
        </React.Fragment>
    );
}

export default defaultTemplate(BookletListTemplate);
