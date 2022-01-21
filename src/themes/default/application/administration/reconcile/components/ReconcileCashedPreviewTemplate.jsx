import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TableViewStore } from 'core/stores';
import { SimpleBaasicTable } from 'core/components';

const ReconcileCashedPreviewTemplate = function ({ modalParams }){

    const {
        updatedSuccessfully,
        updatedUnsuccessfully
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

    let stringifyedUserData = JSON.stringify(updatedSuccessfully)
    reconcileCashedSuccessfullyPreviewTableStore.setData(JSON.parse(stringifyedUserData));
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

    stringifyedUserData = JSON.stringify(updatedUnsuccessfully)
    reconcileCashedUnsuccessfullyPreviewTableStore.setData(JSON.parse(stringifyedUserData));
    if (!reconcileCashedUnsuccessfullyPreviewTableStore.dataInitialized) {
        reconcileCashedUnsuccessfullyPreviewTableStore.dataInitialized = true;
    }

    return (
        <section style={{ maxHeight: "400px" }}>
            Unsuccessfully Matched
            <SimpleBaasicTable tableStore={reconcileCashedUnsuccessfullyPreviewTableStore} />

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