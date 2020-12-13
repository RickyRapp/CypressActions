import React from 'react';
import { BookletEditTemplate } from 'themes/application/administration/booklet/pages';
import { observer } from 'mobx-react';
import { BookletEditViewStore } from 'application/administration/booklet/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new BookletEditViewStore(rootStore), 'bookletEditViewStore')
@observer
class BookletEdit extends React.Component {
    render() {
        return <BookletEditTemplate {...this.props} />
    }
}

export default BookletEdit;
