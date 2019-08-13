import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable } from 'core/components';
import { ListLayout, PageNavigation } from 'core/layouts';

function PaymentTransactionListTemplate({ paymentTransactionListViewStore, t }) {
    const {
        loaderStore: { loading },
        tableStore
    } = paymentTransactionListViewStore;

    return (
        <ListLayout loading={loading}>
            <PageNavigation hideNavigation={true}>
                <h5 className="display--ib spc--top--sml">{t('PAYMENTTRANSACTIONS')}</h5>
            </PageNavigation>
            <BaasicTable
                tableStore={tableStore}
                loading={loading}
                hidePageSizeSelect={true}
            />
        </ListLayout>
    );
}

export default defaultTemplate(PaymentTransactionListTemplate);
