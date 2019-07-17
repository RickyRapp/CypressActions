import React from 'react';
import { BookletOrderCreateTemplate } from 'themes/modules/main/booklet-order/pages';
import { observer } from 'mobx-react';
import { BookletOrderEditViewStore } from 'modules/main/booklet-order/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new BookletOrderEditViewStore(rootStore), 'bookletOrderCreateViewStore')
@observer
class BookletOrderEdit extends React.Component {
    render() {
        return <BookletOrderCreateTemplate {...this.props} />
    }
}

export default BookletOrderEdit;
