import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { ListFilterTemplate } from 'themes/modules/common/grant/components';
import { ListLayout } from 'core/layouts';
import { GrantDetails } from 'modules/common/grant/pages';

function GrantListTemplate({ grantListViewStore }) {
    const {
        loaderStore: { loading },
        queryUtility,
        tableStore,
        routes: { create },
        charitySearchDropdownStore,
        detailsModalParams,
        grantId
    } = grantListViewStore;

    return (
        <ListLayout onCreate={create} loading={loading}>
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
                        loading={loading}
                    />
                </React.Fragment>}
            <BaasicModal modalParams={detailsModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <GrantDetails id={grantId} />
                </div>
            </BaasicModal>
        </ListLayout>
    );
}

export default defaultTemplate(GrantListTemplate);
