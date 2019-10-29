import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormDebug } from 'core/components'
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BookletOrderReviewRowTemplate } from 'themes/application/booklet-order/components'
import _ from 'lodash';

const BookletOrderReviewTemplate = function ({ bookletOrderReviewViewStore, t }) {
    const {
        form,
        contentLoading,
        denominationTypes,
        fetchFunc,
        assignError
    } = bookletOrderReviewViewStore;

    return (
        <ApplicationEditLayout store={bookletOrderReviewViewStore}>
            <Content loading={contentLoading} >
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">General Data</h3>
                    {form.$('bookletOrderItems').map((item) => {
                        return (
                            <BookletOrderReviewRowTemplate
                                key={item.$('id').value}
                                item={item}
                                denominationTypes={denominationTypes}
                                fetchFunc={fetchFunc}
                            />)
                    })}
                </div>
            </Content>
            <FormDebug form={form}></FormDebug>
        </ApplicationEditLayout >
    )
};

BookletOrderReviewTemplate.propTypes = {
    bookletOrderReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(BookletOrderReviewTemplate);
