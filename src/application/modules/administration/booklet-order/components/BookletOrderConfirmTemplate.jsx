import React from 'react';
import { BaasicButton } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function BookletOrderConfirmTemplate({ modalParams, t }) {
    const {
        tableData,
        totalPrepaidAmount,
        deliveryMethodTypes,
        orderContents,
        form,
        donor,
        onCancel,
        onDecline
    } = modalParams.data;


    return (
        <div className="modal__list__wrap">

            <div>
                <h3 className="u-mar--top--med u-mar--bottom--sml">Order Summary</h3>
                <table className="table--total">
                    <thead>
                        <tr>
                            <th>
                                Check
                            </th>
                            <th>
                                Count
                            </th>
                            <th>
                                Amount
                            </th>
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
                        {/* <tr>
                                                    <td>$1.00</td>
                                                    <td>{checkSummary1}</td>
                                                    <td>$200.00</td>
                                                </tr> */}
                        {/* <tr>
                                                    <td>$2.00</td>
                                                    <td>1</td>
                                                    <td>$200.00</td>
                                                </tr>
                                                <tr>
                                                    <td>$3.00</td>
                                                    <td>1</td>
                                                    <td>$200.00</td>
                                                </tr> */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="2">Total pre-paid</th>
                            <th>${totalPrepaidAmount}</th>
                        </tr>
                    </tfoot>
                    {
                        form.$('orderFolder').value == true &&
                        <tfoot>
                            <tr>
                                <th colSpan="2">Booklet folder fee</th>
                                <th>$35.00</th>
                            </tr>
                        </tfoot>
                    }
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
                    {donor && ((form.$('customizedName').value && form.$('customizedName').value.length > 0) || (form.$('customizedAddressLine1').value && form.$('customizedAddressLine1').value.length > 0))
                        ? <tfoot>
                            <tr>
                                <th colSpan="2">Custom booklet fee</th>
                                <th>${(orderContents.reduce((a, b) => a + b.bookletCount, 0) * 5).toFixed(2)}</th>
                            </tr>
                        </tfoot> : null}

                </table>

            </div>
            <div className="u-display--flex">
                <BaasicButton
                    className="btn btn--med btn--med--wide btn--ghost"
                    label={t('EDIT_FORM_LAYOUT.CANCEL')}
                    onClick={onCancel}
                />
                <div className="u-mar--left--auto">
                    <BaasicButton onClick={onDecline} className="btn btn--med btn--med--wide btn--primary" label="Decline" />
                </div>
            </div>
        </div>
    );
}

BookletOrderConfirmTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(BookletOrderConfirmTemplate);
