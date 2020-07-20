import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';
import { BookletOrderReviewRowTemplate } from 'themes/application/booklet-order/components'
import { DonorPageHeaderOverview } from 'application/donor/components';

const BookletOrderReviewTemplate = function ({ bookletOrderReviewViewStore }) {
    const {
        form,
        contentLoading,
        denominationTypes,
        fetchFunc,
        bookletOrder
    } = bookletOrderReviewViewStore;

    return (
        <ApplicationEditLayout store={bookletOrderReviewViewStore}>
            {bookletOrder &&
                <AuthPageHeader donorId={bookletOrder.donorId} type={3} authorization='theDonorsFundAdministrationSection.read' />}
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
        </ApplicationEditLayout >
    )
};

const AuthPageHeader = withAuth(DonorPageHeaderOverview);

BookletOrderReviewTemplate.propTypes = {
    bookletOrderReviewViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(BookletOrderReviewTemplate);
