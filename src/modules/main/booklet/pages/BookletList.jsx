import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletListTemplate } from 'themes/modules/main/booklet/pages';
import { BookletListViewStore } from 'modules/main/booklet/stores';

@setCurrentView(rootStore => new BookletListViewStore(rootStore), 'bookletListViewStore')
@observer
class BookletList extends React.Component {
    render() {
        return <BookletListTemplate {...this.props} />;
    }
}

export default BookletList;
