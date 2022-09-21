import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderListTemplate } from 'themes/application/administration/booklet-order/pages';
import { BookletOrderViewStore } from 'application/administration/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderViewStore(rootStore), 'bookletOrderViewStore')
@observer
class BookletOrderList extends React.Component {
    render() {
        return <BookletOrderListTemplate {...this.props} />
    }
}

export default BookletOrderList;