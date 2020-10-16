import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletListTemplate } from 'themes/application/activity/grant/pages';
import { BookletViewStore } from 'application/activity/grant/stores';

@setCurrentView((rootStore) => new BookletViewStore(rootStore), 'bookletViewStore')
@observer
class BookletList extends React.Component {
    render() {
        return <BookletListTemplate {...this.props} />
    }
}

export default BookletList;
