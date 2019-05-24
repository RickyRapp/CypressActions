import React from 'react';
import { defaultTemplate } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, BaasicModal, TableFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { DonorAccountSearch } from 'modules/administration/donor-account/components';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore,
        queryUtility,
        tableStore,
        routes: { create },
        findDonorModalParams,
        onChangeSearchDonor,
        donorAccountSearchDropdownStore,
        charitySearchDropdownStore
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loaderStore.loading}>
            {tableStore &&
                <React.Fragment>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="f-row">
                                <div className="f-col f-col-lrg-4 input--multiselect">
                                    {donorAccountSearchDropdownStore &&
                                        <DropdownAsyncFilter
                                            queryUtility={queryUtility}
                                            name="donorAccountId"
                                            store={donorAccountSearchDropdownStore}
                                        />}
                                </div>
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
            <BaasicModal modalParams={findDonorModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <span>Please select donor</span>
                            <DonorAccountSearch
                                onChange={onChangeSearchDonor}
                            />
                        </div>
                    </div>
                </div>
            </BaasicModal>
        </ListLayout>
    );
}

export default defaultTemplate(GrantListTemplate);
