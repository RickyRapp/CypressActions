import React from 'react';
import { defaultTemplate } from 'core/utils';
import { DropdownAsyncFilter, BaasicTable, TableFilter, NumericRangeFilter, DateRangeFilter } from 'core/components';
import { ListLayout } from 'core/layouts';

function FundTransferListTemplate({ fundTransferListViewStore, t }) {
    const {
        senderDonorAccountSearchDropdownStore,
        recipientDonorAccountSearchDropdownStore,
        loaderStore: { loading },
        queryUtility,
        tableStore,
        routes: { create },
        switchDonorAccountsFromFilter,
        setRecipientDropdownStore,
        setSenderDropdownStore
    } = fundTransferListViewStore;

    return (
        <ListLayout onCreate={create} loading={loading}>
            <div className="spc--bottom--sml">
                <TableFilter queryUtility={queryUtility}>
                    <div className="f-row">
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {senderDonorAccountSearchDropdownStore &&
                                <DropdownAsyncFilter
                                    queryUtility={queryUtility}
                                    name="senderDonorAccountId"
                                    store={senderDonorAccountSearchDropdownStore}
                                />}
                        </div>
                        {(queryUtility.filter.senderDonorAccountId || queryUtility.filter.recipientDonorAccountId) &&
                            (queryUtility.filter.senderDonorAccountId && queryUtility.filter.recipientDonorAccountId ?
                                <i
                                    className="icomoon icon-synchronize-arrows-1 align--v--middle spc--top--tny"
                                    onClick={switchDonorAccountsFromFilter}
                                    title={t('SWITCH')}
                                >
                                </i>
                                :
                                (queryUtility.filter.senderDonorAccountId ?
                                    <i
                                        className="icomoon icon-arrow-right-1 align--v--middle spc--top--tny"
                                        onClick={() => setRecipientDropdownStore(queryUtility.filter.senderDonorAccountId)}
                                        title={t('MOVERIGHT')}
                                    >
                                    </i>
                                    : <i
                                        className="icomoon icon-arrow-left-1 align--v--middle spc--top--tny"
                                        onClick={() => setSenderDropdownStore(queryUtility.filter.recipientDonorAccountId)}
                                        title={t('MOVELEFT')}
                                    >
                                    </i>))}
                        <div className="f-col f-col-lrg-3 input--multiselect">
                            {recipientDonorAccountSearchDropdownStore &&
                                <DropdownAsyncFilter
                                    queryUtility={queryUtility}
                                    name="recipientDonorAccountId"
                                    store={recipientDonorAccountSearchDropdownStore}
                                />}
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
                    </div>
                </TableFilter>
            </div>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
            />
        </ListLayout>
    );
}

export default defaultTemplate(FundTransferListTemplate);
