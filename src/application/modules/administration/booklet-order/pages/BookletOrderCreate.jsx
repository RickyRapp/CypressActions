import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderCreateTemplate } from 'themes/application/administration/booklet-order/pages';
import { BookletOrderCreateViewStore } from 'application/administration/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderCreateViewStore(rootStore), 'store')
@observer
class BookletOrderCreate extends React.Component {
    render() {
        return <BookletOrderCreateTemplate {...this.props} />
    }
}

export default BookletOrderCreate;
