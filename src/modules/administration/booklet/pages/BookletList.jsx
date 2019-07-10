import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletListTemplate } from 'themes/modules/administration/booklet/pages';
import { BookletListViewStore } from 'modules/administration/booklet/stores';

@setCurrentView(rootStore => new BookletListViewStore(rootStore), 'bookletListViewStore')
@observer
class BookletList extends React.Component {
    render() {
        return <BookletListTemplate {...this.props} />;
    }
}

export default BookletList;
