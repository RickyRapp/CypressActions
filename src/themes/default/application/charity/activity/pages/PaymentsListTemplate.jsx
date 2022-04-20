import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content, ApplicationListLayout } from 'core/layouts';
import { BaasicTable, TableFilter, BaasicDropdown, BaasicTableWithRowDetails, FormatterResolver } from 'core/components';


const PaymentsListTemplate = function ({ paymentsViewStore }) {
    const {
        tableStore, 
		queryUtility, 
		paymentTypeDropdownStore, 
		authorization
    } = paymentsViewStore;

    const DetailComponent = ({ dataItem }) => {
        {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.DONOR_NAME')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.CHARITY_AMOUNT')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataItem && dataItem.charity.map((item, index) => {
                            return (console.log(dataItem)
                                /*<tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td><FormatterResolver
                                        item={{ charityAmount: item.charityAmount }}
                                        field='charityAmount'
                                        format={{ type: 'currency' }}
                                    /></td>
                                </tr> */
                            );
                        })}
                    </tbody>
                </table>)
        }
    }

    DetailComponent.propTypes = {
        dataItem: PropTypes.object.isRequired
    };


    return (
        <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <div className="row u-mar--bottom--med">
                        <div className="col col-sml-12 col-xxlrg-10">
                            <TableFilter colClassName={"col col-sml-12 col-lrg-6"} queryUtility={queryUtility}>
                                <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                    <BaasicDropdown
                                        store={paymentTypeDropdownStore}
                                        placeholder="RECONCILE.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER"
                                    />
                                </div>
                            </TableFilter>
                        </div>
                    </div>
                    <BaasicTableWithRowDetails 
                        authorization={authorization} 
                        tableStore={tableStore}
                        detailComponent={DetailComponent}
                        loading={tableStore.loading}
                        className="k-grid--actions"
                    />
                </div>
    </Content>
    )
};

PaymentsListTemplate.propTypes = {
    paymentsViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(PaymentsListTemplate);