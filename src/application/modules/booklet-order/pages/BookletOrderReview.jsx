import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderReviewTemplate } from 'themes/application/booklet-order/pages';
import { BookletOrderReviewViewStore } from 'application/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderReviewViewStore(rootStore), 'bookletOrderReviewViewStore')
@observer
class BookletOrderReview extends React.Component {
    render() {
        return <BookletOrderReviewTemplate {...this.props} />
    }
}

export default BookletOrderReview;
