import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, BaasicModal, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { DonorAccountSearch } from 'modules/administration/donor-account/components';
import { GrantReview } from 'modules/administration/grant/components';
import { GrantRegularDetails } from 'modules/common/grant/pages';

function GrantCombinedListTemplate({ grantCombinedListViewStore }) {
    const {
        loaderStore: { loading },
        queryUtility,
        tableStore,
        routes: { create },
        donorAccountSearchDropdownStore,
        detailsModalParams
    } = grantCombinedListViewStore;

    return (
        <ListLayout onCreate={create} loading={loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="f-row">
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {donorAccountSearchDropdownStore &&
                                <DropdownAsyncFilter
                                    queryUtility={queryUtility}
                                    name="donorAccountId"
                                    store={donorAccountSearchDropdownStore}
                                />}
                        </div>
                        <ListFilterTemplate
                            queryUtility={queryUtility} />
                    </div>
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
            />
            <BaasicModal modalParams={detailsModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantRegularDetails id={detailsModalParams.data} />
                </div>
            </BaasicModal>
        </ListLayout>
    );
}

export default defaultTemplate(GrantCombinedListTemplate);
