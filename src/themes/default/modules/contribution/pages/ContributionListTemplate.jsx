import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable, TableFilter, InputFilter, NumericRangeFilter, DateRangeFilter, DropdownFilter, Export, BaasicAsyncDropdown, BaasicModal } from 'core/components';
import { ListLayout } from 'core/layouts';
import { DonorAccountSearch } from 'modules/donor-account/components';


function ContributionListTemplate({ contributionListViewStore, rootStore }) {
    const {
        queryUtility,
        loaderStore,
        tableStore,
        routes: { create },
        contributionStatusDropdownStore,
        paymentTypeDropdownStore,
        contributionService,
        selectedExportColumnsName,
        additionalExportColumnsName,
        findDonorModalParams,
        onChangeSearchDonor
    } = contributionListViewStore;

    return (
        <React.Fragment>
            <ListLayout onCreate={create} loading={loaderStore.loading}>
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility}>
                        <div className="f-row">
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
                                <DropdownFilter
                                    queryUtility={queryUtility}
                                    name="contributionStatusIds"
                                    store={contributionStatusDropdownStore}
                                />
                            </div>
                            <div className="f-col f-col-lrg-3 input--multiselect">
                                <DropdownFilter
                                    queryUtility={queryUtility}
                                    name="paymentTypeIds"
                                    store={paymentTypeDropdownStore}
                                />
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
            <DonorAccountSearch
                modalParams={findDonorModalParams}
                onChange={onChangeSearchDonor}
                rootStore={rootStore}
            />
        </React.Fragment>
    );
}

export default defaultTemplate(ContributionListTemplate);
