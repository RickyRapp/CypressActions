import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BookletOrderEditRowTemplate } from 'themes/application/administration/booklet-order/components';
import { BaasicInput, BasicInput } from 'core/components';

const BookletOrderEditTemplate = function ({ bookletOrderEditViewStore }) {
    const {
        contentLoading,
        orderContents,
        fetchFunc,
        denominationTypes,
        onAddBookletsChange,
        bookletTypes,
        form,
        order
    } = bookletOrderEditViewStore;
    return (
        <ApplicationEditLayout store={bookletOrderEditViewStore} footerClassName={"container--base"}>
            <Content loading={contentLoading} >
                <div className="container--base">
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row row--form u-mar--bottom--lrg">
                            <div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
                                <div className="form__group__label">Donor</div>
                                <span className="input input--text input--lrg padd--top--tny input--disabled">
                                    {order && <React.Fragment>{order.donor.donorName}</React.Fragment>}
                                </span>
                            </div>
                            <div className="col col-sml-12 col-xxlrg-6 u-mar--bottom--sml">
                                <div className="form__group__label">Delivery Method</div>
                                <span className="input input--text input--lrg padd--top--tny input--disabled">
                                    {order && <React.Fragment>{order.deliveryMethodType.name}</React.Fragment>}
                                </span>
                            </div>
                            {order && (order.deliveryMethodType.abrv === 'mail-usps' || order.deliveryMethodType.abrv === 'express-mail') &&
                                <div className="col col-sml-12 col-xxlrg-6">
                                    <BasicInput field={form.$('trackingNumber')} />
                                </div>}
                        </div>
                    </div>
                    {order && order.deliveryMethodType.abrv !== 'pick-up' ? 
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="form__group__label">Address Line 1</div>
                        <BaasicInput value={order.shippingAddressLine1} onChange={(e => order.shippingAddressLine1 = e.target.value)}/>
                        <div className="form__group__label">Address Line 2</div>
                        <BaasicInput value={order.shippingAddressLine2} onChange={(e => order.shippingAddressLine2 = e.target.value)}/>
                        <div className="form__group__label">City</div>
                        <BaasicInput value={order.shippingCity} onChange={(e => order.shippingCity = e.target.value)}/>
                        <div className="form__group__label">State</div>
                        <BaasicInput value={order.shippingState} onChange={(e => order.shippingState = e.target.value)}/>
                        <div className="form__group__label">Zip Code</div>
                        <BaasicInput value={order.shippingZipCode} onChange={(e => order.shippingZipCode = e.target.value)}/>
                        {/* <p><b>Shipping address: </b>{order.shippingAddressLine1 ? order.shippingAddressLine1 : ""}, {order.shippingAddressLine2 ? order.shippingAddressLine2 : ""}, {order.shippingCity ? order.shippingCity : ""}, {order.shippingState ? order.shippingState : ""}, {order.shippingZipCode ? order.shippingZipCode : ""}</ p> */}
                    </div> : null
                    }
                    {orderContents.map((item) => {
                        return (
                            <BookletOrderEditRowTemplate
                                key={`${item.denominationTypeId}_${item.bookletTypeId}_${item.booklets.length}`}
                                item={item}
                                fetchFunc={fetchFunc}
                                bookletTypes={bookletTypes}
                                denominationTypes={denominationTypes}
                                onAddBookletsChange={onAddBookletsChange}
                            />
                        )
                    })}
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

BookletOrderEditTemplate.propTypes = {
    bookletOrderEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(BookletOrderEditTemplate);
