import React from 'react'
import PropTypes from 'prop-types';
import { FormatterResolver } from 'core/components';

const BookletSummaryCard = ({ store, t }) => {
    const { donor,
        tableData,
        totalPrepaidAmount,
        deliveryMethodTypes,
        totalAmount,
        needsProtectionPlan,
        form,
        onAddProtectionPlanClick,
        goToNewDeposit,
        orderContents,
        needsMoreFunds,
    } = store;

    return (
        <div className="card--primary card--med ">
            <div className="card--med card--secondary--light card--center u-display--flex u-display--flex--wrap">
                <span className="type--med type--color--text u-mar--right--sml u-mar--bottom--tny">Available balance: </span>
                <span className="type--xlrg type--wgt--medium type--color--note">
                    {donor && <FormatterResolver
                        item={{ availableBalance: donor.availableBalance }}
                        field='availableBalance'
                        format={{ type: 'currency' }}
                    />}
                </span>
            </div>
            <div>
                <h3 className="u-mar--top--med u-mar--bottom--sml">Order Summary</h3>
                <table className="table--total">
                    <thead>
                        <tr>
                            <th>Check</th>
                            <th>Count</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => {
                            if (item.count > 0) return (
                                <tr key={index}>
                                    <td>${item.id}</td>
                                    <td>
                                        {item.count}
                                    </td>
                                    <td>${item.amount}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="2">Total pre-paid</th>
                            <th>${totalPrepaidAmount}</th>
                        </tr>
                    </tfoot>
                    {
                        donor && !donor.isSessionFeePayedByCharity &&
                        <tfoot>
                            <tr>
                                <th colSpan="2">Pre-paid fee</th>
                                <th>${(totalPrepaidAmount * 0.029).toFixed(2)}</th>
                            </tr>
                        </tfoot>
                    }

                    <tfoot>
                        <tr>
                            <th colSpan="2">Shipping method</th>
                            <th>{deliveryMethodTypes.find(x => x.id == form.$('deliveryMethodTypeId').value) ? (deliveryMethodTypes.find(x => x.id == form.$('deliveryMethodTypeId').value)).name : null}</th>
                        </tr>
                    </tfoot>
                    <tfoot>
                        <tr>
                            <th colSpan="2">Shipping fee</th>
                            <th>{deliveryMethodTypes.find(x => x.abrv === 'express-mail') ? (deliveryMethodTypes.find(x => x.abrv === 'express-mail').id == form.$('deliveryMethodTypeId').value ? '$25' : '$0') : null}</th>
                        </tr>
                    </tfoot>
                    {donor && donor.accountType && donor.accountType.abrv != 'private' && ((form.$('customizedName').value && form.$('customizedName').value.length > 0) || (form.$('customizedAddressLine1').value && form.$('customizedAddressLine1').value.length > 0))
                        ? <tfoot>
                            <tr>
                                <th colSpan="2">Custom booklet fee</th>
                                <th>${(orderContents.reduce((a, b) => a + b.bookletCount, 0) * 5).toFixed(2)}</th>
                            </tr>
                        </tfoot> : null}
                </table>
            </div>

            {((donor && !donor.hasProtectionPlan) || needsProtectionPlan) &&
                <div className="u-mar--top--med">
                    <div className="message--enh">
                        <span className="u-mar--right--tny">
                            {t('BOOKLET_ORDER.CREATE.BUTTON.ADD_PROTECTION_PLAN_MESSAGE')}
                        </span>
                        <a href="#" className="u-anchor--underline" onClick={onAddProtectionPlanClick}>
                            {t('BOOKLET_ORDER.CREATE.BUTTON.ADD_PROTECTION_PLAN')}
                        </a>
                    </div>
                </div>
            }
            {(donor && needsMoreFunds) &&
                <div className="u-mar--top--med">
                    <div className="message--enh">
                        <span className="u-mar--right--tny">
                            Insufficient funds, the order amount is greater than your available funds -
                        </span>
                        <a href="#" className="u-anchor--underline" onClick={goToNewDeposit}>
                            Create a new deposit
                        </a>
                    </div>
                </div>
            }

            <div className="type--med type--wgt--medium type--right u-mar--top--sml">
                <div className="u-display--flex u-display--flex--justify--flex-end u-display--flex--align--baseline">
                    <span>
                        Total:
                    </span>
                    <span className="type--xlrg type--wgt--medium type--color--note u-mar--left--sml u-push--to--lrg">
                        <FormatterResolver
                            item={{ total: totalAmount }}
                            field='total'
                            format={{ type: 'currency' }}
                        />
                    </span>
                </div>

                {donor && donor.hasProtectionPlan &&
                    <div>
                        <small>
                            {t('BOOKLET_ORDER.CREATE.ENROLLED_IN_PROTECTION_PLAN')}
                            <i className="u-icon u-icon--approve u-icon--base u-mar--left--sml"></i>
                        </small>
                    </div>}
            </div>
        </div>
    )
}

BookletSummaryCard.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default BookletSummaryCard