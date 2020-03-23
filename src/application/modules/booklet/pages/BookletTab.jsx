import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletTabTemplate } from 'themes/application/booklet/pages';
import { BookletTabViewStore } from 'application/booklet/stores';

@setCurrentView((rootStore) => new BookletTabViewStore(rootStore), 'bookletTabViewStore')
@observer
class BookletTab extends React.Component {
    render() {
        return <BookletTabTemplate {...this.props} />
    }
}

export default BookletTab;
