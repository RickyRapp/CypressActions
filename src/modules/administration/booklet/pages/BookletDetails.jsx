import React from 'react';
import { BookletDetailsTemplate } from 'themes/modules/administration/booklet/pages';
import { observer } from 'mobx-react';
import { BaseBookletDetailsViewStore } from 'modules/common/booklet/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore, props) => new BaseBookletDetailsViewStore(rootStore, { id: rootStore.routerStore.routerState.params.id }), 'bookletDetailsViewStore')
@observer
class BookletDetails extends React.Component {
    render() {
        return <BookletDetailsTemplate {...this.props} />
    }
}

export default BookletDetails;
