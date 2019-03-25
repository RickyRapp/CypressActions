import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, InputFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter, Export, DropdownAsyncFilter } from 'core/components';
import { ListLayout } from 'core/layouts';
import { DonorAccountSearch } from 'modules/donor-account/components';
import { BaasicModal } from 'core/components';

function ContributionListTemplate({ contributionListViewStore, rootStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create },
        contributionStatusDropdownStore,
        paymentTypeDropdownStore,
        donorAccountSearchDropdownStore,
        contributionService,
        selectedExportColumnsName,
        additionalExportColumnsName,
        findDonorModalParams,
        onChangeSearchDonor,
        contributionEmployeeRead
    } = contributionListViewStore;

    return (
        <React.Fragment>
            <ListLayout onCreate={create} loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <div className="f-row">
                            {contributionEmployeeRead &&
                                <div className="f-col f-col-lrg-3 input--multiselect">
                                    {donorAccountSearchDropdownStore &&
                                        <DropdownAsyncFilter
                                            queryUtility={queryUtility}
                                            name="donorAccountId"
                                            store={donorAccountSearchDropdownStore}
                                        />}
                                </div>}
                            <div className="f-col f-col-lrg-2 pos--rel spc--right--sml">
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
                                {contributionStatusDropdownStore &&
                                    <DropdownFilter
                                        queryUtility={queryUtility}
                                        name="contributionStatusIds"
                                        store={contributionStatusDropdownStore}
                                    />}
                            </div>
                            <div className="f-col f-col-lrg-3 input--multiselect">
                                {paymentTypeDropdownStore &&
                                    <DropdownFilter
                                        queryUtility={queryUtility}
                                        name="paymentTypeIds"
                                        store={paymentTypeDropdownStore}
                                    />}
                            </div>
                        </div>
                    </TableFilter>
                    <Export
                        queryUtility={queryUtility}
                        selectedExportColumnsName={selectedExportColumnsName}
                        additionalExportColumnsName={additionalExportColumnsName}
                        service={contributionService}
                    />
                </div>
                <BaasicTable
                    tableStore={tableStore}
                    loading={loaderStore.loading}
                />
            </ListLayout>
            <BaasicModal modalParams={findDonorModalParams} >
                <div className="col col-sml-12 card card--form card--primary card--lrg">
                    <div className="f-row">
                        <div className="form__group f-col f-col-lrg-12">
                            <span>Please select donor</span>
                            <DonorAccountSearch
                                onChange={onChangeSearchDonor}
                                rootStore={rootStore}
                            />
                        </div>
                    </div>
                </div>
            </BaasicModal>
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionListTemplate);
