import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import { ListLayout, PageContentHeader } from 'core/layouts';
import { BaasicTable, TableFilter, Export, DropdownAsyncFilter, BaasicModal } from 'core/components';
import { DonorAccountSearch, DonorAccountHeaderDetails } from 'modules/administration/donor-account/components';
import { BookletOrderDetails } from 'modules/common/booklet-order/pages';
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
        findDonorModalParams,
        onChangeSearchDonor
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
                                {/* <div className="f-col f-col-lrg-3 input--multiselect">
                                    {donorAccountSearchDropdownStore &&
                                        <DropdownAsyncFilter
                                            queryUtility={queryUtility}
                                            name="donorAccountId"
                                            store={donorAccountSearchDropdownStore}
                                        />}
                                </div> */}
                                {/* <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
                                    <InputFilter
                                        queryUtility={queryUtility}
                                        name="confirmationNumber"
                                        placeholder="Confirmation Number"
                                        type="number"
                                    />
                                </div>
                                <div className="f-col f-col-lrg-4 pos--rel spc--right--sml">
                                    <NumericRangeFilter
                                        queryUtility={queryUtility}
                                        nameMin="amountRangeMin"
                                        nameMax="amountRangeMax"
                                        minPlaceholder="Min"
                                        maxPlaceholder="Max"
                                    />
                                </div>
                                <div className="f-col f-col-lrg-3">
                                    <DateRangeFilter
                                        queryUtility={queryUtility}
                                        nameMin="dateCreatedStartDate"
                                        nameMax="dateCreatedEndDate"
                                    />
                                </div>
                                <div className="f-col f-col-lrg-3 input--multiselect">
                                    {bookletOrderStatusDropdownStore &&
                                        <DropdownFilter
                                            queryUtility={queryUtility}
                                            name="bookletOrderStatusIds"
                                            store={bookletOrderStatusDropdownStore}
                                        />}
                                </div>
                                <div className="f-col f-col-lrg-3 input--multiselect">
                                    {deliveryMethodTypeDropdownStore &&
                                        <DropdownFilter
                                            queryUtility={queryUtility}
                                            name="deliveryMethodTypeIds"
                                            store={deliveryMethodTypeDropdownStore}
                                        />}
                                </div> */}
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
