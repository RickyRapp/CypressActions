import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TableViewStore } from 'core/stores';
import { SimpleBaasicTable } from 'core/components';

const ReconcileCashedPreviewTemplate = function ({ modalParams }){

    const {
        updatedSuccessfully,
        updatedUnsuccessfully,
        repeatingRecords
    } = modalParams;

    const reconcileCashedSuccessfullyPreviewTableStore = new TableViewStore(null, {
        columns: [
            {
                key: 'paymentNumber',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_NUMBER_LABEL'
            },
            {
                key: 'amount',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_AMOUNT_LABEL'
            },
            {
                key: 'postingDate',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_DATE_CREATED_LABEL',
                format : {
                    type: 'date',
                    value: 'short'
                }
            },
        ],
        actions: {},
    });

    let stringifyedUpdatedSuccessfully = JSON.stringify(updatedSuccessfully)
    reconcileCashedSuccessfullyPreviewTableStore.setData(JSON.parse(stringifyedUpdatedSuccessfully));
    if (!reconcileCashedSuccessfullyPreviewTableStore.dataInitialized) {
        reconcileCashedSuccessfullyPreviewTableStore.dataInitialized = true;
    }

    const reconcileCashedUnsuccessfullyPreviewTableStore = new TableViewStore(null, {
        columns: [
            {
                key: 'paymentNumber',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_NUMBER_LABEL'
            },
            {
                key: 'amount',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_AMOUNT_LABEL'
            },
            {
                key: 'postingDate',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_DATE_CREATED_LABEL',
                format : {
                    type: 'date',
                    value: 'short'
                }
            },
        ],
        actions: {},
    });

    let stringifyedUpdatedUnsuccessfully = JSON.stringify(updatedUnsuccessfully)
    reconcileCashedUnsuccessfullyPreviewTableStore.setData(JSON.parse(stringifyedUpdatedUnsuccessfully));
    if (!reconcileCashedUnsuccessfullyPreviewTableStore.dataInitialized) {
        reconcileCashedUnsuccessfullyPreviewTableStore.dataInitialized = true;
    }

    const repeatingRecordsPreviewTableStore = new TableViewStore(null, {
        columns: [
            {
                key: 'paymentNumber',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_NUMBER_LABEL'
            },
            {
                key: 'amount',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_AMOUNT_LABEL'
            },
            {
                key: 'postingDate',
                title: 'RECONCILE.CHECK.LIST.COLUMNS.OLD_CHECK_DATE_CREATED_LABEL',
                format : {
                    type: 'date',
                    value: 'short'
                }
            },
        ],
        actions: {},
    });

    let stringifyedRepeatingRecordsData = JSON.stringify(repeatingRecords)
    reconcileCashedUnsuccessfullyPreviewTableStore.setData(JSON.parse(stringifyedRepeatingRecordsData));
    if (!reconcileCashedUnsuccessfullyPreviewTableStore.dataInitialized) {
        reconcileCashedUnsuccessfullyPreviewTableStore.dataInitialized = true;
    }

    return (
        <section style={{ maxHeight: "400px" }}>
            Unsuccessfully Matched
            <SimpleBaasicTable tableStore={reconcileCashedUnsuccessfullyPreviewTableStore} />

            <br />

            Repeating Records
            <SimpleBaasicTable tableStore={repeatingRecordsPreviewTableStore} />

            <br />

            Successfully Matched
            <SimpleBaasicTable tableStore={reconcileCashedSuccessfullyPreviewTableStore} />
        </section >
        )
};

ReconcileCashedPreviewTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    ReconcileCashedPreviewViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ReconcileCashedPreviewTemplate);