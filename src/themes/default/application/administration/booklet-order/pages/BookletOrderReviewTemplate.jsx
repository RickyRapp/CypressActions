import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BookletOrderReviewRowTemplate } from 'themes/application/administration/booklet-order/components';
import { BasicInput } from 'core/components';

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
        <ApplicationEditLayout store={bookletOrderReviewViewStore}>
            <Content loading={contentLoading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="row row--form u-mar--bottom--lrg">
                        <div className="col col-sml-12 col-xxlrg-4">
                            <div className="form__group__label">Donor</div>
                            <span className="input input--text input--lrg padd--top--tny input--disabled">
                                {order && <React.Fragment>{order.donor.donorName}</React.Fragment>}
                            </span>
                        </div>
                        <div className="col col-sml-12 col-xxlrg-4">
                            <div className="form__group__label">Delivery Method</div>
                            <span className="input input--text input--lrg padd--top--tny input--disabled">
                                {order && <React.Fragment>{order.deliveryMethodType.name}</React.Fragment>}
                            </span>
                        </div>
                        {order && (order.deliveryMethodType.abrv === 'mail-usps' || order.deliveryMethodType.abrv === 'express-mail') &&
                            <div className="col col-sml-12 col-xxlrg-4">
                                <BasicInput field={form.$('trackingNumber')} />
                            </div>}
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
