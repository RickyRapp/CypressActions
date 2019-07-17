import React from 'react';
import { defaultTemplate } from 'core/utils';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { BaasicTable, TableFilter, BaasicModal, DropdownAsyncFilter } from 'core/components';
import { DonorAccountSearch, DonorAccountHeaderDetails } from 'modules/administration/donor-account/components';
import { BookletOrderDetails } from 'modules/common/booklet-order/pages';
import { BookletOrderListTableFilter } from 'themes/modules/common/booklet-order/components';
import _ from 'lodash';

function BookletOrderListTemplate({ bookletOrderListViewStore }) {
    const {
        queryUtility,
        loaderStore: { loading },
        tableStore,
        routes: { create },
        detailsModalParams,
        bookletOrderId,
        findDonorModalParams,
        onChangeSearchDonor,
        bookletOrderStatusDropdownStore,
        deliveryMethodTypeDropdownStore,
        donorAccountSearchDropdownStore
    } = bookletOrderListViewStore;

    return (
        <React.Fragment>
            <React.Fragment>
                <ListLayout onCreate={create} loading={loading}>
                    {queryUtility.filter.donorAccountId &&
                        <PageContentHeader><DonorAccountHeaderDetails userId={queryUtility.filter.donorAccountId} type='booklet-order' /></PageContentHeader>}
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
                                <BookletOrderListTableFilter
                                    queryUtility={queryUtility}
                                    bookletOrderStatusDropdownStore={bookletOrderStatusDropdownStore}
                                    deliveryMethodTypeDropdownStore={deliveryMethodTypeDropdownStore}
                                />
                            </div>
                        </TableFilter>
                        {/* <Export
                            queryUtility={queryUtility}
                            selectedExportColumnsName={selectedExportColumnsName}
                            additionalExportColumnsName={additionalExportColumnsName}
                            service={bookletOrderService}
                        /> */}
                    </div>
                    {tableStore &&
                        <BaasicTable
                            tableStore={tableStore}
                        />}
                </ListLayout>
                <BaasicModal modalParams={findDonorModalParams} >
                    <div className="col col-sml-12 card card--form card--primary card--lrg">
                        <div className="f-row">
                            <div className="form__group f-col f-col-lrg-12">
                                <span>Please select donor</span>
                                <DonorAccountSearch onChange={onChangeSearchDonor} >
                                    {queryUtility.filter.donorAccountId &&
                                        <div>
                                            Use Donor From Filter, <strong><span onClick={() => onChangeSearchDonor({ id: queryUtility.filter.donorAccountId })}>Click Here</span></strong>
                                        </div>}
                                </DonorAccountSearch>
                            </div>
                        </div>
                    </div>
                </BaasicModal>
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
