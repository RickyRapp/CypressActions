import React from 'react';
import { BookletOrderReviewTemplate } from 'themes/modules/administration/booklet-order/pages';
import { observer } from 'mobx-react';
import { BookletOrderReviewViewStore } from 'modules/administration/booklet-order/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new BookletOrderReviewViewStore(rootStore), 'bookletOrderReviewViewStore')
@observer
class BookletOrderReview extends React.Component {
    render() {
        return <BookletOrderReviewTemplate {...this.props} />
    }
}

export default BookletOrderReview;
