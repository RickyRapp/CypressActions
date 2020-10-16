import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderListTemplate } from 'themes/application/activity/grant/pages';
import { BookletOrderViewStore } from 'application/activity/grant/stores';

@setCurrentView((rootStore) => new BookletOrderViewStore(rootStore), 'bookletOrderViewStore')
@observer
class BookletOrderList extends React.Component {
    render() {
        return <BookletOrderListTemplate {...this.props} />
    }
}

export default BookletOrderList;
