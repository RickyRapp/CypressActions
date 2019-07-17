import React from 'react';
import { BookletOrderCreateTemplate } from 'themes/modules/main/booklet-order/pages';
import { observer } from 'mobx-react';
import { BookletOrderCreateViewStore } from 'modules/main/booklet-order/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new BookletOrderCreateViewStore(rootStore), 'bookletOrderCreateViewStore')
@observer
class BookletOrderCreate extends React.Component {
    render() {
        return <BookletOrderCreateTemplate {...this.props} />
    }
}

export default BookletOrderCreate;
