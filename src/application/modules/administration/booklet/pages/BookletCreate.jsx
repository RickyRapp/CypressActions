import React from 'react';
import { BookletCreateTemplate } from 'themes/application/administration/booklet/pages';
import { observer } from 'mobx-react';
import { BookletCreateViewStore } from 'application/administration/booklet/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new BookletCreateViewStore(rootStore), 'bookletCreateViewStore')
@observer
class BookletCreate extends React.Component {
    render() {
        return <BookletCreateTemplate {...this.props} />
    }
}

export default BookletCreate;
