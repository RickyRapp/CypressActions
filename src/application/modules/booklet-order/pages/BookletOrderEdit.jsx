import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderCreateTemplate } from 'themes/application/booklet-order/pages';
import { BookletOrderEditViewStore } from 'application/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderEditViewStore(rootStore), 'store')
@observer
class BookletOrderEdit extends React.Component {
    render() {
        return <BookletOrderCreateTemplate {...this.props} />
    }
}

export default BookletOrderEdit;
