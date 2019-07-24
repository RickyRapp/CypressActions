import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BookletInventoryTemplate } from 'themes/modules/administration/booklet/pages';
import { BookletInventoryViewStore } from 'modules/administration/booklet/stores';

@setCurrentView(rootStore => new BookletInventoryViewStore(rootStore), 'bookletInventoryViewStore')
@observer
class BookletInventory extends React.Component {
    render() {
        return <BookletInventoryTemplate {...this.props} />;
    }
}

export default BookletInventory;
