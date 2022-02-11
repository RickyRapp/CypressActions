import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BookletOrderReviewRowTemplate } from 'themes/application/administration/booklet-order/components';
import { BaasicButton, BasicInput } from 'core/components';

const BookletOrderReviewTemplate = function ({ bookletOrderReviewViewStore }) {
    const {
        contentLoading,
        orderContents,
        fetchFunc,
        denominationTypes,
        onAddBookletsChange,
        bookletTypes,
        form,
        order
    } = bookletOrderReviewViewStore;
    return (
        <ApplicationEditLayout store={bookletOrderReviewViewStore} footerClassName={"container--base"}>
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
                    <div className="card--primary card--med u-mar--bottom--med">
                        {order && order.deliveryMethodType.abrv !== 'pick-up'? 
                        <p><b>Shipping address: </b>{order.shippingAddressLine1 ? order.shippingAddressLine1 : ""}, {order.shippingAddressLine2 ? order.shippingAddressLine2 : ""}, {order.shippingCity ? order.shippingCity : ""}, {order.shippingState ? order.shippingState : ""}, {order.shippingZipCode ? order.shippingZipCode : ""}</ p>
                        : null
                        }
                    </div>
                    {orderContents.map((item) => {
                        return (
                            <BookletOrderReviewRowTemplate
                                key={`${item.denominationTypeId}_${item.bookletTypeId}_${item.booklets.length}`}
                                item={item}
                                fetchFunc={fetchFunc}
                                bookletTypes={bookletTypes}
                                denominationTypes={denominationTypes}
                                onAddBookletsChange={onAddBookletsChange}
                            />
                        )
                    })}
                    {orderContents && orderContents.length > 0 &&
                        <BaasicButton 
                            className='btn btn--med btn--med--wide btn--primary u-mar--right--sml'
                            label="Update order"
                        />
                    }  
                </div>
            </Content>
        </ApplicationEditLayout >
    )
};

BookletOrderReviewTemplate.propTypes = {
    bookletOrderReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(BookletOrderReviewTemplate);
