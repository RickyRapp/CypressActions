import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletTabTemplate } from 'themes/application/administration/booklet-order/pages';
import { BookletTabViewStore } from 'application/administration/booklet-order/stores';

@setCurrentView((rootStore) => new BookletTabViewStore(rootStore), 'bookletTabViewStore')
@observer
class BookletTab extends React.Component {
    render() {
        return <BookletTabTemplate {...this.props} />
    }
}

export default BookletTab;
