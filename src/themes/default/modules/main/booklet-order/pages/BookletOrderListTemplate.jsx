import React from 'react';
import { defaultTemplate, } from 'core/utils';
import { ListLayout } from 'core/layouts';
import { BaasicTable, TableFilter, BaasicModal } from 'core/components';
import { BookletOrderDetails } from 'modules/common/booklet-order/pages';
import { BookletOrderListTableFilter } from 'themes/modules/common/booklet-order/components';
import _ from 'lodash';

function BookletOrderListTemplate({ bookletOrderListViewStore }) {
    const {
        queryUtility,
        loaderStore: { loading },
        tableStore,
        routes: { create },
        bookletOrderStatusDropdownStore,
        deliveryMethodTypeDropdownStore,
        detailsModalParams,
        bookletOrderId,
    } = bookletOrderListViewStore;

    return (
        <React.Fragment>
            <React.Fragment>
                <ListLayout onCreate={create} loading={loading}>
                    <div className="spc--bottom--sml">
                        <TableFilter queryUtility={queryUtility}>
                            <div className="f-row">
                                <BookletOrderListTableFilter
                                    queryUtility={queryUtility}
                                    bookletOrderStatusDropdownStore={bookletOrderStatusDropdownStore}
                                    deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
                                />
                            </div>
                        </TableFilter>
                    </div>
                    {tableStore &&
                        <BaasicTable
                            tableStore={tableStore}
                        />}
                </ListLayout>
                <BaasicModal modalParams={detailsModalParams} >
                    <div className="col col-sml-12 card card--form card--primary card--lrg">
                        <BookletOrderDetails id={bookletOrderId} />
                    </div>
                </BaasicModal>
            </React.Fragment>
        </React.Fragment>
    );
}

export default defaultTemplate(BookletOrderListTemplate);
