import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderCreateTemplate } from 'themes/application/booklet-order/pages';
import { BookletOrderCreateViewStore } from 'application/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderCreateViewStore(rootStore), 'bookletOrderCreateViewStore')
@observer
class BookletOrderCreate extends React.Component {
    render() {
        return <BookletOrderCreateTemplate {...this.props} />
    }
}

export default BookletOrderCreate;
