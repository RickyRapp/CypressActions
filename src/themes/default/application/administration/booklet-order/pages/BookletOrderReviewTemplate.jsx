import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BookletOrderReviewRowTemplate } from 'themes/application/administration/booklet-order/components';

const BookletOrderReviewTemplate = function ({ bookletOrderReviewViewStore }) {
    const {
        contentLoading,
        orderContents,
        fetchFunc,
        denominationTypes,
        onAddBookletsChange
    } = bookletOrderReviewViewStore;

    return (
        <ApplicationEditLayout store={bookletOrderReviewViewStore}>
            <Content loading={contentLoading} >
                <div className="card--primary card--med u-mar--bottom--med">
                    {orderContents.map((item) => {
                        return (
                            <BookletOrderReviewRowTemplate
                                key={`${item.denominationTypeId}_${item.bookletTypeId}_${item.booklets.length}`}
                                item={item}
                                fetchFunc={fetchFunc}
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
    bookletOrderReviewViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(BookletOrderReviewTemplate);
