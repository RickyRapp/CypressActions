import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { TableViewStore } from 'core/stores';
import { SimpleBaasicTable } from 'core/components';

const MonthlyFeeJsonTemplate = function ({ modalParams, t }) {
    const {
        data
    } = modalParams;

    const monthlyFeeTableStore = new TableViewStore(null, {
        columns: [
            {
                key: 'feeAmount',
                title: 'ACTIVITY.LIST.MONTHLY_FEE.COLUMNS.FEE_AMOUNT_LABEL',
                format: {
                    type: 'currency',
                    value: '$'
                }
            },
            {
                key: 'grantAmount',
                title: 'ACTIVITY.LIST.MONTHLY_FEE.COLUMNS.GRANT_AMOUNT_LABEL',
                format: {
                    type: 'currency',
                    value: '$'
                }
            },
            {
                key: 'confirmationNumber',
                title: 'ACTIVITY.LIST.MONTHLY_FEE.COLUMNS.CONFIRMATION_NUMBER_LABEL'
            },
        ],
        actions: {},
    });

    monthlyFeeTableStore.setData(JSON.parse(data.json));
    if (!monthlyFeeTableStore.dataInitialized) {
        monthlyFeeTableStore.dataInitialized = true;
    }

    return (
        <section style={{ maxHeight: "400px" }}>
            <SimpleBaasicTable tableStore={monthlyFeeTableStore} />
        </section >
    )
}

MonthlyFeeJsonTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(MonthlyFeeJsonTemplate);
