import React from 'react';
import { observer } from 'mobx-react';
import { BookletOrderListTemplate } from 'themes/modules/main/booklet-order/pages';
import { setCurrentView } from 'core/utils';
import { BookletOrderListViewStore } from 'modules/main/booklet-order/stores';

@setCurrentView(rootStore => new BookletOrderListViewStore(rootStore), 'bookletOrderListViewStore')
@observer
class BookletOrderList extends React.Component {
    render() {
        return <BookletOrderListTemplate {...this.props} />;
    }
}

export default BookletOrderList;