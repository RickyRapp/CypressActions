import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content } from 'core/layouts';
import { TableFilter, BaasicDropdown, BaasicTableWithRowDetails, FormatterResolver } from 'core/components';


const PaymentsListTemplate = function ({ paymentsViewStore, t }) {
    const {
        tableStore, 
		queryUtility, 
		paymentTypeDropdownStore,
		authorization,
    } = paymentsViewStore;

    const DetailComponent = ({ dataItem }) => {
        {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.DONOR_NAME')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.CHARITY_AMOUNT')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.GRANT_CONFIRMATION_NUMBER')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.DATE_CREATED')}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataItem 
                            && dataItem.allGrants.charityVirtualTransactions
                            && dataItem.allGrants.charityVirtualTransactions.map((item) => { 
                            return (
                                <tr key={item.grants[0].id}>
                                    <td>{item.grants[0].donor.donorName}</td>
                                    <td><FormatterResolver
                                        item={{amount: item.grants[0].amount}}
                                        field='amount'
                                        format={{type: 'currency'}}
                                    /></td>
                                    <td>
                                        {item.grants[0].confirmationNumber}
                                    </td>
                                    <td> {item.grants[0].isSession ?
                                     <FormatterResolver
                                        item={{ dateCreated: item.grants[0].dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                     : ''} </td>
                                </tr>
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