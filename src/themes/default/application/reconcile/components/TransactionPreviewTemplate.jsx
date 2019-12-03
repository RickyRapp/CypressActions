import React from 'react';
import {
    SimpleBaasicTable
} from 'core/components';
import { TableViewStore } from 'core/stores';
import { defaultTemplate } from 'core/hoc';
import _ from 'lodash'

class TransactionPreviewTemplate extends React.Component {
    render() {
        const { transaction } = this.props.modalParams.data;
        debugger

        const tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.LIST.COLUMNS.OLD_CHECK_NUMBER_LABEL'

                },
                {
                    key: 'dateChanged',
                    title: 'RECONCILE.LIST.COLUMNS.OLD_CHECK_DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                },
                {
                    key: 'description',
                    title: 'RECONCILE.LIST.COLUMNS.OLD_CHECK_DESCRIPTION_LABEL'
                }
            ]
        });

        const oldPaymentNumbers = JSON.parse(transaction.json)
        tableStore.setData(_.orderBy(oldPaymentNumbers, ['dateChanged'], ['desc']))

        return (
            <section className='w--600--px'>
                <div className="row">
                    <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                        <h3>Voided checks</h3>
                        <SimpleBaasicTable tableStore={tableStore} />
                    </div>
                </div>
            </section>)
    }
}

export default defaultTemplate(TransactionPreviewTemplate);
