import React from 'react';
import { BookletOrderDetailsTemplate } from 'themes/modules/common/booklet-order/pages';
import { observer } from 'mobx-react';
import { BaseBookletOrderDetailsViewStore } from 'modules/common/booklet-order/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore, props) => new BaseBookletOrderDetailsViewStore(rootStore, { id: props.id, highlightId: props.highlightId }), 'bookletOrderDetailsViewStore')
@observer
class BookletOrderDetails extends React.Component {
    render() {
        return <BookletOrderDetailsTemplate {...this.props} />;
    }
}

export default BookletOrderDetails;
