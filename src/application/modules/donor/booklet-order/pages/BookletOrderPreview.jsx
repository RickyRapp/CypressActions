import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderPreviewTemplate } from 'themes/application/donor/booklet-order/pages';
import { BookletOrderPreviewViewStore } from 'application/donor/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderPreviewViewStore(rootStore), 'bookletOrderPreviewViewStore')
@observer
class BookletOrderPreview extends React.Component {
    render() {
        return <BookletOrderPreviewTemplate {...this.props} />
    }
}

export default BookletOrderPreview;
