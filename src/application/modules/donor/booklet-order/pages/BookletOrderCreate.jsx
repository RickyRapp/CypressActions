import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletOrderCreateTemplate } from 'themes/application/common/booklet-order/pages';
import { BookletOrderCreateViewStore } from 'application/common/booklet-order/stores';

@setCurrentView((rootStore) => new BookletOrderCreateViewStore(rootStore, { donorId: rootStore.userStore.applicationUser.id }), 'store')
@observer
class BookletOrderCreate extends React.Component {
    render() {
        return <BookletOrderCreateTemplate {...this.props} />
    }
}

export default BookletOrderCreate;
