import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable } from 'core/components';
import { ListLayout } from 'core/layouts';

function PaymentTransactionListTemplate({ paymentTransactionListViewStore }) {
    const {
        loaderStore: { loading },
        tableStore
    } = paymentTransactionListViewStore;

    return (
        <ListLayout loading={loading}>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
                hidePageSizeSelect={true}
            />
        </ListLayout>
    );
}

export default defaultTemplate(PaymentTransactionListTemplate);
