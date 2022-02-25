import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderEditTemplate } from 'themes/application/donor/booklet-order/pages';
import { BookletOrderEditViewStore } from 'application/donor/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderEditViewStore(rootStore), 'bookletOrderEditViewStore')
@observer
class BookletOrderEdit extends React.Component {
    render() {
        return <BookletOrderEditTemplate {...this.props} />
    }
}

export default BookletOrderEdit;
